https://geo1995.com/whisper/

set path=C:\ProgramData\anaconda3;C:\ProgramData\anaconda3\Library\mingw-w64\bin;C:\ProgramData\anaconda3\Library\usr\bin;C:\ProgramData\anaconda3\Library\bin;C:\ProgramData\anaconda3\Scripts;C:\ProgramData\anaconda3\bin;C:\ProgramData\anaconda3\condabin;%path%

conda create --name whisper_tw --clone vsummary-3.12
conda activate whisper_tw
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

cd C:\Users\joseph\Downloads
whisper test_tw.wav –language English –model large-v2
whisper test_tw.wav --language zh --model large-v2
whisper test_tw.wav --language "taiwanese" --model large-v2
whisper test_taiwan.wav --language "taiwanese" --model large-v2
whisper test_taiwan.wav --language Chinese --model large-v2
whisper test_taiwan.wav --language zh --model large-v2

<audio controls src="c:/Users/joseph/Downloads/Sam Altman there’s no “magic red button” to stop AI.wav" title="Title"></audio>

https://notube.net/en/youtube-app-83

$OutputEncoding = [Console]::OutputEncoding = [Text.Encoding]::UTF8
conda install -c conda-forge ffmpeg


https://github.com/collabora/WhisperLive


chcp 65001
chcp  950


https://github.com/davabase/whisper_real_time


https://github.com/ufal/whisper_streaming
https://github.com/QuentinFuxa/whisper_streaming_web


D:\tools\nssm-2.24\win64\nssm install n8n
/c C:\Users\joseph\Desktop\n8n.bat


https://whisper-web.netlify.app/

https://github.com/pluja/whishper


### target
i want to have a test web which can listen when push a button, and send the voice streaming back to host and transcribe and sent back to web, at the backend using whisper or anything can process english, chinese, japanese or taiwanese
