const { app, BrowserWindow, Tray, Menu, ipcMain, screen } = require('electron');
const path = require('path');
const Store = require('electron-store');
const WebSocket = require('ws');
const robot = require('robotjs');
const screenshot = require('screenshot-desktop');

// Initialize electron-store for persistent settings
const store = new Store();

let mainWindow = null;
let tray = null;
let ws = null;
let isConnected = false;

// Auto-launch on startup
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: true
});

function createFloatingWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 380,
    height: 520,
    x: width - 400,
    y: height - 540,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
  
  // Make window draggable
  mainWindow.setIgnoreMouseEvents(false);
  
  // Hide instead of close
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Load saved position
  const savedPosition = store.get('windowPosition');
  if (savedPosition) {
    mainWindow.setPosition(savedPosition.x, savedPosition.y);
  }

  // Save position on move
  mainWindow.on('moved', () => {
    const [x, y] = mainWindow.getPosition();
    store.set('windowPosition', { x, y });
  });
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'tray-icon.png');
  tray = new Tray(iconPath);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Assistant',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Hide Assistant',
      click: () => {
        mainWindow.hide();
      }
    },
    { type: 'separator' },
    {
      label: isConnected ? '🟢 Connected' : '🔴 Disconnected',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Settings',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('show-settings');
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setContextMenu(contextMenu);
  tray.setToolTip('AI Control Assistant');
  
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

// WebSocket connection
function connectWebSocket() {
  const accessCode = store.get('accessCode', 'default-code');
  const wsUrl = store.get('wsUrl', 'ws://localhost:8000/ws');
  
  const fullUrl = `${wsUrl}?code=${accessCode}&client_type=agent`;
  
  console.log('🔌 Connecting to:', fullUrl);
  
  ws = new WebSocket(fullUrl);
  
  ws.on('open', () => {
    console.log('✅ Connected to server');
    isConnected = true;
    mainWindow.webContents.send('connection-status', { connected: true });
    updateTrayMenu();
  });
  
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('📨 Received:', message.type);
      
      if (message.type === 'execute_sequence') {
        await executeSequence(message.actions);
      } else if (message.type === 'command') {
        await executeAction(message.command);
      }
    } catch (error) {
      console.error('❌ Message error:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('🔴 Disconnected from server');
    isConnected = false;
    mainWindow.webContents.send('connection-status', { connected: false });
    updateTrayMenu();
    
    // Reconnect after 5 seconds
    setTimeout(connectWebSocket, 5000);
  });
  
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error.message);
  });
}

function updateTrayMenu() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Assistant',
      click: () => mainWindow.show()
    },
    {
      label: 'Hide Assistant',
      click: () => mainWindow.hide()
    },
    { type: 'separator' },
    {
      label: isConnected ? '🟢 Connected' : '🔴 Disconnected',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Settings',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('show-settings');
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setContextMenu(contextMenu);
}

// Execute actions
async function executeAction(action) {
  const { type, params } = action;
  
  try {
    console.log(`🎯 Executing: ${type}`);
    
    switch (type) {
      case 'mouse_click':
        robot.moveMouse(params.x, params.y);
        robot.mouseClick();
        break;
        
      case 'mouse_move':
        robot.moveMouse(params.x, params.y);
        break;
        
      case 'keyboard_type':
        robot.typeString(params.text);
        break;
        
      case 'keyboard_press':
        if (params.key.includes('+')) {
          const keys = params.key.split('+');
          keys.forEach(k => robot.keyToggle(k.trim(), 'down'));
          keys.reverse().forEach(k => robot.keyToggle(k.trim(), 'up'));
        } else {
          robot.keyTap(params.key);
        }
        break;
        
      case 'open_url':
        require('electron').shell.openExternal(params.url);
        break;
        
      case 'scroll':
        robot.scrollMouse(0, params.amount);
        break;
        
      case 'wait':
        await new Promise(resolve => setTimeout(resolve, params.seconds * 1000));
        break;
    }
    
    return { status: 'success', message: `Executed ${type}` };
  } catch (error) {
    console.error(`❌ Action error:`, error);
    return { status: 'error', message: error.message };
  }
}

async function executeSequence(actions) {
  mainWindow.webContents.send('sequence-start', { total: actions.length });
  
  for (let i = 0; i < actions.length; i++) {
    const result = await executeAction(actions[i]);
    
    mainWindow.webContents.send('sequence-progress', {
      step: i + 1,
      total: actions.length,
      action: actions[i],
      result
    });
    
    // Send result to server
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'action_result',
        step: i + 1,
        total: actions.length,
        action: actions[i],
        result
      }));
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  mainWindow.webContents.send('sequence-complete');
  
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'sequence_complete' }));
  }
}

// Screen capture
async function captureScreen() {
  try {
    const img = await screenshot({ format: 'png' });
    return img.toString('base64');
  } catch (error) {
    console.error('Screen capture error:', error);
    return null;
  }
}

// Start screen streaming
let streamInterval = null;
function startScreenStream() {
  if (streamInterval) return;
  
  streamInterval = setInterval(async () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const screenData = await captureScreen();
      if (screenData) {
        ws.send(JSON.stringify({
          type: 'screen_frame',
          data: screenData,
          timestamp: Date.now()
        }));
      }
    }
  }, 200); // 5 FPS
}

function stopScreenStream() {
  if (streamInterval) {
    clearInterval(streamInterval);
    streamInterval = null;
  }
}

// IPC handlers
ipcMain.on('minimize', () => {
  mainWindow.hide();
});

ipcMain.on('close', () => {
  mainWindow.hide();
});

ipcMain.on('save-settings', (event, settings) => {
  store.set('accessCode', settings.accessCode);
  store.set('wsUrl', settings.wsUrl);
  store.set('apiKey', settings.apiKey);
  
  // Reconnect with new settings
  if (ws) {
    ws.close();
  }
  connectWebSocket();
});

ipcMain.on('get-settings', (event) => {
  event.reply('settings-data', {
    accessCode: store.get('accessCode', ''),
    wsUrl: store.get('wsUrl', 'ws://localhost:8000/ws'),
    apiKey: store.get('apiKey', '')
  });
});

ipcMain.on('start-stream', () => {
  startScreenStream();
});

ipcMain.on('stop-stream', () => {
  stopScreenStream();
});

// App lifecycle
app.whenReady().then(() => {
  createFloatingWindow();
  createTray();
  
  // Auto-connect if settings exist
  const accessCode = store.get('accessCode');
  if (accessCode) {
    connectWebSocket();
    startScreenStream();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createFloatingWindow();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
  stopScreenStream();
  if (ws) {
    ws.close();
  }
});
