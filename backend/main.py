"""
Backend API Server for AI Control Assistant
Handles authentication, WebSocket connections, and ChatGPT API integration
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import json
import asyncio
from typing import Dict, Set
import os
from datetime import datetime

app = FastAPI(title="AI Control API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://24ai.org.es", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI Configuration - Read from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

if not openai.api_key:
    print("WARNING: OPENAI_API_KEY environment variable not set!")

# Store active connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.agent_connections: Dict[str, WebSocket] = {}
    
    async def connect_web(self, access_code: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[access_code] = websocket
    
    async def connect_agent(self, access_code: str, websocket: WebSocket):
        await websocket.accept()
        self.agent_connections[access_code] = websocket
    
    def disconnect_web(self, access_code: str):
        if access_code in self.active_connections:
            del self.active_connections[access_code]
    
    def disconnect_agent(self, access_code: str):
        if access_code in self.agent_connections:
            del self.agent_connections[access_code]
    
    async def send_to_agent(self, access_code: str, message: dict):
        if access_code in self.agent_connections:
            await self.agent_connections[access_code].send_json(message)
    
    async def send_to_web(self, access_code: str, message: dict):
        if access_code in self.active_connections:
            await self.active_connections[access_code].send_json(message)

manager = ConnectionManager()

# Models
class AccessRequest(BaseModel):
    email: str
    use_case: str
    message: str = ""

class CommandRequest(BaseModel):
    command: str
    access_code: str

# Routes
@app.post("/api/access-request")
async def request_access(request: AccessRequest):
    """Handle access request and send email to admin"""
    # In production, this would:
    # 1. Store request in database
    # 2. Send email to 247@247ai360.com
    # 3. Generate access code
    # 4. Send code to user via email
    
    print(f"Access request from {request.email}")
    print(f"Use case: {request.use_case}")
    print(f"Message: {request.message}")
    
    # Simulate sending email
    return {
        "status": "success",
        "message": "Access request submitted. You'll receive your code within 24 hours."
    }

@app.post("/api/execute-command")
async def execute_command(request: CommandRequest):
    """Process natural language command with ChatGPT and send to agent"""
    
    try:
        # Send command to ChatGPT for processing
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": """You are an AI assistant that converts natural language commands into structured computer control actions.
                    
                    Available actions:
                    - mouse_click: {x, y}
                    - mouse_move: {x, y}
                    - keyboard_type: {text}
                    - keyboard_press: {key}
                    - open_url: {url}
                    - open_app: {app}
                    - scroll: {amount}
                    
                    Return JSON with: {type, params}"""
                },
                {
                    "role": "user",
                    "content": request.command
                }
            ]
        )
        
        # Parse ChatGPT response
        action = json.loads(response.choices[0].message.content)
        
        # Send to desktop agent
        await manager.send_to_agent(request.access_code, {
            "type": "command",
            "command": action
        })
        
        return {
            "status": "success",
            "action": action
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, code: str, client_type: str = "web"):
    """WebSocket endpoint for real-time communication"""
    
    if client_type == "web":
        await manager.connect_web(code, websocket)
    else:
        await manager.connect_agent(code, websocket)
    
    try:
        while True:
            data = await websocket.receive_json()
            
            if client_type == "agent":
                # Forward screen frames and results to web client
                await manager.send_to_web(code, data)
            else:
                # Forward commands to agent
                await manager.send_to_agent(code, data)
                
    except WebSocketDisconnect:
        if client_type == "web":
            manager.disconnect_web(code)
        else:
            manager.disconnect_agent(code)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "active_connections": len(manager.active_connections),
        "active_agents": len(manager.agent_connections)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)