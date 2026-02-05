# AI Control Assistant - Electron Desktop App

A beautiful floating AI assistant that runs on your desktop with system tray integration.

## 🎯 Features

- 🎈 **Floating UI** - Always-on-top assistant window
- 🚀 **Auto-start** - Launches when computer boots
- 🔗 **Auto-connect** - Connects to web interface automatically
- 💬 **Voice & Text** - Accept commands via chat interface
- 📍 **Draggable** - Position anywhere on screen
- 🎨 **System Tray** - Minimize to tray, quick access menu
- 💾 **Persistent Settings** - Saves your preferences

## 📦 Building the App

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Install Dependencies

```bash
cd desktop-agent/electron-app
npm install
```

### Build for All Platforms

**On macOS/Linux:**
```bash
chmod +x build-all.sh
./build-all.sh
```

**On Windows:**
```bash
build-all.bat
```

### Build for Specific Platform

**Windows:**
```bash
npm run build:win
```

**macOS:**
```bash
npm run build:mac
```

**Linux:**
```bash
npm run build:linux
```

## 📁 Output Files

After building, installers will be in the `dist` folder:

- **Windows**: `AI Control Assistant Setup.exe`
- **macOS**: `AI Control Assistant.dmg`
- **Linux**: 
  - `AI Control Assistant.AppImage`
  - `ai-control-assistant.deb`
  - `ai-control-assistant.rpm`

## 🚀 Distribution

### Upload to Your Server

1. Create a downloads directory on your server:
```bash
mkdir -p /var/www/html/downloads
```

2. Upload the installers:
```bash
scp dist/* user@yourserver.com:/var/www/html/downloads/
```

3. Update download links in your web interface to point to:
   - `https://yourserver.com/downloads/AI-Control-Assistant-Setup.exe`
   - `https://yourserver.com/downloads/AI-Control-Assistant.dmg`
   - `https://yourserver.com/downloads/AI-Control-Assistant.AppImage`

## 🎨 Customization

### Change App Icon

Replace these files in `assets/`:
- `icon.ico` - Windows icon
- `icon.icns` - macOS icon
- `icon.png` - Linux icon
- `tray-icon.png` - System tray icon

### Modify UI Colors

Edit the CSS in `index.html`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Window Size

Edit `main.js`:
```javascript
mainWindow = new BrowserWindow({
  width: 380,  // Change width
  height: 520, // Change height
  // ...
});
```

## 🔧 Development

Run in development mode:
```bash
npm start
```

This will launch the app without building installers.

## 📝 Configuration

The app stores settings in:
- **Windows**: `%APPDATA%\ai-control-assistant\config.json`
- **macOS**: `~/Library/Application Support/ai-control-assistant/config.json`
- **Linux**: `~/.config/ai-control-assistant/config.json`

## 🐛 Troubleshooting

### Build fails on macOS
- Install Xcode Command Line Tools: `xcode-select --install`
- Accept Xcode license: `sudo xcodebuild -license accept`

### Build fails on Windows
- Install Windows Build Tools: `npm install --global windows-build-tools`

### Build fails on Linux
- Install required packages:
  ```bash
  sudo apt-get install -y libx11-dev libxtst-dev libpng-dev
  ```

## 📄 License

PROPRIETARY - All rights reserved
