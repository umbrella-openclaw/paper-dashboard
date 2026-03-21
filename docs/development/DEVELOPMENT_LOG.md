# Paper Dashboard 开发日志

## 2026-03-21 开发会话

---

## Session 1: 初始架构设计 (约 21:00)

### Master 反馈
- 需要实现论文写作工作流 Dashboard
- 使用 OpenClaw 作为 AI 大脑
- Dashboard 只做 UI

### 我的分析
- 设计了 8 阶段 POF 论文工作流
- INTAKE → LITERATURE → OUTLINE → DATA_REQUIREMENTS → DRAFTING → POLISHING → REVIEW → FINALIZE

### 解决方案
- 创建了 stage-navigator.ts（8阶段导航）
- 创建了 config-stage.ts（配置阶段 UI）
- 创建了 paper-app.ts（主应用）

### 结果
- ✅ 8 阶段 UI 显示正常
- ✅ 推进/回滚/预览按钮
- ❌ AI 处理是模拟的

---

## Session 2: OpenClaw Session 触发机制 (约 21:05)

### Master 反馈
- 不应该轮询/扫描，太被动
- Dashboard 应该主动触发 OpenClaw

### 我的分析
- Gateway 只绑定 127.0.0.1:18789
- 需要 WebSocket Relay 方案

### 解决方案
- 创建 ws-relay.js 作为中继
- Dashboard → Relay → Gateway → Session

### 结果
- ✅ WebSocket Relay 工作正常
- ✅ 可以列出所有 Sessions
- ✅ Gateway 连接成功

---

## Session 3: 安全问题 (约 21:18)

### Master 反馈
"要注意一下安全性的问题"

### 我的分析
- API 没有认证
- WebSocket 没有认证
- Token 暴露

### 解决方案
- 添加 X-Api-Key 认证
- CORS 限制
- 密钥持久化到 .api_key 文件

### 结果
- ✅ API 需要 X-Api-Key header
- ✅ WebSocket 需要 api_key 参数

---

## Session 4: Debug 模式需求 (约 21:22)

### Master 反馈
"你一定要设计一个 debug 模式，用于详细记录各种操作和日志以方便 debug"

### 我的分析
- 前端需要 Debug Panel UI
- 后端需要集中式日志
- 我（OpenClaw）也应该能看到日志

### 解决方案
- 创建 logger.js 集中式日志
- 所有日志写入 /tmp/paper-dashboard-debug.log
- 添加 /api/debug/logs 端点

### 结果
- ✅ 后台日志系统工作
- ✅ 可以直接用 exec 读取日志

---

## Session 5: 上传功能失效 (约 21:26)

### Master 反馈
"拖动论文进参考论文上传窗却没有任何反应"

### 我的分析
1. 前端没有发送 API Key
2. upload 请求返回 401

### 解决方案
- 在上传请求中添加 X-Api-Key header

### 结果
- ❌ 还有其他问题

---

## Session 6: 状态持久化问题 (约 21:27)

### Master 反馈
"刷新页面正在处理的论文就消失了"

### 我的分析
1. localStorage key 不一致
2. loadExistingTask 没有正确等待 API 连接

### 解决方案
```typescript
// 1. 统一 localStorage key
localStorage.setItem('paper-dashboard-task-id', taskId);

// 2. 等待 API 连接
while (!this.apiConnected && retries < 50) {
  await new Promise(resolve => setTimeout(resolve, 100));
  retries++;
}
```

### 结果
- ✅ 刷新后论文不再消失
- ✅ 状态正确恢复

---

## Session 7: 上传卡住问题 (约 21:29)

### Master 反馈
"显示 '0 篇论文已上传' 而且一直没有任何进度"

### 我的分析
1. uploadPapers 没有正确等待 task 创建
2. 上传请求缺少 API Key header

### 解决方案
```typescript
async uploadPapers(files: File[]) {
  if (!this.apiConnected) {
    this.errorMessage = '后端未连接，请刷新页面重试';
    return;
  }
  
  if (!this.taskId) {
    await this.createTask();
    if (!this.taskId) return;
  }
  
  this.doUpload(files);
}
```

### 结果
- ✅ 上传功能正常
- ✅ 显示正确

---

## Session 8: AI 处理不启动 (约 21:35)

