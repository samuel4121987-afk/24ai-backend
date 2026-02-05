# 🚀 Desktop Agent Deployment Guide

Complete guide for building, packaging, and distributing the AI Control Desktop Agent.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Electron App (Recommended)](#electron-app)
3. [Python Agent (Lightweight)](#python-agent)
4. [Hosting & Distribution](#hosting--distribution)
5. [Auto-Update Setup](#auto-update-setup)

---

## 🎯 Overview

You have **two options** for the desktop agent:

### Option 1: Electron App (Recommended)
- ✅ Beautiful floating UI
- ✅ Better user experience
- ✅ Cross-platform consistency
- ✅ Easier to maintain
- ❌ Larger file size (~100MB)

### Option 2: Python Agent
- ✅ Lightweight (~20MB)
- ✅ Faster startup
- ✅ Lower resource usage
- ❌ Basic system tray UI only
- ❌ Requires Python runtime (if not bundled)

---

## 🎨 Electron App

### Prerequisites

```bash
# Install Node.js 16+
node --version

# Install dependencies
cd desktop-agent/electron-app
npm install
```

### Building

#### Build for All Platforms

**macOS/Linux:**
```bash
chmod +x build-all.sh
./build-all.sh
```

**Windows:**
```bash
build-all.bat
```

#### Build for Specific Platform

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

### Output Files

After building, find installers in `dist/`:

```
dist/
├── AI Control Assistant Setup.exe      # Windows installer
├── AI Control Assistant.dmg            # macOS installer
├── AI Control Assistant.AppImage       # Linux portable
├── ai-control-assistant.deb            # Debian/Ubuntu
└── ai-control-assistant.rpm            # RedHat/Fedora
```

### File Sizes

- **Windows**: ~95MB
- **macOS**: ~110MB
- **Linux**: ~100MB

---

## 🐍 Python Agent

### Prerequisites

```bash
# Install Python 3.9+
python --version

# Install dependencies
cd desktop-agent/python-agent
pip install -r requirements.txt
```

### Building

```bash
# Build for current platform
python build.py

# Build with installer
python build.py --all
```

### Output Files

```
dist/
├── AI-Control-Agent.exe    # Windows
├── AI-Control-Agent.app    # macOS
└── AI-Control-Agent        # Linux
```

### File Sizes

- **Windows**: ~25MB
- **macOS**: ~30MB
- **Linux**: ~20MB

---

## 🌐 Hosting & Distribution

### Step 1: Upload to Server

```bash
# Create downloads directory
ssh user@yourserver.com
mkdir -p /var/www/html/downloads

# Upload files
scp dist/* user@yourserver.com:/var/www/html/downloads/
```

### Step 2: Update Web Interface

The download buttons in your web interface should point to:

```
https://yourserver.com/downloads/AI-Control-Assistant-Setup.exe
https://yourserver.com/downloads/AI-Control-Assistant.dmg
https://yourserver.com/downloads/AI-Control-Assistant.AppImage
```

### Step 3: Add Download Tracking (Optional)

Create a download endpoint:

```javascript
// backend/main.py
@app.get("/download/{platform}")
async def download_agent(platform: str):
    # Track download
    log_download(platform)
    
    # Redirect to file
    files = {
        "windows": "/downloads/AI-Control-Assistant-Setup.exe",
        "mac": "/downloads/AI-Control-Assistant.dmg",
        "linux": "/downloads/AI-Control-Assistant.AppImage"
    }
    
    return RedirectResponse(files[platform])
```

---

## 🔄 Auto-Update Setup

### For Electron App

1. **Install electron-updater:**

```bash
npm install electron-updater
```

2. **Add to main.js:**

```javascript
const { autoUpdater } = require('electron-updater');

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
  // Notify user
});

autoUpdater.on('update-downloaded', () => {
  // Prompt to restart
  autoUpdater.quitAndInstall();
});
```

3. **Host update files:**

```
https://yourserver.com/updates/
├── latest.yml              # Update manifest
├── latest-mac.yml
├── latest-linux.yml
└── AI-Control-Assistant-1.0.1.exe
```

### For Python Agent

Create a simple update checker:

```python
import requests
import json

def check_for_updates():
    response = requests.get('https://yourserver.com/api/version')
    latest = response.json()['version']
    current = '1.0.0'
    
    if latest > current:
        # Download and install update
        download_update(latest)
```

---

## 📦 Distribution Checklist

### Before Release

- [ ] Test on all platforms (Windows, Mac, Linux)
- [ ] Verify auto-start functionality
- [ ] Test WebSocket connection
- [ ] Check system tray integration
- [ ] Verify screen capture works
- [ ] Test command execution
- [ ] Check file permissions
- [ ] Test installer/uninstaller

### Release Process

1. **Build all platforms**
   ```bash
   ./build-all.sh
   ```

2. **Test installers**
   - Install on clean VMs
   - Verify all features work
   - Check for errors

3. **Upload to server**
   ```bash
   scp dist/* user@server:/var/www/html/downloads/
   ```

4. **Update website**
   - Update download links
   - Update version numbers
   - Add release notes

5. **Announce release**
   - Email users
   - Update documentation
   - Post on social media

---

## 🔐 Code Signing (Important!)

### Why Code Sign?

- Prevents "Unknown Publisher" warnings
- Builds user trust
- Required for macOS Gatekeeper
- Improves Windows SmartScreen reputation

### Windows Code Signing

```bash
# Get a code signing certificate from:
# - DigiCert
# - Sectigo
# - GlobalSign

# Sign the executable
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com AI-Control-Agent.exe
```

### macOS Code Signing

```bash
# Get Apple Developer certificate
# Sign the app
codesign --deep --force --verify --verbose --sign "Developer ID Application: Your Name" AI-Control-Agent.app

# Notarize for Gatekeeper
xcrun notarytool submit AI-Control-Agent.dmg --apple-id your@email.com --password app-specific-password
```

### Linux

Linux doesn't require code signing, but you can:
- Sign packages with GPG
- Host on trusted repositories

---

## 📊 Analytics & Monitoring

### Track Downloads

```javascript
// Log downloads
const downloads = {};

app.get('/download/:platform', (req, res) => {
  const { platform } = req.params;
  downloads[platform] = (downloads[platform] || 0) + 1;
  
  // Log to database
  logDownload(platform, req.ip);
  
  res.download(`/downloads/${platform}`);
});
```

### Monitor Active Agents

```javascript
// Track connected agents
const activeAgents = new Map();

ws.on('connection', (socket, req) => {
  const code = req.query.code;
  activeAgents.set(code, {
    connectedAt: Date.now(),
    ip: req.ip
  });
});
```

---

## 🐛 Common Issues

### "App is damaged" (macOS)

**Solution:** Code sign and notarize the app

```bash
codesign --deep --force --sign "Developer ID" app.app
xcrun notarytool submit app.dmg
```

### "Windows protected your PC"

**Solution:** Code sign with EV certificate or build reputation over time

### Linux: "Permission denied"

**Solution:** Make executable
```bash
chmod +x AI-Control-Agent
```

---

## 📞 Support

For issues or questions:
- Email: support@yourcompany.com
- Docs: https://yoursite.com/docs
- GitHub: https://github.com/yourrepo

---

## 🎉 You're Ready!

Your desktop agent is now ready for distribution. Users can:

1. Download from your website
2. Install with one click
3. Auto-start on boot
4. Connect automatically
5. Start using immediately

**Next Steps:**
- Set up auto-updates
- Get code signing certificates
- Create user documentation
- Set up support channels
