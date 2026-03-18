# Paper Dashboard - Design & Architecture Skill

轻量化论文管理仪表盘，基于 Lit Web Components + Go + PostgreSQL。

## 核心设计参数

| 参数 | 值 | 含义 |
|------|-----|------|
| DESIGN_VARIANCE | 8 | 非对称、艺术感布局 |
| MOTION_INTENSITY | 6 | 流畅但不花哨的动效 |
| VISUAL_DENSITY | 4 | 适度留白，不拥挤 |

## 1. 设计系统（Lit 适配版）

### 配色
- **禁止**：霓虹紫/蓝 (#7C3AED 等)、纯黑 (#000000)
- **主色调**：Zinc/Slate 中性基底 + 单一高对比度强调色
- **建议强调色**：Emerald-500 或 Sky-500（饱和度 < 80%）
- **中性色**：Zinc-50 到 Zinc-900

### 字体
- **禁止**：Inter、宋体衬线
- **标题**：`Geist` / `Outfit` / `Satoshi` + `font-weight: 700`
- **正文**：`Geist` / `Outfit` + `font-weight: 400`
- **代码/数据**：`JetBrains Mono` / `Geist Mono`

### 布局
- **反中心偏置**：非对称分割（60/40 或 70/30）
- **禁止**：等宽三列卡片布局
- **网格**：CSS Grid（禁止 flex 百分比计算）
- **间距**：4px 基准网格（8/16/24/32/48）

### 动效哲学
- **禁用**：线性缓动，必须用 `cubic-bezier(0.16, 1, 0.3, 1)` 或 Spring
- **入场**：Staggered cascade（`animation-delay: calc(var(--index) * 80ms)`）
- **微交互**：hover 用 `scale(0.98)` 模拟物理按压
- **动画 API**：Web Animations API（原生，无需库）

## 2. 技术栈

### 前端（Lit）
- **框架**：Lit 3.x（Web Components）
- **构建**：Vite
- **语言**：TypeScript
- **样式**：Lit CSS（CSS 模板字面量）+ CSS 变量
- **路由**：`@lit/context` + 轻量路由
- **图标**：`@phosphor-icons/web`（CDN）

### 后端（Go）
- **框架**：Gin
- **ORM**：GORM + pgx driver
- **数据库**：PostgreSQL
- **部署**：单二进制

### 数据库（轻量化）
- **表**：papers（论文元数据）、tags（标签）、folders（文件夹）
- **文件存储**：本地文件系统（`uploads/`）
- **元数据**：JSONB 可选扩展

## 3. 功能边界（轻量化原则）

### 必须包含
- 论文上传（PDF） + 元数据提取
- 分类管理（标签 + 文件夹）
- 搜索（标题/作者/摘要）
- 仪表盘统计

### 明确排除（不加入）
- ~~PDF 在线预览~~ → 仅下载
- ~~全文搜索~~ → 仅元数据搜索
- ~~多用户/权限~~ → 单用户
- ~~实时协作~~ → 无
- ~~AI 自动标签~~ → 手动
- ~~API 集成~~ → 本地优先

## 4. 组件规范（Lit）

### 命名
- `paper-card.ts`（论文卡片）
- `paper-uploader.ts`（上传组件）
- `folder-tree.ts`（文件夹树）
- `search-bar.ts`（搜索栏）
- `stat-card.ts`（统计卡片）
- `tag-chip.ts`（标签）

### 状态模式
- `@state()` 响应式属性
- `@property()` 公开属性
- `LitElement` lifecycle

### 样式隔离
- Shadow DOM 默认隔离
- CSS 变量穿透：`:host { --accent: var(--color-accent, #10b981); }`

## 5. 后端 API（轻量化）

```
POST   /api/papers          # 上传论文
GET    /api/papers          # 列表（支持分页/搜索）
GET    /api/papers/:id      # 详情
PUT    /api/papers/:id      # 更新
DELETE /api/papers/:id      # 删除

GET    /api/folders         # 文件夹树
POST   /api/folders         # 创建文件夹
DELETE /api/folders/:id     # 删除

GET    /api/tags            # 标签列表
POST   /api/tags            # 创建标签

GET    /api/stats           # 统计仪表盘
```

## 6. 项目结构

```
paper-dashboard/
├── frontend/              # Lit 前端
│   ├── src/
│   │   ├── components/    # Lit 组件
│   │   ├── pages/         # 页面级组件
│   │   ├── styles/        # 全局 CSS 变量
│   │   └── utils/         # API 客户端
│   ├── index.html
│   └── vite.config.ts
├── backend/               # Go 后端
│   ├── cmd/               # main.go 入口
│   ├── internal/           # 业务逻辑
│   └── migrations/        # SQL 迁移
├── uploads/               # 文件存储
└── README.md
```

## 7. 设计决策记录

| 日期 | 决策 | 理由 |
|------|------|------|
| 2026-03-18 | Lit 而非 React | 轻量、无需构建复杂 SPA |
| 2026-03-18 | Go + Gin | 编译型性能高、单二进制部署 |
| 2026-03-18 | PostgreSQL 仅存元数据 | JSON 文件对文件管理足够，数据库用于搜索 |
| 2026-03-18 | 排除 AI/协作功能 | 轻量化优先，聚焦核心功能 |
