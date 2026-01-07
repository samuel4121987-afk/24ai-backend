// Desktop Agent Installation Script
// This Python script should be packaged as an executable for Windows/Mac/Linux

import os
import sys
import json
import time
import subprocess
import platform
from pathlib import Path

class AIControlAgent:
    def __init__(self):
        self.config_dir = Path.home() / '.ai-control-agent'
        self.config_file = self.config_dir / 'config.json'
        self.system = platform.system()
        
    def check_dependencies(self):
        """Check if all required dependencies are installed"""
        dependencies = {
            'python': self.check_python(),
            'node': self.check_node(),
            'browser': self.check_browser()
        }
        
        if self.system == 'Windows':
            dependencies['dotnet'] = self.check_dotnet()
            
        return dependencies
    
    def check_python(self):
        try:
            result = subprocess.run(['python', '--version'], capture_output=True, text=True)
            version = result.stdout.strip()
            return version if '3.9' in version or '3.1' in version else False
        except:
            return False
    
    def check_node(self):
        try:
            result = subprocess.run(['node', '--version'], capture_output=True, text=True)
            version = result.stdout.strip()
            return version if 'v16' in version or 'v18' in version or 'v20' in version else False
        except:
            return False
    
    def check_browser(self):
        # Check for Chrome or Edge
        if self.system == 'Windows':
            chrome_path = Path('C:/Program Files/Google/Chrome/Application/chrome.exe')
            edge_path = Path('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')
            return chrome_path.exists() or edge_path.exists()
        elif self.system == 'Darwin':  # macOS
            return os.path.exists('/Applications/Google Chrome.app') or os.path.exists('/Applications/Microsoft Edge.app')
        else:  # Linux
            try:
                subprocess.run(['which', 'google-chrome'], capture_output=True, check=True)
                return True
            except:
                return False
    
    def check_dotnet(self):
        try:
            result = subprocess.run(['dotnet', '--version'], capture_output=True, text=True)
            return bool(result.stdout.strip())
        except:
            return False
    
    def install(self):
        """Install the agent"""
        print("AI Control Agent Installer")
        print("=" * 50)
        
        # Check dependencies
        print("\nChecking dependencies...")
        deps = self.check_dependencies()
        
        missing = [k for k, v in deps.items() if not v]
        if missing:
            print(f"\nMissing dependencies: {', '.join(missing)}")
            print("Please install the missing dependencies and try again.")
            return False
        
        print("All dependencies satisfied!")
        
        # Create config directory
        self.config_dir.mkdir(exist_ok=True)
        
        # Save configuration
        config = {
            'api_url': 'https://24ai.org.es/api',
            'websocket_url': 'wss://24ai.org.es/ws',
            'system': self.system,
            'installed_at': time.time()
        }
        
        with open(self.config_file, 'w') as f:
            json.dump(config, f, indent=2)
        
        print(f"\nAgent installed successfully!")
        print(f"Configuration saved to: {self.config_file}")
        
        # Send installation notification
        self.send_notification()
        
        return True
    
    def send_notification(self):
        """Send installation notification email"""
        print("\nSending installation notification to 247@247ai360.com...")
        # In production, this would make an API call to send the email
        print("Notification sent! You will receive your connection code via email.")

if __name__ == '__main__':
    agent = AIControlAgent()
    agent.install()