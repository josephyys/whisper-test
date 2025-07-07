const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const cors = require('cors');
const https = require('https');

const app = express();
const server = http.createServer(app);

// HTTPS setup
let httpsServer;
try {
  const certOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  };
  httpsServer = https.createServer(certOptions, app);
} catch (err) {
  console.warn('HTTPS certificates not found. HTTPS will not be available.');
}

const io = socketIo(httpsServer || server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-audio.wav');
  }
});

const upload = multer({ storage: storage });

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle audio upload and transcription
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioFile = req.file;
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    console.log('Processing audio file:', audioFile.filename);
    
    // Use Whisper to transcribe the audio
    const transcription = await transcribeWithWhisper(audioFile.path);
    
    // Clean up the uploaded file
    fs.unlinkSync(audioFile.path);
    
    res.json({ transcription: transcription });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

// Function to transcribe audio using Whisper
async function transcribeWithWhisper(audioPath) {
  return new Promise((resolve, reject) => {
    // Using whisper command line tool
    // You can also use openai-whisper Python package
    const whisper = spawn('whisper', [
      audioPath,
      '--model', 'base',
      '--output_format', 'txt',
      '--output_dir', 'temp',
    //   '--language', 'auto' // Auto-detect language (supports English, Chinese, Japanese, etc.)
    ]);

    let output = '';
    let error = '';

    whisper.stdout.on('data', (data) => {
      output += data.toString();
    });

    whisper.stderr.on('data', (data) => {
      error += data.toString();
    });

    whisper.on('close', (code) => {
      if (code === 0) {
        // Read the transcription file
        const audioName = path.basename(audioPath, path.extname(audioPath));
        const transcriptPath = path.join('temp', audioName + '.txt');
        
        if (fs.existsSync(transcriptPath)) {
          const transcription = fs.readFileSync(transcriptPath, 'utf8').trim();
          fs.unlinkSync(transcriptPath); // Clean up
          resolve(transcription);
        } else {
          reject(new Error('Transcription file not found'));
        }
      } else {
        reject(new Error(`Whisper process failed: ${error}`));
      }
    });
  });
}

// Alternative function using Python whisper if command line version doesn't work
async function transcribeWithPythonWhisper(audioPath) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['-c', `
import whisper
import sys

model = whisper.load_model("base")
result = model.transcribe("${audioPath.replace(/\\/g, '/')}")
print(result["text"])
`]);

    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve(output.trim());
      } else {
        reject(new Error(`Python whisper failed: ${error}`));
      }
    });
  });
}

// Socket.IO for real-time communication
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('audio-stream', async (audioData) => {
    try {
      // Save the audio chunk
      const filename = `stream-${Date.now()}.wav`;
      const filepath = path.join('uploads', filename);
      
      // Convert base64 to buffer and save
      const audioBuffer = Buffer.from(audioData, 'base64');
      fs.writeFileSync(filepath, audioBuffer);
      
      // Transcribe the audio
      const transcription = await transcribeWithWhisper(filepath);
      
      // Send transcription back to client
      socket.emit('transcription', { text: transcription });
      
      // Clean up
      fs.unlinkSync(filepath);
    } catch (error) {
      console.error('Stream transcription error:', error);
      socket.emit('transcription-error', { error: 'Failed to transcribe audio' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
const SSLPORT = 3443;

if (httpsServer) {
  httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS server running on port ${SSLPORT}`);
    console.log(`Open https://<your-ip>:${SSLPORT} in your browser`);
  });
}

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
