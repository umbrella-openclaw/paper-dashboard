# Paper Dashboard - OpenClaw 集成架构

## 核心设计原则

1. **Dashboard = 纯 UI** - 只负责显示和交互，不承担 AI 业务逻辑
2. **OpenClaw = AI 大脑** - 处理所有论文分析工作，调用 Skills
3. **每个论文任务 = 独立 Session** - 完全隔离，不互相干扰

## 系统架构

```
┌──────────────────────────────────────────────────────────────────────┐
│                         Dashboard (浏览器)                              │
│                                                                       │
│  • 用户上传 PDF → 保存到 shared/papers/{task_id}/input/              │
│  • WebSocket 连接 Relay (:8081)                                      │
│  • 发送触发消息 → 启动 OpenClaw Session                               │
│  • 接收 Session 响应 → 更新 UI                                       │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                         WebSocket (:8081)
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    WebSocket Relay (:8081)                             │
│                                                                       │
│  • Dashboard ↔ Gateway 之间的消息桥梁                                │
│  • 不承担业务逻辑，只做协议转换                                        │
│  • 维护 Gateway 连接状态                                              │
│  • 消息路由：Dashboard → Gateway / Gateway → Dashboard                │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                         WebSocket (:18789)
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    OpenClaw Gateway (:18789)                           │
│                                                                       │
│  • sessions.list - 列出所有 Session                                   │
│  • sessions.send - 向指定 Session 发送消息                            │
│  • sessions.spawn - 启动新 Session                                    │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                         Session 生命周期管理
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    Paper Workflow Session                              │
│                                                                       │
│  触发方式：                                                          │
│  • Dashboard 点击"开始分析" → sessions.send → 发送论文任务消息         │
│                                                                       │
│  Session 职责：                                                     │
│  1. 读取 shared/papers/{task_id}/input/ 中的 PDF                    │
│  2. 调用 OpenClaw Skills 分析论文：                                   │
│     - expertise/ (CFD/Focalors 知识库)                               │
│     - thesis-polishing-assistant/                                    │
│     - citation-network-builder/                                      │
│  3. 生成元数据、选题推荐                                             │
│  4. 写入结果到 shared/papers/{task_id}/                              │
│     - status.json (状态)                                             │
│     - topics.json (选题)                                             │
│     - metadata.json (元数据)                                         │
│                                                                       │
│  完成后：                                                            │
│  • Session 自动结束或保持待命                                         │
│  • Dashboard 通过 status.json 获取结果                                │
└──────────────────────────────────────────────────────────────────────┘
```

## Session 隔离机制

| 论文任务 | Session | 状态 |
|----------|---------|------|
| 论文 A | Session-A | 处理中 |
| 论文 B | Session-B | 等待确认 |
| 论文 C | Session-C | 已完成 |

- 每个 Session 独立运行
- 不共享上下文
- 不互相干扰

## 消息流

### 1. 启动论文分析

```
Dashboard                    Relay                     Gateway                   Session
   │                         │                          │                        │
   │─── ws: start_analysis ──►│                          │                        │
   │                         │─── session.send ─────────►│                        │
   │                         │                          │─── process_paper ──────►│
   │                         │                          │                        │
   │                         │                          │◄── result ─────────────│
   │                         │◄── event: completed ────│                        │
   │◄── ws: analysis_done ──│                          │                        │
```

### 2. 状态轮询

```
Dashboard                    Relay                     Gateway                   Session
   │                         │                          │                        │
   │─── ws: get_status ─────►│                          │                        │
   │                         │─── sessions.history ────►│                        │
   │                         │◄── status ──────────────│                        │
   │◄── ws: status_update ──│                          │                        │
```

## 文件结构

```
/home/nothingts/paper-dashboard/
├── shared/
│   └── papers/
│       └── {task_id}/
│           ├── input/              # 上传的 PDF
│           ├── status.json         # 任务状态
│           ├── topics.json         # 选题推荐
│           └── metadata.json       # 元数据
│
├── backend/
│   ├── server.js            # HTTP API (文件管理)
│   └── ws-relay.js          # WebSocket Relay
│
└── frontend/               # Dashboard UI
    └── src/components/
        └── config-stage.ts  # 集成 WebSocket 客户端
```

## Session 工作流

### INTAKE 阶段（论文分析）

1. 接收任务消息
2. 读取 PDF 文件
3. 调用 expertise/ 分析论文内容
4. 提取元数据（标题、作者、摘要、关键词）
5. 生成 3-5 个选题候选
6. 写入 topics.json
7. 更新 status.json
8. 发送完成事件

### 选题反馈循环

1. Dashboard 显示选题
2. 用户提交反馈
3. Dashboard 发送 feedback 消息
4. Session 重新生成选题
5. 重复直到用户确认

## 安全考虑

- Gateway 只绑定 127.0.0.1，外部无法直接访问
- 通过 Relay 中转，Relay 监听 0.0.0.0
- Dashboard 与 Relay 之间需要认证（可选）

## 扩展性

- 可以启动多个 Session 并行处理
- 可以添加更多 Skills（文献检索、实验设计等）
- 可以持久化 Session 状态到数据库
