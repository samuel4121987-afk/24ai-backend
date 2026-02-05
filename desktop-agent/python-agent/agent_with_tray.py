"""
Enhanced AI Control Desktop Agent with System Tray
Combines the Python agent with system tray functionality
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
import sys
import threading
from pystray import Icon, Menu, MenuItem
from PIL import Image as PILImage

class AIControlAgentWithTray:
    def __init__(self):
        self.config = self.load_config()
        self.websocket = None
        self.running = False
        self.fps = 5
        self.system = platform.system()
        self.tray_icon = None
        self.connection_status = "Disconnected"
        
    def load_config(self):
        """Load agent configuration with default fallback"""
        config_file = Path.home() / '.ai-control-agent' / 'config.json'
        
        default_config = {
            'websocket_url': 'ws://localhost:8000/ws',
            'api_url': 'http://localhost:8000/api',
            'access_code': 'default-code'
        }
        
        if config_file.exists():
            try:
                with open(config_file, 'r') as f:
                    loaded_config = json.load(f)
                    return {**default_config, **loaded_config}
            except Exception as e:
                print(f"⚠️ Error reading config: {e}")
                return default_config
        else:
            return default_config
    
    def create_tray_icon(self):
        """Create system tray icon"""
        # Create a simple icon image
        icon_image = PILImage.new('RGB', (64, 64), color='purple')
        
        # Create menu
        menu = Menu(
            MenuItem('AI Control Assistant', lambda: None, enabled=False),
            Menu.SEPARATOR,
            MenuItem(
                lambda text: f'Status: {self.connection_status}',
                lambda: None,
                enabled=False
            ),
            Menu.SEPARATOR,
            MenuItem('Show Window', self.show_window),
            MenuItem('Settings', self.show_settings),
            Menu.SEPARATOR,
            MenuItem('Quit', self.quit_app)
        )
        
        # Create icon
        self.tray_icon = Icon(
            'AI Control Assistant',
            icon_image,
            'AI Control Assistant',
            menu
        )
    
    def show_window(self):
        """Show main window (placeholder)"""
        print("📱 Show window clicked")
        # In full implementation, this would show an Electron or Qt window
    
    def show_settings(self):
        """Show settings dialog (placeholder)"""
        print("⚙️ Settings clicked")
        # In full implementation, this would open settings dialog
    
    def quit_app(self):
        """Quit the application"""
        print("👋 Quitting application...")
        self.running = False
        if self.tray_icon:
            self.tray_icon.stop()
        sys.exit(0)
    
    def update_tray_status(self, status):
        """Update connection status in tray"""
        self.connection_status = status
        if self.tray_icon:
            # Update menu (pystray doesn't support dynamic menu updates easily)
            # In production, use a more sophisticated tray library
            pass
    
    async def capture_screen(self):
        """Capture screen and return as base64 encoded image"""
        with mss.mss() as sct:
            monitor = sct.monitors[1]
            screenshot = sct.grab(monitor)
            
            img = Image.frombytes('RGB', screenshot.size, screenshot.rgb)
            img.thumbnail((1280, 720), Image.Resampling.LANCZOS)
            
            buffer = io.BytesIO()
            img.save(buffer, format='JPEG', quality=85)
            img_str = base64.b64encode(buffer.getvalue()).decode()
            
            return img_str
    
    async def execute_action(self, action):
        """Execute a single action"""
        action_type = action.get('type')
        params = action.get('params', {})
        
        try:
            print(f"🎯 Executing: {action_type}")
            
            if action_type == 'mouse_click':
                x, y = params.get('x'), params.get('y')
                pyautogui.click(x, y)
                return {'status': 'success', 'message': f'Clicked at ({x}, {y})'}
            
            elif action_type == 'mouse_move':
                x, y = params.get('x'), params.get('y')
                pyautogui.moveTo(x, y)
                return {'status': 'success', 'message': f'Moved to ({x}, {y})'}
            
            elif action_type == 'keyboard_type':
                text = params.get('text')
                pyautogui.write(text, interval=0.05)
                return {'status': 'success', 'message': f'Typed: {text}'}
            
            elif action_type == 'keyboard_press':
                key = params.get('key')
                if '+' in key:
                    keys = key.split('+')
                    pyautogui.hotkey(*keys)
                else:
                    pyautogui.press(key)
                return {'status': 'success', 'message': f'Pressed: {key}'}
            
            elif action_type == 'open_url':
                url = params.get('url')
                if self.system == 'Windows':
                    subprocess.run(['start', url], shell=True)
                elif self.system == 'Darwin':
                    subprocess.run(['open', url])
                else:
                    subprocess.run(['xdg-open', url])
                return {'status': 'success', 'message': f'Opened URL: {url}'}
            
            elif action_type == 'open_app':
                app_name = params.get('app')
                if self.system == 'Windows':
                    subprocess.Popen(app_name, shell=True)
                elif self.system == 'Darwin':
                    subprocess.Popen(['open', '-a', app_name])
                else:
                    subprocess.Popen(app_name, shell=True)
                return {'status': 'success', 'message': f'Opened app: {app_name}'}
            
            elif action_type == 'scroll':
                amount = params.get('amount', 0)
                pyautogui.scroll(amount)
                return {'status': 'success', 'message': f'Scrolled: {amount}'}
            
            elif action_type == 'wait':
                seconds = params.get('seconds', 1)
                await asyncio.sleep(seconds)
                return {'status': 'success', 'message': f'Waited {seconds} seconds'}
            
            else:
                return {'status': 'error', 'message': f'Unknown action type: {action_type}'}
                
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    async def execute_sequence(self, actions):
        """Execute a sequence of actions"""
        results = []
        
        for i, action in enumerate(actions):
            print(f"📋 Step {i+1}/{len(actions)}: {action.get('type')}")
            result = await self.execute_action(action)
            results.append(result)
            
            await self.websocket.send(json.dumps({
                'type': 'action_result',
                'step': i + 1,
                'total': len(actions),
                'action': action,
                'result': result
            }))
            
            await asyncio.sleep(0.3)
        
        await self.websocket.send(json.dumps({
            'type': 'sequence_complete',
            'results': results
        }))
        
        return results
    
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
        base_ws_url = self.config.get('websocket_url', 'ws://localhost:8000/ws')
        
        if not base_ws_url or base_ws_url == 'None':
            base_ws_url = 'ws://localhost:8000/ws'
        
        ws_url = f"{base_ws_url}?code={access_code}&client_type=agent"
        
        print(f"🔌 Connecting to: {ws_url}")
        self.update_tray_status("Connecting...")
        
        try:
            async with websockets.connect(ws_url) as websocket:
                self.websocket = websocket
                self.running = True
                
                print(f"✅ Connected successfully!")
                self.update_tray_status("Connected")
                
                stream_task = asyncio.create_task(self.screen_stream_loop())
                
                try:
                    async for message in websocket:
                        data = json.loads(message)
                        
                        if data.get('type') == 'execute_sequence':
                            actions = data.get('actions', [])
                            print(f"🚀 Received sequence with {len(actions)} actions")
                            await self.execute_sequence(actions)
                        
                        elif data.get('type') == 'command':
                            result = await self.execute_action(data.get('command'))
                            await websocket.send(json.dumps({
                                'type': 'command_result',
                                'result': result
                            }))
                        
                        elif data.get('type') == 'set_fps':
                            self.fps = data.get('fps', 5)
                            print(f"FPS updated to: {self.fps}")
                            
                except websockets.exceptions.ConnectionClosed:
                    print("Connection closed by server")
                    self.update_tray_status("Disconnected")
                finally:
                    self.running = False
                    stream_task.cancel()
                    
        except Exception as e:
            print(f"❌ Connection failed: {e}")
            self.update_tray_status("Connection Failed")
    
    def run_agent(self, access_code):
        """Run the agent in async loop"""
        asyncio.run(self.connect(access_code))
    
    def run(self, access_code):
        """Run the agent with system tray"""
        print("=" * 60)
        print("🤖 AI Control Desktop Agent with System Tray")
        print("=" * 60)
        print(f"💻 System: {self.system}")
        print(f"🔑 Access Code: {access_code}")
        print("=" * 60)
        
        # Create tray icon
        self.create_tray_icon()
        
        # Run agent in separate thread
        agent_thread = threading.Thread(
            target=self.run_agent,
            args=(access_code,),
            daemon=True
        )
        agent_thread.start()
        
        # Run tray icon (blocks until quit)
        self.tray_icon.run()

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python agent_with_tray.py <access_code>")
        print("\nExample:")
        print("  python agent_with_tray.py test-code")
        sys.exit(1)
    
    access_code = sys.argv[1]
    agent = AIControlAgentWithTray()
    agent.run(access_code)
