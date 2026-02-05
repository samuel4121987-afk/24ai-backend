#!/bin/bash

# Build script for all platforms
# This script builds the Electron app for Windows, Mac, and Linux

echo "🚀 Building AI Control Assistant for all platforms..."
echo "=================================================="

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for Windows
echo ""
echo "🪟 Building for Windows..."
npm run build:win

# Build for macOS
echo ""
echo "🍎 Building for macOS..."
npm run build:mac

# Build for Linux
echo ""
echo "🐧 Building for Linux..."
npm run build:linux

echo ""
echo "✅ Build complete!"
echo "=================================================="
echo "📁 Installers are in the 'dist' folder:"
echo ""
echo "Windows: dist/AI Control Assistant Setup.exe"
echo "macOS:   dist/AI Control Assistant.dmg"
echo "Linux:   dist/AI Control Assistant.AppImage"
echo "         dist/ai-control-assistant.deb"
echo "         dist/ai-control-assistant.rpm"
echo ""
echo "🎉 Ready to distribute!"
