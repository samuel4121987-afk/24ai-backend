# Python Agent with System Tray

Enhanced Python agent with system tray functionality for users who prefer a lightweight solution.

## 🎯 Features

- 🎈 **System Tray Icon** - Runs in background with tray menu
- 🚀 **Auto-start** - Can be configured to start on boot
- 🔗 **WebSocket Connection** - Connects to web interface
- 💻 **Cross-platform** - Works on Windows, macOS, and Linux
- 📸 **Screen Capture** - Real-time screen streaming
- 🤖 **Command Execution** - Execute mouse, keyboard, and system commands

## 📦 Installation

### Install Dependencies

```bash
cd desktop-agent/python-agent
pip install -r requirements.txt
```

## 🚀 Running the Agent

```bash
python agent_with_tray.py <access_code>
```

Example:
```bash
python agent_with_tray.py test-code
```

## 🔨 Building Executables

### Build for Current Platform

```bash
python build.py
```

### Build with Installer

```bash
python build.py --all
```

This will:
1. Create standalone executable
2. Package it as an installer (platform-specific)

### Output Files

After building, you'll find:

**Windows:**
- `dist/AI-Control-Agent.exe`

**macOS:**
- `dist/AI-Control-Agent.app`

**Linux:**
- `dist/AI-Control-Agent`

## 📝 Configuration

The agent stores configuration in:
- **Windows**: `%USERPROFILE%\.ai-control-agent\config.json`
- **macOS**: `~/.ai-control-agent/config.json`
- **Linux**: `~/.ai-control-agent/config.json`

Example config:
```json
{
  "websocket_url": "ws://localhost:8000/ws",
  "api_url": "http://localhost:8000/api",
  "access_code": "your-code-here"
}
```

## 🎨 System Tray Menu

Right-click the tray icon to access:
- **Status** - Connection status
- **Show Window** - Show main window (if implemented)
- **Settings** - Configure agent settings
- **Quit** - Exit the agent

## 🔧 Development

### Project Structure

```
python-agent/
├── agent_with_tray.py    # Main agent with tray
├── build.py              # Build script
├── requirements.txt      # Python dependencies
├── assets/              # Icons and resources
│   ├── icon.ico        # Windows icon
│   ├── icon.icns       # macOS icon
│   └── icon.png        # Linux icon
└── dist/               # Built executables
```

### Adding Features

To add new functionality:

1. Add action handler in `execute_action()` method
2. Update WebSocket message handling
3. Add menu items to system tray if needed

## 🐛 Troubleshooting

### PyInstaller Issues

If build fails, try:
```bash
pip install --upgrade pyinstaller
```

### System Tray Not Showing

**Linux:**
```bash
sudo apt-get install libappindicator3-1
```

**macOS:**
- Grant accessibility permissions in System Preferences

**Windows:**
- Check if system tray icons are enabled in taskbar settings

### Permission Errors

The agent needs permissions for:
- Screen capture
- Mouse/keyboard control
- Network access

Grant these in your system settings.

## 📄 License

PROPRIETARY - All rights reserved
