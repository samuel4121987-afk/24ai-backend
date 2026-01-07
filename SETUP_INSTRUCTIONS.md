# 🚀 AI Computer Control - Complete Setup Guide

## 📋 What You Need to Download

### 1. Python (Required)
- **Download**: https://www.python.org/downloads/
- **Version**: 3.9 or higher
- **Important**: Check "Add Python to PATH" during installation

### 2. OpenAI API Key (Required)
- **Get it from**: https://platform.openai.com/api-keys
- **Format**: Should start with `sk-proj-` or `sk-`
- **Model needed**: GPT-4o or GPT-4-vision-preview

---

## 🔧 Installation Steps

### Step 1: Install Backend Dependencies

Open terminal/command prompt and navigate to the backend folder:

```bash
cd backend
pip install -r requirements.txt
```

This installs:
- FastAPI (web server)
- OpenAI (AI integration)
- WebSockets (real-time communication)
- Email libraries (notifications)

### Step 2: Install Desktop Agent Dependencies

Navigate to the desktop-agent folder:

```bash
cd desktop-agent
pip install -r requirements.txt
```

This installs:
- PyAutoGUI (mouse/keyboard control)
- MSS (screen capture)
- Pillow (image processing)
- WebSockets (communication)

### Step 3: Configure API Key

You have two options:

**Option A: Through the Web Interface**
1. Go to http://localhost:5173/owner-test
2. Enter your OpenAI API key in the setup panel
3. Click "Save API Key"

**Option B: Environment Variable**
Create a `.env` file in the `backend` folder:

```
OPENAI_API_KEY=sk-proj-your-actual-key-here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=247@247ai360.com
EMAIL_PASSWORD=your-email-app-password
```

---

## 🎮 How to Test the System

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Start the Desktop Agent

Open a **NEW** terminal window and run:

```bash
cd desktop-agent
python agent.py test-code
```

You should see:
```
AI Control Agent Starting...
System: Windows/Darwin/Linux
Access Code: test-code
Connected to ws://localhost:8000/ws/agent/test-code
```

### Step 3: Open the Testing Dashboard

1. Make sure your React app is running:
   ```bash
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:5173/owner-test
   ```

3. You'll see the Owner Testing Dashboard with:
   - Live screen monitor
   - Command console
   - Setup instructions
   - Connection status

### Step 4: Connect Everything

1. In the testing dashboard, enter your OpenAI API key (Step 1)
2. Make sure backend server is running (Step 2)
3. Make sure desktop agent is running (Step 3)
4. Click "Connect Now" button (Step 4)

You should see:
- ✅ "Agent Connected" status turns green
- ✅ Live screen capture starts showing your screen
- ✅ "Capturing at 5 FPS" indicator appears

### Step 5: Test Commands

Try these example commands:

1. **"Open YouTube"** - Opens YouTube in your browser
2. **"Search Google for best restaurants"** - Opens Google and searches
3. **"Type Hello World"** - Types the text
4. **"Scroll down"** - Scrolls the page
5. **"Open Chrome browser"** - Launches Chrome

---

## 🔑 API Keys You Need

### OpenAI API Key
- **Where to get**: https://platform.openai.com/api-keys
- **Cost**: Pay-as-you-go (approximately $0.01-0.03 per command)
- **Format**: `sk-proj-...` (very long string)

### Email Configuration (Optional for now)
For sending notifications to users, you'll need:
- SMTP server details (Gmail, SendGrid, etc.)
- Email address: 247@247ai360.com
- App password (not your regular password)

**Gmail Setup**:
1. Enable 2-factor authentication
2. Generate an "App Password" at https://myaccount.google.com/apppasswords
3. Use that password in the `.env` file

---

## 🎯 Quick Access

### Owner Testing Dashboard
- **URL**: http://localhost:5173/owner-test
- **Access**: Click the orange gear icon in bottom-right corner of homepage
- **Purpose**: Test the AI control system before deploying

### Regular User Dashboard
- **URL**: http://localhost:5173/dashboard
- **Access**: Users with access codes
- **Purpose**: Production interface for end users

---

## 🐛 Troubleshooting

### "Connection failed" error
**Problem**: Backend server not running
**Solution**: 
```bash
cd backend
python main.py
```

### "Agent Disconnected" status
**Problem**: Desktop agent not running
**Solution**:
```bash
cd desktop-agent
python agent.py test-code
```

### "Invalid API key" error
**Problem**: OpenAI API key is wrong or expired
**Solution**: 
1. Go to https://platform.openai.com/api-keys
2. Create a new key
3. Copy the full key (starts with `sk-`)
4. Paste it in the testing dashboard

### Screen capture not working
**Problem**: Missing permissions
**Solution**:
- **Mac**: System Preferences → Security & Privacy → Screen Recording → Allow Python
- **Windows**: Run as Administrator
- **Linux**: Install `scrot` or `gnome-screenshot`

### Commands not executing
**Problem**: PyAutoGUI permissions
**Solution**:
- **Mac**: System Preferences → Security & Privacy → Accessibility → Allow Python
- **Windows**: Run as Administrator

---

## 📦 What Each File Does

### Backend (`backend/main.py`)
- Receives commands from web interface
- Sends commands to ChatGPT API
- Relays actions to desktop agent
- Manages WebSocket connections

### Desktop Agent (`desktop-agent/agent.py`)
- Captures screen continuously (2-5 FPS)
- Executes mouse/keyboard actions
- Sends screen frames to backend
- Receives commands from backend

### Web Interface (`src/pages/owner-test/page.tsx`)
- Testing dashboard for you (the owner)
- Shows live screen feed
- Command input interface
- Connection status monitoring

---

## 🚀 Next Steps After Testing

Once everything works locally:

1. **Deploy Backend** to a cloud server (AWS, DigitalOcean, Heroku)
2. **Build Desktop Agent** executables for Windows/Mac/Linux
3. **Configure Domain** (24ai.org.es) to point to your server
4. **Set up Email** notifications for user access requests
5. **Create Access Codes** for users who request access

---

## 📞 Need Help?

If you encounter any issues:

1. Check the terminal output for error messages
2. Make sure all dependencies are installed
3. Verify your API key is valid
4. Ensure all three components are running:
   - React app (npm run dev)
   - Backend server (python main.py)
   - Desktop agent (python agent.py test-code)

---

## 🎉 You're Ready!

Once you see:
- ✅ Green "Agent Connected" status
- ✅ Live screen capture showing your screen
- ✅ Commands executing successfully

You're all set! The system is working and ready for testing.

Try the example commands and watch the AI control your computer in real-time! 🚀
