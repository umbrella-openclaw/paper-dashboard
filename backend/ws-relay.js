/**
 * OpenClaw Gateway WebSocket Relay - Security Enhanced
 */

const WebSocket = require('ws');
const http = require('http');
const crypto = require('fs');

// 读取 API 密钥
const KEY_FILE = path.join(__dirname, '.api_key');
const fs = require('fs');
const path = require('path');

let API_KEY = '';
if (fs.existsSync(KEY_FILE)) {
  API_KEY = fs.readFileSync(KEY_FILE, 'utf-8').trim();
}

// 如果没有密钥文件，生成一个
if (!API_KEY) {
  API_KEY = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(KEY_FILE, API_KEY);
}

// 配置
const GATEWAY_HOST = '127.0.0.1';
const GATEWAY_PORT = 18789;
const GATEWAY_TOKEN = 'cd4a37c22ea7e71d50c067a18064fe77aac67a2a3fb1bbd7';
const RELAY_PORT = 8081;

const server = http.createServer((req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.161:3460');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Api-Key');
  
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'ws-relay', gatewayConnected }));
    return;
  }
  
  if (req.url === '/api/key-info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'WebSocket authentication required' }));
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

const wss = new WebSocket.Server({ server });
let gatewayWs = null;
let gatewayConnected = false;
let requestId = 0;
const clients = new Set();

// 认证检查
function authenticate(req) {
  const key = req.headers['x-api-key'];
  return key === API_KEY;
}

function genId() {
  return `req-${Date.now()}-${++requestId}`;
}

function connectToGateway() {
  console.log(`[Relay] Connecting to Gateway at ws://${GATEWAY_HOST}:${GATEWAY_PORT}...`);
  
  gatewayWs = new WebSocket(`ws://${GATEWAY_HOST}:${GATEWAY_PORT}`, {
    headers: { 'Authorization': `Bearer ${GATEWAY_TOKEN}` }
  });

  gatewayWs.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      handleGatewayMessage(msg);
    } catch (e) {
      console.error('[Relay] Failed to parse Gateway message:', e);
    }
  });

  gatewayWs.on('open', () => {
    console.log('[Relay] Gateway connected, sending handshake...');
    sendGatewayHandshake();
  });

  gatewayWs.on('close', (code, reason) => {
    console.log(`[Relay] Gateway disconnected: ${code}`);
    gatewayConnected = false;
    broadcastToClients({ type: 'gateway-disconnected' });
    setTimeout(connectToGateway, 3000);
  });

  gatewayWs.on('error', (err) => {
    console.error('[Relay] Gateway connection error:', err.message);
  });
}

function sendGatewayHandshake() {
  const handshake = {
    type: 'req',
    id: genId(),
    method: 'connect',
    params: {
      minProtocol: 3,
      maxProtocol: 3,
      client: { id: 'cli', version: '2026.2.26', platform: 'linux', mode: 'cli' },
      role: 'operator',
      scopes: ['operator.read', 'operator.write', 'operator.admin'],
      auth: { token: GATEWAY_TOKEN },
      locale: 'en-US',
      userAgent: 'openclaw-cli/2026.2.26'
    }
  };
  gatewayWs.send(JSON.stringify(handshake));
}

const pendingRequests = new Map();

function handleGatewayMessage(msg) {
  if (msg.type === 'res') {
    const pending = pendingRequests.get(msg.id);
    if (pending) {
      pending.resolve(msg);
      pendingRequests.delete(msg.id);
    }
    broadcastToClients({ type: 'gateway-response', payload: msg });
    
    if (msg.payload?.type === 'hello-ok') {
      console.log('[Relay] Gateway handshake successful!');
      gatewayConnected = true;
      broadcastToClients({ type: 'gateway-connected' });
    }
  } else if (msg.type === 'event') {
    broadcastToClients({ type: 'gateway-event', payload: msg });
  }
}

function sendToGateway(method, params) {
  return new Promise((resolve, reject) => {
    if (!gatewayWs || gatewayWs.readyState !== WebSocket.OPEN) {
      reject(new Error('Gateway not connected'));
      return;
    }
    
    const id = genId();
    const req = { type: 'req', id, method, params };
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error('Gateway request timeout'));
    }, 60000);
    
    pendingRequests.set(id, { resolve: (msg) => { clearTimeout(timeout); resolve(msg); }, reject });
    gatewayWs.send(JSON.stringify(req));
  });
}

function broadcastToClients(msg) {
  const data = JSON.stringify(msg);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client.authenticated) {
      client.send(data);
    }
  });
}

wss.on('connection', (ws, req) => {
  // 检查认证
  const url = new URL(req.url, `http://${req.headers.host}`);
  const apiKey = req.headers['x-api-key'] || url.searchParams.get('api_key');
  
  if (apiKey !== API_KEY) {
    console.log('[Relay] Client rejected: invalid API key');
    ws.close(4001, 'Invalid API key');
    return;
  }
  
  ws.authenticated = true;
  const clientId = genId();
  console.log(`[Relay] Client authenticated: ${clientId}`);
  clients.add(ws);
  
  ws.send(JSON.stringify({ type: 'connected', clientId, gatewayConnected }));
  
  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      console.log(`[Relay] Client message:`, msg.type);
      
      if (msg.type === 'list-sessions') {
        const result = await sendToGateway('sessions.list', {});
        ws.send(JSON.stringify({ type: 'sessions-list', requestId: msg.requestId, sessions: result.payload?.sessions || [] }));
      } else if (msg.type === 'send-message') {
        const result = await sendToGateway('session.send', { sessionKey: msg.sessionKey, message: msg.message });
        ws.send(JSON.stringify({ type: 'message-sent', requestId: msg.requestId, result: result.payload }));
      } else if (msg.type === 'get-history') {
        const result = await sendToGateway('sessions.history', { sessionKey: msg.sessionKey, limit: msg.limit || 50 });
        ws.send(JSON.stringify({ type: 'history', requestId: msg.requestId, history: result.payload?.messages || [] }));
      } else if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', gatewayConnected }));
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', error: e.message }));
    }
  });
  
  ws.on('close', () => {
    console.log(`[Relay] Client disconnected: ${clientId}`);
    clients.delete(ws);
  });
  
  ws.on('error', (err) => {
    console.error(`[Relay] Client error: ${err.message}`);
    clients.delete(ws);
  });
});

server.listen(RELAY_PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  OpenClaw Gateway WebSocket Relay - Security Enhanced ║
║  ─────────────────────────────────────────────────────  ║
║  Relay:     ws://0.0.0.0:${RELAY_PORT}                         ║
║  Gateway:   ws://${GATEWAY_HOST}:${GATEWAY_PORT}                      ║
║  Auth:      X-Api-Key Required                         ║
╚════════════════════════════════════════════════════════════╝
  `);
  connectToGateway();
});

module.exports = { server, wss };
