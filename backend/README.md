# AI Control Assistant - Backend API

Backend server for the AI Control Assistant system.

## Features

- RESTful API for access requests and command execution
- WebSocket server for real-time communication
- ChatGPT integration for natural language processing
- Connection management between web clients and desktop agents
- Email notifications for access requests and installations

## Setup

### Prerequisites

- Python 3.9+
- OpenAI API key

### Installation

```bash
pip install -r requirements.txt
```

### Configuration

Create a `.env` file:

```env
OPENAI_API_KEY=your_api_key_here
ADMIN_EMAIL=247@247ai360.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password
```

### Run the Server

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### POST /api/access-request
Submit an access request
```json
{
  "email": "user@example.com",
  "use_case": "personal",
  "message": "Optional message"
}
```

### POST /api/execute-command
Execute a natural language command
```json
{
  "command": "Open YouTube",
  "access_code": "user_access_code"
}
```

### WebSocket /ws?code=ACCESS_CODE&client_type=web|agent
Real-time bidirectional communication

### GET /api/health
Health check endpoint

## Deployment

### Docker

```bash
docker build -t ai-control-api .
docker run -p 8000:8000 ai-control-api
```

### Production

Use a production ASGI server like Gunicorn with Uvicorn workers:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Security

- All WebSocket connections require valid access codes
- API endpoints validate request data
- CORS configured for specific origins
- Rate limiting recommended for production
- SSL/TLS required for production deployment

## Monitoring

The `/api/health` endpoint provides:
- Server status
- Active connection count
- Active agent count
- Timestamp

## Support

Email: 247@247ai360.com