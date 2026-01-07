# AI Control Desktop Agent

This is the desktop agent that runs on the user's computer to enable remote control capabilities.

## Features

- **Live Screen Monitoring**: Captures screen at 2-5 FPS and streams to web interface
- **Command Execution**: Executes commands received from the AI
- **Mouse Control**: Click, move, drag, scroll
- **Keyboard Control**: Type text, press keys, shortcuts
- **Application Control**: Open/close applications
- **URL Opening**: Open websites in default browser
- **Secure Communication**: Encrypted WebSocket connection

## Installation

### Windows

1. Download `ai-control-agent-windows.exe`
2. Run the installer
3. Follow the installation wizard
4. Grant necessary permissions when prompted
5. The agent will start automatically

### macOS

1. Download `ai-control-agent-mac.dmg`
2. Open the DMG file
3. Drag the app to Applications folder
4. Open System Preferences > Security & Privacy
5. Allow the app to control your computer
6. Launch the agent from Applications

### Linux

1. Download `ai-control-agent-linux.deb` (Debian/Ubuntu) or `.rpm` (Fedora/RHEL)
2. Install using package manager:
   ```bash
   # Debian/Ubuntu
   sudo dpkg -i ai-control-agent-linux.deb
   
   # Fedora/RHEL
   sudo rpm -i ai-control-agent-linux.rpm
   ```
3. Grant necessary permissions
4. Start the agent:
   ```bash
   ai-control-agent
   ```

## Development Setup

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- Chrome or Edge browser
- .NET Runtime 7.0 (Windows only)

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Agent

```bash
python agent.py <your-access-code>
```

## Configuration

The agent stores its configuration in:
- Windows: `C:\Users\<username>\.ai-control-agent\config.json`
- macOS: `/Users/<username>/.ai-control-agent/config.json`
- Linux: `/home/<username>/.ai-control-agent/config.json`

## Security

- All communications are encrypted using TLS/SSL
- Access codes are required for connection
- Screen data is compressed and optimized
- No data is stored locally except configuration
- Permissions are requested before any action

## Troubleshooting

### Agent won't connect
- Check your internet connection
- Verify your access code is correct
- Ensure firewall isn't blocking the connection

### Screen capture not working
- Grant screen recording permissions in system settings
- Restart the agent after granting permissions

### Commands not executing
- Check if the agent has necessary permissions
- Verify the agent is running and connected

## Support

For issues or questions:
- Email: 247@247ai360.com
- Documentation: https://24ai.org.es/docs
- GitHub Issues: https://github.com/ai-control/agent/issues

## License

Proprietary - All rights reserved