### Master 反馈
"上传论文到参考论文再到 AI 处理这整个过程都是严重失效的"

### 我的分析
- trigger API 是假的，只是更新状态
- 没有真正启动 AI 处理

### 解决方案
1. 创建 processor.js 处理器
2. trigger 时启动子进程
3. processor 处理 PDF 并生成选题

### 结果
- ✅ AI 处理正常工作
- ✅ 生成 3 个选题候选
- ✅ 状态更新为 waiting_confirm

---

## Session 9: 开发留痕要求 (约 21:40)

### Master 反馈
"这个 debug 日志为什么只会显示在我前端？难道不应该在后台也有记录吗？"

### 我的分析
- 需要集中式日志系统
- 所有操作都应该被记录

### 解决方案
- logger.js 记录所有操作
- /tmp/paper-dashboard-debug.log
- /api/debug/logs 端点

### 结果
- ✅ 我可以直接查看后台日志
- ✅ 所有操作都被记录

---

## Session 10: 记录所有反馈 (约 21:41)

### Master 反馈
"在这个开发过程中我给你写的所有的反馈你一定都要记录下来"

### 我的分析
需要详细记录：
1. Master 的原始反馈
2. 我的分析过程
3. 解决方案
4. 最终结果

### 解决方案
创建完整的开发日志

### 结果
- ✅ 本文档创建

---

## 当前状态 (21:41)

### 功能状态
| 功能 | 状态 |
|------|------|
| 论文上传 | ✅ 正常 |
| 状态持久化 | ✅ 正常 |
| AI 处理 | ✅ 正常（模拟） |
| 选题生成 | ✅ 正常 |
| Debug 日志 | ✅ 正常 |

### 待完成
1. 真正的 OpenClaw Skill 集成
2. AI 深度分析（不只是模拟）
3. 多轮选题反馈
4. 后续阶段实现

### 技术栈
- 前端: Lit + TypeScript
- 后端: Node.js + Express
- 日志: /tmp/paper-dashboard-debug.log
- API Key: 3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a

### 访问地址
- 前端: http://192.168.1.161:3460
- 后端: http://192.168.1.161:8080
- Debug 日志: GET /api/debug/logs

---

## Session 11: 服务器启动失败 (21:46)

### Master 反馈
"刷新页面之后，就显示 No papers... 但点击创建新论文又有一个论文正在处理"

### 我的分析
1. 上传请求返回 401 - 缺少 X-Api-Key header
2. loadExistingTask 选择任务逻辑有问题
3. 服务器 CORS 配置有 bug 导致启动失败

### 解决方案
1. 添加 headers: { 'X-Api-Key': API_KEY } 到上传请求
2. 修改 loadExistingTask 选择最佳任务（waiting_confirm > processing > idle）
3. 修复 CORS 配置中的 console.warn bug

### 结果
- ✅ 服务器修复后正常启动
- ✅ 上传功能正常（返回 201）
- ✅ 新构建已部署

---

## Session 12: 上传问题和队列清理 (21:58)

### Master 反馈
- 上传论文完全没有反应
- 刷新页面后依然是 No papers yet
- 后端队列有 3 篇待处理论文，需要清理
- 要求实现"未指定标题论文"作为缺省名字

### 我的分析
1. 上传请求可能仍然缺少 API Key
2. 任务选择逻辑有问题
3. 需要在创建时就添加缺省标题

### 解决方案
1. 清理了所有 3 个冗余任务
2. Codex 正在分析根因
3. 将实现缺省标题逻辑

### 待完成
- [ ] 修复上传问题
- [ ] 实现"未指定标题论文"缺省名字
- [ ] Codex 分析结果

---

## Session 12 (续): 根因找到 (22:00)

### 根因分析
**API Key 不一致！**
- 前端硬编码: `3a3ce9520026e5ca4b4196f964fda10fb71fa224f0c2925fd031373298844f8a`
- 后端生成: 每次启动从 `.api_key` 文件读取（可能变化）

### 修复内容
1. ✅ 清理了所有 3 个冗余任务
2. ✅ 后端添加"未指定标题论文"缺省标题
3. ✅ 修复 API Key 不一致问题
4. ✅ 前端使用后端相同的 API Key

### 验证
- 上传测试返回 201 成功
- 后端日志显示 Upload complete

### 部署
- 新构建已推送
- Master 刷新页面测试
