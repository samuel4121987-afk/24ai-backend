"""
AI Control Desktop Agent - Main Application
This agent runs on the user's computer and handles:
- Screen capture and streaming
- Command execution
- Mouse/keyboard control
- WebSocket communication with the web interface
"""

import asyncio
import json
import pyautogui
import websockets
import mss
import base64
import io
from PIL import Image
import subprocess
import platform
from pathlib import Path

class AIControlAgent:
    def __init__(self):
        self.config = self.load_config()
        self.websocket = None
        self.running = False
        self.fps = 5  # Frames per second for screen capture
        self.system = platform.system()
        
    def load_config(self):
        """Load agent configuration with default fallback"""
        config_file = Path.home() / '.ai-control-agent' / 'config.json'
        
        # ⚠️ CRITICAL: Default configuration to prevent None values
        default_config = {
            'websocket_url': 'ws://localhost:8000/ws',
            'api_url': 'http://localhost:8000/api'
        }
        
        if config_file.exists():
            try:
                with open(config_file, 'r') as f:
                    loaded_config = json.load(f)
                    print(f"✅ Config file found at: {config_file}")
                    print(f"📄 Config contents: {loaded_config}")
                    
                    # Merge with defaults to ensure all keys exist
                    final_config = {**default_config, **loaded_config}
                    print(f"🔧 Final config after merge: {final_config}")
                    return final_config
            except Exception as e:
                print(f"⚠️ Error reading config file: {e}")
                print(f"📦 Using default configuration: {default_config}")
                return default_config
        else:
            print(f"⚠️ Config file not found at: {config_file}")
            print(f"📦 Using default configuration: {default_config}")
            return default_config
    
    async def capture_screen(self):
        """Capture screen and return as base64 encoded image"""
        with mss.mss() as sct:
            monitor = sct.monitors[1]  # Primary monitor
            screenshot = sct.grab(monitor)
            
            # Convert to PIL Image
            img = Image.frombytes('RGB', screenshot.size, screenshot.rgb)
            
            # Resize for bandwidth optimization
            img.thumbnail((1280, 720), Image.Resampling.LANCZOS)
            
            # Convert to base64
            buffer = io.BytesIO()
            img.save(buffer, format='JPEG', quality=85)
            img_str = base64.b64encode(buffer.getvalue()).decode()
            
            return img_str
    
    async def execute_command(self, command_data):
        """Execute a command received from the web interface"""
        command_type = command_data.get('type')
        params = command_data.get('params', {})
        
        try:
            if command_type == 'mouse_click':
                x, y = params.get('x'), params.get('y')
                pyautogui.click(x, y)
                return {'status': 'success', 'message': f'Clicked at ({x}, {y})'}
            
            elif command_type == 'mouse_move':
                x, y = params.get('x'), params.get('y')
                pyautogui.moveTo(x, y)
                return {'status': 'success', 'message': f'Moved to ({x}, {y})'}
            
            elif command_type == 'keyboard_type':
                text = params.get('text')
                pyautogui.write(text)
                return {'status': 'success', 'message': f'Typed: {text}'}
            
            elif command_type == 'keyboard_press':
                key = params.get('key')
                pyautogui.press(key)
                return {'status': 'success', 'message': f'Pressed: {key}'}
            
            elif command_type == 'open_url':
                url = params.get('url')
                if self.system == 'Windows':
                    subprocess.run(['start', url], shell=True)
                elif self.system == 'Darwin':  # macOS
                    subprocess.run(['open', url])
                else:  # Linux
                    subprocess.run(['xdg-open', url])
                return {'status': 'success', 'message': f'Opened URL: {url}'}
            
            elif command_type == 'open_app':
                app_name = params.get('app')
                if self.system == 'Windows':
                    subprocess.Popen(app_name, shell=True)
                elif self.system == 'Darwin':
                    subprocess.Popen(['open', '-a', app_name])
                else:
                    subprocess.Popen(app_name, shell=True)
                return {'status': 'success', 'message': f'Opened app: {app_name}'}
            
            elif command_type == 'scroll':
                amount = params.get('amount', 0)
                pyautogui.scroll(amount)
                return {'status': 'success', 'message': f'Scrolled: {amount}'}
            
            else:
                return {'status': 'error', 'message': f'Unknown command type: {command_type}'}
                
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    async def screen_stream_loop(self):
        """Continuously capture and send screen frames"""
        while self.running:
            try:
                screen_data = await self.capture_screen()
                await self.websocket.send(json.dumps({
                    'type': 'screen_frame',
                    'data': screen_data,
                    'timestamp': asyncio.get_event_loop().time()
                }))
                await asyncio.sleep(1 / self.fps)
            except Exception as e:
                print(f"Screen capture error: {e}")
                await asyncio.sleep(1)
    
    async def connect(self, access_code):
        """Connect to the web interface via WebSocket"""
        # Get WebSocket URL from config with guaranteed default
        base_ws_url = self.config.get('websocket_url', 'ws://localhost:8000/ws')
        
        # Extra safety check - should never be None now
        if not base_ws_url or base_ws_url == 'None':
            base_ws_url = 'ws://localhost:8000/ws'
            print(f"⚠️ WebSocket URL was invalid, using default: {base_ws_url}")
        
        # Build complete WebSocket URL with query parameters
        ws_url = f"{base_ws_url}?code={access_code}&client_type=agent"
        
        print(f"🔌 Connecting to: {ws_url}")
        
        try:
            async with websockets.connect(ws_url) as websocket:
                self.websocket = websocket
                self.running = True
                
                print(f"✅ Connected successfully!")
                print(f"💻 System: {self.system}")
                print(f"📹 Screen capture: {self.fps} FPS")
                print(f"⏳ Waiting for commands...")
                
                # Start screen streaming in background
                stream_task = asyncio.create_task(self.screen_stream_loop())
                
                try:
                    # Listen for commands
                    async for message in websocket:
                        data = json.loads(message)
                        
                        if data.get('type') == 'command':
                            result = await self.execute_command(data.get('command'))
                            await websocket.send(json.dumps({
                                'type': 'command_result',
                                'result': result
                            }))
                        
                        elif data.get('type') == 'set_fps':
                            self.fps = data.get('fps', 5)
                            print(f"FPS updated to: {self.fps}")
                            
                except websockets.exceptions.ConnectionClosed:
                    print("Connection closed by server")
                finally:
                    self.running = False
                    stream_task.cancel()
                    
        except Exception as e:
            print(f"❌ Connection failed: {e}")
            print(f"\n🔍 Troubleshooting:")
            print(f"1. Make sure backend server is running: python backend/main.py")
            print(f"2. Check if port 8000 is available")
            print(f"3. Verify WebSocket URL: {ws_url}")
            print(f"4. Current config: {self.config}")
    
    def run(self, access_code):
        """Run the agent"""
        print("=" * 60)
        print("🤖 AI Control Desktop Agent")
        print("=" * 60)
        print(f"💻 System: {self.system}")
        print(f"🔑 Access Code: {access_code}")
        print(f"🌐 WebSocket URL: {self.config.get('websocket_url', 'ws://localhost:8000/ws')}")
        print("=" * 60)
        
        asyncio.run(self.connect(access_code))

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python agent.py <access_code>")
        print("\nExample:")
        print("  python agent.py test-code")
        sys.exit(1)
    
    access_code = sys.argv[1]
    agent = AIControlAgent()
    agent.run(access_code)
