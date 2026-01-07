import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
}

interface AgentStatus {
  connected: boolean;
  screenCapture: boolean;
  lastFrame?: string;
}

export default function OwnerTestPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to the Owner Testing Dashboard! Follow the setup instructions on the right to get started.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    connected: false,
    screenCapture: false
  });
  
  // Load API key from localStorage on mount
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('ai_control_api_key') || '';
  });
  const [apiKeySet, setApiKeySet] = useState(() => {
    const savedKey = localStorage.getItem('ai_control_api_key');
    return !!savedKey && savedKey.startsWith('sk-');
  });
  
  const [showSetup, setShowSetup] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToAgent = () => {
    // Simulate WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/ws?code=test-code&client_type=web');
    
    ws.onopen = () => {
      setAgentStatus(prev => ({ ...prev, connected: true }));
      addMessage('system', 'Connected to desktop agent successfully!');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'screen_frame') {
        setAgentStatus(prev => ({ 
          ...prev, 
          screenCapture: true,
          lastFrame: data.data 
        }));
      } else if (data.type === 'command_result') {
        addMessage('ai', `Action completed: ${data.result.message}`);
      }
    };

    ws.onerror = () => {
      addMessage('system', 'Connection failed. Make sure the backend server is running on localhost:8000');
    };

    ws.onclose = () => {
      setAgentStatus({ connected: false, screenCapture: false });
      addMessage('system', 'Disconnected from agent');
    };

    wsRef.current = ws;
  };

  const addMessage = (type: 'user' | 'ai' | 'system', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendCommand = () => {
    if (!inputValue.trim()) return;
    
    if (!agentStatus.connected) {
      addMessage('system', 'Please connect to the desktop agent first!');
      return;
    }

    addMessage('user', inputValue);
    
    // Send command via WebSocket
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'command',
        command: inputValue,
        apiKey: apiKey
      }));
      
      addMessage('ai', 'Processing your command...');
    }
    
    setInputValue('');
  };

  const saveApiKey = () => {
    if (apiKey.startsWith('sk-')) {
      // Save to localStorage
      localStorage.setItem('ai_control_api_key', apiKey);
      setApiKeySet(true);
      addMessage('system', 'API key saved successfully! It will persist across sessions.');
    } else {
      addMessage('system', 'Invalid API key format. Should start with "sk-"');
    }
  };
  
  const clearApiKey = () => {
    localStorage.removeItem('ai_control_api_key');
    setApiKey('');
    setApiKeySet(false);
    addMessage('system', 'API key cleared. Please enter a new one.');
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#161B22]">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <i className="ri-settings-3-line text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold">Owner Testing Dashboard</h1>
              <p className="text-sm text-gray-400">Test the AI control system</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              agentStatus.connected 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                agentStatus.connected ? 'bg-green-400' : 'bg-red-400'
              } ${agentStatus.connected ? 'animate-pulse' : ''}`}></div>
              <span className="text-sm font-medium whitespace-nowrap">
                {agentStatus.connected ? 'Agent Connected' : 'Agent Disconnected'}
              </span>
            </div>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Screen Monitor */}
            <div className="bg-[#161B22] rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className="ri-tv-line text-cyan-400 text-xl"></i>
                  <h2 className="font-bold">Live Screen Monitor</h2>
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  agentStatus.screenCapture ? 'text-green-400' : 'text-gray-500'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    agentStatus.screenCapture ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
                  }`}></div>
                  {agentStatus.screenCapture ? 'Capturing at 5 FPS' : 'Not capturing'}
                </div>
              </div>
              
              <div className="aspect-video bg-[#0A0E27] flex items-center justify-center relative">
                {agentStatus.lastFrame ? (
                  <img 
                    src={`data:image/jpeg;base64,${agentStatus.lastFrame}`} 
                    alt="Screen capture"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <i className="ri-computer-line text-6xl text-gray-700 mb-4"></i>
                    <p className="text-gray-500">
                      {agentStatus.connected 
                        ? 'Waiting for screen capture...' 
                        : 'Connect to agent to see live screen'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-[#161B22] rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-bold flex items-center gap-2">
                  <i className="ri-message-3-line text-cyan-400"></i>
                  Command Console
                </h2>
              </div>
              
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type !== 'user' && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'ai' 
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-500' 
                          : 'bg-gray-700'
                      }`}>
                        <i className={`${
                          message.type === 'ai' ? 'ri-robot-line' : 'ri-information-line'
                        } text-sm`}></i>
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : message.type === 'ai'
                        ? 'bg-[#21262D] text-white'
                        : 'bg-orange-500/20 text-orange-200 border border-orange-500/30'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                        <i className="ri-user-line text-sm"></i>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
                    placeholder="Type a command... (e.g., 'Open YouTube')"
                    className="flex-1 bg-[#0A0E27] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    disabled={!agentStatus.connected}
                  />
                  <button
                    onClick={handleSendCommand}
                    disabled={!agentStatus.connected}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Setup & Instructions */}
          <div className="space-y-6">
            {/* Quick Setup */}
            <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold flex items-center gap-2">
                  <i className="ri-settings-3-line text-cyan-400"></i>
                  Quick Setup
                </h2>
                <button
                  onClick={() => setShowSetup(!showSetup)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className={`ri-arrow-${showSetup ? 'up' : 'down'}-s-line`}></i>
                </button>
              </div>
              
              {showSetup && (
                <div className="space-y-4">
                  {/* Step 1: API Key */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        apiKeySet ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {apiKeySet ? <i className="ri-check-line"></i> : '1'}
                      </div>
                      <span className="text-sm font-medium">OpenAI API Key</span>
                      {apiKeySet && (
                        <span className="text-xs text-green-400">(Saved)</span>
                      )}
                    </div>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-proj-..."
                      className="w-full bg-[#0A0E27] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                      disabled={apiKeySet}
                    />
                    {!apiKeySet ? (
                      <button
                        onClick={saveApiKey}
                        className="w-full py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Save API Key
                      </button>
                    ) : (
                      <button
                        onClick={clearApiKey}
                        className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Clear & Change Key
                      </button>
                    )}
                  </div>

                  {/* Step 2: Backend Server */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <span className="text-sm font-medium">Start Backend Server</span>
                    </div>
                    <div className="bg-[#0A0E27] rounded-lg p-3 border border-gray-700">
                      <code className="text-xs text-gray-300 block">
                        cd backend<br/>
                        python main.py
                      </code>
                    </div>
                  </div>

                  {/* Step 3: Desktop Agent */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <span className="text-sm font-medium">Run Desktop Agent</span>
                    </div>
                    <div className="bg-[#0A0E27] rounded-lg p-3 border border-gray-700">
                      <code className="text-xs text-gray-300 block">
                        cd desktop-agent<br/>
                        python agent.py test-code
                      </code>
                    </div>
                  </div>

                  {/* Step 4: Connect */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <span className="text-sm font-medium">Connect to Agent</span>
                    </div>
                    <button
                      onClick={connectToAgent}
                      disabled={agentStatus.connected}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                    >
                      {agentStatus.connected ? 'Connected' : 'Connect Now'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Example Commands */}
            <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-6">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <i className="ri-lightbulb-line text-cyan-400"></i>
                Example Commands
              </h2>
              <div className="space-y-2">
                {[
                  'Open YouTube',
                  'Search Google for best restaurants',
                  'Type "Hello World"',
                  'Click the submit button',
                  'Scroll down',
                  'Open Chrome browser'
                ].map((cmd, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(cmd)}
                    className="w-full text-left px-4 py-2 bg-[#0A0E27] hover:bg-[#21262D] rounded-lg text-sm text-gray-300 hover:text-white transition-colors border border-gray-700 hover:border-cyan-500/50 whitespace-nowrap cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Installation Guide */}
            <div className="bg-[#161B22] rounded-2xl border border-gray-800 p-6">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <i className="ri-download-line text-cyan-400"></i>
                Required Downloads
              </h2>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <strong className="text-white">1. Python 3.9+</strong>
                  <p className="text-xs text-gray-400 mt-1">
                    <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                      Download from python.org
                    </a>
                  </p>
                </div>
                <div>
                  <strong className="text-white">2. Install Dependencies</strong>
                  <div className="bg-[#0A0E27] rounded-lg p-2 mt-1 border border-gray-700">
                    <code className="text-xs">pip install -r requirements.txt</code>
                  </div>
                </div>
                <div>
                  <strong className="text-white">3. OpenAI API Key</strong>
                  <p className="text-xs text-gray-400 mt-1">
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                      Get from OpenAI Platform
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}