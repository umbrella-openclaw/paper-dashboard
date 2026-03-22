/**
 * Paper Workflow Manager
 * 
 * 管理 Dashboard 与 OpenClaw Session 之间的通信
 */

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const WS_RELAY_URL = 'ws://localhost:8081';

interface Session {
  key: string;
  displayName: string;
  kind: string;
  updatedAt: number;
  sessionId: string;
}

interface TaskStatus {
  task_id: string;
  stage: string;
  stage_status: string;
  progress: {
    papers_processed: number;
    papers_total: number;
    topics_generated: number;
  };
  messages: Array<{timestamp: string; from: string; content: string}>;
  error: string | null;
}

@customElement('paper-workflow')
export class PaperWorkflow extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .status-bar {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-4);
    }

    .ws-status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ef4444;
    }

    .ws-status.connected {
      background: #22c55e;
    }

    .ws-status.connecting {
      background: #f59e0b;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .info {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }

    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text-primary);
      font-size: var(--text-sm);
      font-weight: 600;
      padding: var(--space-2) var(--space-3);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    button:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    button.primary {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: #fff;
    }

    button.primary:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .message-log {
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      max-height: 200px;
      overflow-y: auto;
      font-size: var(--text-xs);
      margin-top: var(--space-3);
    }

    .message-item {
      padding: var(--space-1) 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    .message-item:last-child {
      border-bottom: none;
    }

    .message-time {
      color: var(--color-text-tertiary);
      margin-right: var(--space-2);
    }

    .message-from {
      font-weight: 600;
    }

    .message-from.agent {
      color: var(--color-accent);
    }

    .message-from.user {
      color: #4338ca;
    }

    .message-from.system {
      color: var(--color-text-tertiary);
    }

    .sessions-list {
      margin-top: var(--space-3);
      display: grid;
      gap: var(--space-2);
    }

    .session-item {
      padding: var(--space-2) var(--space-3);
      background: var(--color-bg);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .session-item:hover {
      border-color: var(--color-accent);
    }

    .session-item.active {
      border-color: var(--color-accent);
      background: var(--color-accent-light);
    }
  `;

  @state() private wsConnected = false;
  @state() private sessions: Session[] = [];
  @state() private currentTaskId: string | null = null;
  @state() private taskStatus: TaskStatus | null = null;
  @state() private messages: Array<{timestamp: string; from: string; content: string}> = [];

  private ws: WebSocket | null = null;
  private requestId = 0;
  private pendingRequests = new Map<string, any>();

  connectedCallback() {
    super.connectedCallback();
    this.connect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnect();
  }

  private connect() {
    if (this.ws) {
      this.ws.close();
    }

    console.log('[Workflow] Connecting to relay...');
    
    this.ws = new WebSocket(WS_RELAY_URL);

    this.ws.onopen = () => {
      console.log('[Workflow] Connected to relay');
      this.wsConnected = true;
    };

    this.ws.onclose = () => {
      console.log('[Workflow] Disconnected from relay');
      this.wsConnected = false;
      // 尝试重新连接
      setTimeout(() => this.connect(), 3000);
    };

    this.ws.onerror = (err) => {
      console.error('[Workflow] WebSocket error:', err);
    };

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.handleMessage(msg);
      } catch (e) {
        console.error('[Workflow] Failed to parse message:', e);
      }
    };
  }

  private disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private send(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      const requestId = `req-${++this.requestId}`;
      const payload = { ...data, requestId };

      this.pendingRequests.set(requestId, { resolve, reject });
      this.ws.send(JSON.stringify(payload));

      // 超时
      setTimeout(() => {
        if (this.pendingRequests.has(requestId)) {
          this.pendingRequests.delete(requestId);
          reject(new Error('Request timeout'));
        }
      }, 60000);
    });
  }

  private handleMessage(msg: any) {
    if (msg.type === 'connected') {
      console.log('[Workflow] Relay connected, gateway:', msg.gatewayConnected);
    } else if (msg.type === 'gateway-connected') {
      console.log('[Workflow] Gateway connected');
      // 自动刷新 sessions
      this.refreshSessions();
    } else if (msg.type === 'gateway-response' && msg.payload?.type === 'hello-ok') {
      this.wsConnected = true;
    } else if (msg.type === 'sessions-list') {
      this.sessions = msg.sessions || [];
    } else if (msg.type === 'history') {
      this.messages = msg.history || [];
    } else if (msg.type === 'gateway-event') {
      // 处理事件
      console.log('[Workflow] Gateway event:', msg.payload);
    } else if (msg.type === 'message-sent') {
      console.log('[Workflow] Message sent:', msg.result);
    }
  }

  async refreshSessions() {
    try {
      const result = await this.send({ type: 'list-sessions' });
      this.sessions = result.payload?.sessions || [];
    } catch (e) {
      console.error('[Workflow] Failed to refresh sessions:', e);
    }
  }

  async sendMessage(sessionKey: string, message: string) {
    try {
      const result = await this.send({
        type: 'send-message',
        sessionKey,
        message
      });
      return result;
    } catch (e) {
      console.error('[Workflow] Failed to send message:', e);
      throw e;
    }
  }

  async getHistory(sessionKey: string) {
    try {
      const result = await this.send({
        type: 'get-history',
        sessionKey,
        limit: 50
      });
      return result.payload?.messages || [];
    } catch (e) {
      console.error('[Workflow] Failed to get history:', e);
      return [];
    }
  }

  async startAnalysis(taskId: string, pdfFiles: string[]) {
    this.currentTaskId = taskId;
    
    // 查找 paper-dashboard session
    const dashboardSession = this.sessions.find(s => 
      s.displayName?.includes('paper-dashboard') || 
      s.key?.includes('paper-dashboard')
    );

    if (!dashboardSession) {
      // 如果没有找到，创建一个简单的任务消息
      const message = `开始分析论文任务 ${taskId}，文件：${pdfFiles.join(', ')}`;
      console.log('[Workflow] No dashboard session found, message:', message);
      this.messages = [
        ...this.messages,
        { timestamp: new Date().toISOString(), from: 'system', content: message }
      ];
      return;
    }

    // 通过 Session 发送消息
    const message = JSON.stringify({
      action: 'start_paper_analysis',
      taskId,
      pdfFiles
    });

    await this.sendMessage(dashboardSession.key, message);
    
    this.messages = [
      ...this.messages,
      { timestamp: new Date().toISOString(), from: 'user', content: message }
    ];

    // 监听响应
    setTimeout(async () => {
      const history = await this.getHistory(dashboardSession.key);
      this.messages = [...this.messages, ...history.slice(-5)];
    }, 5000);
  }

  render() {
    return html`
      <div class="status-bar">
        <div class="ws-status ${this.wsConnected ? 'connected' : 'connecting'}"></div>
        <span class="info">
          ${this.wsConnected ? '已连接到 OpenClaw' : '连接中...'}
        </span>
        <button @click=${() => this.refreshSessions()} ?disabled=${!this.wsConnected}>
          刷新 Sessions
        </button>
      </div>

      ${this.messages.length > 0 ? html`
        <div class="message-log">
          ${this.messages.map(msg => html`
            <div class="message-item">
              <span class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</span>
              <span class="message-from ${msg.from}">${msg.from}:</span>
              <span>${msg.content}</span>
            </div>
          `)}
        </div>
      ` : ''}

      ${this.sessions.length > 0 ? html`
        <div class="sessions-list">
          <strong>活跃 Sessions (${this.sessions.length})</strong>
          ${this.sessions.slice(0, 10).map(session => html`
            <div class="session-item">
              <strong>${session.displayName || session.key}</strong>
              <div style="font-size: 10px; color: var(--color-text-tertiary);">
                ${new Date(session.updatedAt).toLocaleString()}
              </div>
            </div>
          `)}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'paper-workflow': PaperWorkflow;
  }
}
