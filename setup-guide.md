# Whisper Installation and Setup Guide

## Installing Python and Whisper

### Step 1: Install Python
1. Download Python from https://www.python.org/downloads/
2. During installation, make sure to check "Add Python to PATH"
3. Verify installation:
```cmd
python --version
pip --version
```

### Step 2: Install Whisper
```cmd
pip install openai-whisper
```

### Step 3: Install additional dependencies
```cmd
pip install torch torchaudio
```

### Step 4: Test Whisper installation
```cmd
whisper --help
```

## Alternative: Using Whisper via Python API

If the command-line version doesn't work, the server.js includes a Python API fallback that you can use by uncommenting the `transcribeWithPythonWhisper` function.

## Installing Node.js Dependencies

```cmd
npm install
```

## Creating Required Directories

```cmd
mkdir uploads
mkdir temp
```

## Running the Application

```cmd
npm start
```

The application will be available at http://localhost:3000

## Troubleshooting

### If Whisper command not found:
1. Try using the Python API version in server.js
2. Or install via conda:
```cmd
conda install -c conda-forge openai-whisper
```

### If you get permission errors:
- Run the command prompt as administrator
- Or use virtual environment:
```cmd
python -m venv whisper-env
whisper-env\Scripts\activate
pip install openai-whisper
```

### For better performance:
- Install CUDA version of PyTorch if you have NVIDIA GPU
- Use larger Whisper models for better accuracy
