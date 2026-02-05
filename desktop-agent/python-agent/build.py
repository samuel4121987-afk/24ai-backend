"""
Build script for creating standalone executables
Creates installers for Windows, macOS, and Linux
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

class AgentBuilder:
    def __init__(self):
        self.system = platform.system()
        self.script_dir = Path(__file__).parent
        self.dist_dir = self.script_dir / 'dist'
        
    def build_windows(self):
        """Build Windows executable"""
        print("🪟 Building for Windows...")
        
        cmd = [
            'pyinstaller',
            '--onefile',
            '--windowed',
            '--name=AI-Control-Agent',
            '--icon=assets/icon.ico',
            '--add-data=assets;assets',
            'agent_with_tray.py'
        ]
        
        subprocess.run(cmd, check=True)
        print("✅ Windows build complete!")
        
    def build_mac(self):
        """Build macOS application"""
        print("🍎 Building for macOS...")
        
        cmd = [
            'pyinstaller',
            '--onefile',
            '--windowed',
            '--name=AI-Control-Agent',
            '--icon=assets/icon.icns',
            '--add-data=assets:assets',
            '--osx-bundle-identifier=com.aicontrol.agent',
            'agent_with_tray.py'
        ]
        
        subprocess.run(cmd, check=True)
        print("✅ macOS build complete!")
        
    def build_linux(self):
        """Build Linux executable"""
        print("🐧 Building for Linux...")
        
        cmd = [
            'pyinstaller',
            '--onefile',
            '--name=AI-Control-Agent',
            '--icon=assets/icon.png',
            '--add-data=assets:assets',
            'agent_with_tray.py'
        ]
        
        subprocess.run(cmd, check=True)
        print("✅ Linux build complete!")
        
    def build_all(self):
        """Build for all platforms"""
        print("🚀 Building AI Control Agent for all platforms...")
        print("=" * 60)
        
        if self.system == 'Windows':
            self.build_windows()
        elif self.system == 'Darwin':
            self.build_mac()
        elif self.system == 'Linux':
            self.build_linux()
        else:
            print(f"❌ Unsupported platform: {self.system}")
            return
        
        print("\n" + "=" * 60)
        print("✅ Build complete!")
        print(f"📁 Executable is in: {self.dist_dir}")
        print("=" * 60)
        
    def create_installer(self):
        """Create platform-specific installer"""
        if self.system == 'Windows':
            self.create_windows_installer()
        elif self.system == 'Darwin':
            self.create_mac_installer()
        elif self.system == 'Linux':
            self.create_linux_installer()
    
    def create_windows_installer(self):
        """Create Windows NSIS installer"""
        print("📦 Creating Windows installer...")
        # This would use NSIS or Inno Setup
        # For now, just copy the executable
        print("⚠️ Manual step: Use NSIS or Inno Setup to create installer")
        
    def create_mac_installer(self):
        """Create macOS DMG"""
        print("📦 Creating macOS DMG...")
        # This would use create-dmg or similar tool
        print("⚠️ Manual step: Use create-dmg to create DMG installer")
        
    def create_linux_installer(self):
        """Create Linux packages"""
        print("📦 Creating Linux packages...")
        # This would create .deb and .rpm packages
        print("⚠️ Manual step: Use fpm or similar tool to create packages")

def main():
    builder = AgentBuilder()
    
    if len(sys.argv) > 1 and sys.argv[1] == '--all':
        builder.build_all()
        builder.create_installer()
    else:
        builder.build_all()

if __name__ == '__main__':
    main()
