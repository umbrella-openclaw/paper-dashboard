#!/bin/bash
# Paper Dashboard 服务启动脚本 (localhost only)

echo "=== Paper Dashboard 服务启动 ==="

# 1. 启动前端服务器 (3460) - 仅监听 localhost
echo "[1/3] 启动前端服务器 (port 3460, localhost only)..."
cd /home/nothingts/paper-dashboard/frontend/dist
nohup python3 -m http.server 3460 --bind 127.0.0.1 > /tmp/http_3460.log 2>&1 &
sleep 1

# 2. 启动后端 API 服务器 (8080) - 仅监听 localhost
echo "[2/3] 启动后端 API 服务器 (port 8080, localhost only)..."
cd /home/nothingts/paper-dashboard/backend
nohup node server.js > /tmp/backend_8080.log 2>&1 &
sleep 1

# 3. 启动 WebSocket Relay (8081) - 仅监听 localhost
echo "[3/3] 启动 WebSocket Relay (port 8081, localhost only)..."
cd /home/nothingts/paper-dashboard/backend
nohup node ws-relay.js > /tmp/ws_relay_8081.log 2>&1 &
sleep 1

echo ""
echo "=== 服务状态 ==="
sleep 1
ss -tlnp | grep -E "127.0.0.1:3460|127.0.0.1:8080|127.0.0.1:8081" || echo "检查端口..."

echo ""
echo "=== 访问地址 (仅限本地) ==="
echo "前端:   http://127.0.0.1:3460"
echo "后端:   http://127.0.0.1:8080"
echo "WebSocket Relay: ws://127.0.0.1:8081"
echo ""
echo "请使用 SSH 端口映射访问: ssh -L 3460:127.0.0.1:3460 -L 8080:127.0.0.1:8080 user@host"
echo ""
echo "日志位置: /tmp/http_3460.log, /tmp/backend_8080.log, /tmp/ws_relay_8081.log"
