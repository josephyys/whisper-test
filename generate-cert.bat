@echo off
REM Generate a self-signed certificate for HTTPS (valid for 365 days)
REM This will create cert.pem and key.pem in the current directory

set OPENSSL_CONF=%ProgramFiles%\OpenSSL-Win64\bin\openssl.cfg
if not exist "%ProgramFiles%\OpenSSL-Win64\bin\openssl.exe" (
    echo Please install OpenSSL for Windows and add it to your PATH.
    exit /b 1
)

"%ProgramFiles%\OpenSSL-Win64\bin\openssl.exe" req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"

echo Self-signed certificate generated: cert.pem, key.pem
