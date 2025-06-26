# Voice Transcription Web App

A real-time voice transcription web application that supports multiple languages including English, Chinese, Japanese, and Taiwanese using OpenAI's Whisper model.

## Features

- 🎤 Real-time voice recording and transcription
- 📁 Audio file upload support
- 🌍 Multi-language support (English, Chinese, Japanese, Taiwanese, and 50+ more)
- 🚀 Real-time WebSocket communication
- 📱 Responsive design for mobile and desktop
- 🎨 Modern and beautiful UI

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (v14 or higher)
2. **Python** (v3.7 or higher)
3. **OpenAI Whisper**

### Installing Whisper

Option 1: Install via pip (recommended)
```bash
pip install openai-whisper
```

Option 2: Install command-line version
```bash
# On Windows with Chocolatey
choco install whisper

# Or download from GitHub releases
# https://github.com/openai/whisper/releases
```

## Installation

1. Clone or navigate to the project directory:
```bash
cd d:\joseph\whisper-test
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create necessary directories:
```bash
mkdir uploads temp
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Use the application:
   - Click "Start Recording" to record voice in real-time
   - Or click "Upload Audio File" to transcribe an existing audio file
   - The transcription will appear in the results area

## Supported Audio Formats

- WAV
- MP3
- MP4
- M4A
- FLAC
- And more (via Whisper's built-in support)

## Supported Languages

The application automatically detects the language and supports:
- English
- Chinese (Simplified & Traditional)
- Japanese
- Taiwanese
- Spanish, French, German, Italian
- And 50+ more languages supported by Whisper

## API Endpoints

### POST /transcribe
Upload an audio file for transcription.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: audio file

**Response:**
```json
{
  "transcription": "Transcribed text here"
}
```

## WebSocket Events

### Client to Server
- `audio-stream`: Send audio data for real-time transcription

### Server to Client
- `transcription`: Receive transcribed text
- `transcription-error`: Receive error messages

## Configuration

You can modify the Whisper model in `server.js`:

```javascript
// Change model size (tiny, base, small, medium, large)
const whisper = spawn('whisper', [
  audioPath,
  '--model', 'base', // Change this to 'large' for better accuracy
  '--output_format', 'txt',
  '--output_dir', 'temp',
  '--language', 'auto'
]);
```

Available models:
- `tiny`: Fastest, lowest accuracy
- `base`: Good balance of speed and accuracy
- `small`: Better accuracy, slower
- `medium`: High accuracy, slower
- `large`: Best accuracy, slowest

## Troubleshooting

### Common Issues

1. **Whisper not found**
   - Make sure Whisper is installed: `pip install openai-whisper`
   - Verify installation: `whisper --help`

2. **Microphone not working**
   - Make sure you're accessing the app via HTTPS or localhost
   - Grant microphone permissions in your browser

3. **Python errors**
   - Ensure Python is in your system PATH
   - Install required Python packages: `pip install torch torchaudio`

4. **Large audio files timing out**
   - Consider using a smaller Whisper model
   - Implement chunking for large files

## Development

For development with auto-restart:
```bash
npm run dev
```

## License

MIT License

## Contributing

Feel free to contribute by:
- Adding more language support
- Improving the UI/UX
- Adding real-time streaming transcription
- Adding speaker diarization
- Implementing audio preprocessing
