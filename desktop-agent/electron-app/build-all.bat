@echo off
REM Build script for all platforms (Windows batch file)

echo 🚀 Building AI Control Assistant for all platforms...
echo ==================================================

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build for Windows
echo.
echo 🪟 Building for Windows...
call npm run build:win

REM Build for macOS
echo.
echo 🍎 Building for macOS...
call npm run build:mac

REM Build for Linux
echo.
echo 🐧 Building for Linux...
call npm run build:linux

echo.
echo ✅ Build complete!
echo ==================================================
echo 📁 Installers are in the 'dist' folder:
echo.
echo Windows: dist\AI Control Assistant Setup.exe
echo macOS:   dist\AI Control Assistant.dmg
echo Linux:   dist\AI Control Assistant.AppImage
echo          dist\ai-control-assistant.deb
echo          dist\ai-control-assistant.rpm
echo.
echo 🎉 Ready to distribute!
pause
