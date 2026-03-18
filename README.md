# Paper Dashboard

轻量化论文管理仪表盘。Lit + Go + PostgreSQL。

## 快速开始

### 前端
```bash
cd frontend
npm install
npm run dev
```

### 后端
```bash
cd backend
go mod tidy
go run cmd/main.go
```

### 环境变量
```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=paper_dashboard
PORT=8080
```

## 设计规范

详见 [DESIGN.md](DESIGN.md)
