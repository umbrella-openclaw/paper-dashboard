/**
 * OpenClaw Gateway WebSocket Relay - Paper Dashboard Edition
 * 
 * 功能：
 * - Dashboard WebSocket 客户端连接
 * - 向 OpenClaw Gateway 发送消息
 * - 接收并转发 Session 响应
 */

const WebSocket = require('ws');
const http = require('http');

// 配置
const GATEWAY_HOST = '127.0.0.1';
const GATEWAY_PORT = 18789;
const GATEWAY_TOKEN = 'cd4a37c22ea7e71d50c067a18064fe77aac67a2a3fb1bbd7';
const RELAY_PORT = 8081;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'ws-relay', gatewayConnected }));
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

function genId() {
  return `req-${Date.now()}-${++requestId}`;
}

function connectToGateway() {
  console.log(`[Relay] Connecting to Gateway at ws://${GATEWAY_HOST}:${GATEWAY_PORT}...`);
  
  gatewayWs = new WebSocket(`ws://${GATEWAY_HOST}:${GATEWAY_PORT}`, {
    headers: {
      'Authorization': `Bearer ${GATEWAY_TOKEN}`
    }
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
    console.log(`[Relay] Gateway disconnected: ${code} - ${reason}`);
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
      client: {
        id: 'cli',
        version: '2026.2.26',
        platform: 'linux',
        mode: 'cli'
      },
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
    // 转发事件到客户端
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
    
    pendingRequests.set(id, {
      resolve: (msg) => {
        clearTimeout(timeout);
        resolve(msg);
      },
      reject
    });
    
    gatewayWs.send(JSON.stringify(req));
  });
}

function broadcastToClients(msg) {
  const data = JSON.stringify(msg);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', (ws, req) => {
  const clientId = genId();
  console.log(`[Relay] Client connected: ${clientId}`);
  clients.add(ws);
  
  ws.send(JSON.stringify({
    type: 'connected',
    clientId,
    gatewayConnected
  }));
  
  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      console.log(`[Relay] Client message:`, msg.type);
      
      if (msg.type === 'list-sessions') {
        // 列出所有 sessions
        try {
          const result = await sendToGateway('sessions.list', {});
          ws.send(JSON.stringify({
            type: 'sessions-list',
            requestId: msg.requestId,
            sessions: result.payload?.sessions || []
          }));
        } catch (err) {
          ws.send(JSON.stringify({
            type: 'error',
            requestId: msg.requestId,
            error: err.message
          }));
        }
      } else if (msg.type === 'send-message') {
        // 发送消息到指定 session
        const { sessionKey, message } = msg;
        try {
          const result = await sendToGateway('session.send', { sessionKey, message });
          ws.send(JSON.stringify({
            type: 'message-sent',
            requestId: msg.requestId,
            result: result.payload
          }));
        } catch (err) {
          ws.send(JSON.stringify({
            type: 'error',
            requestId: msg.requestId,
            error: err.message
          }));
        }
      } else if (msg.type === 'get-history') {
        // 获取 session 历史
        const { sessionKey, limit } = msg;
        try {
          const result = await sendToGateway('sessions.history', { sessionKey, limit: limit || 50 });
          ws.send(JSON.stringify({
            type: 'history',
            requestId: msg.requestId,
            history: result.payload?.messages || []
          }));
        } catch (err) {
          ws.send(JSON.stringify({
            type: 'error',
            requestId: msg.requestId,
            error: err.message
          }));
        }
      } else if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', gatewayConnected }));
      }
    } catch (e) {
      console.error('[Relay] Failed to parse client message:', e);
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
║  OpenClaw Gateway WebSocket Relay                       ║
║  ─────────────────────────────────────────────────────  ║
║  Relay:     ws://0.0.0.0:${RELAY_PORT}                         ║
║  Gateway:   ws://${GATEWAY_HOST}:${GATEWAY_PORT}                      ║
╚════════════════════════════════════════════════════════════╝
  `);
  connectToGateway();
});

module.exports = { server, wss };
