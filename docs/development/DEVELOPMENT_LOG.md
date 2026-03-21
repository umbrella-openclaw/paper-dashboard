# Paper Dashboard Development Log

## 2026-03-21

### Session: 21:00-21:30

**Goal**: Implement OpenClaw Session trigger mechanism for Paper Dashboard

**Key Decision**: Use hybrid approach (file + Session)

**Architecture**:
```
Dashboard → WebSocket Relay → OpenClaw Gateway → Session
```

**Components Created**:
- `backend/ws-relay.js` - WebSocket relay for Gateway communication
- `frontend/src/components/paper-workflow.ts` - Workflow manager UI
- `shared/scripts/paper-workflow-session.js` - Session execution script

**Issues Encountered**:
1. Gateway authentication mode validation - Fixed by using `mode: 'cli'`
2. SSH port forwarding confusion - Clarified that direct IP access doesn't need SSH tunnel

**Security Improvements**:
- API key authentication for all /api endpoints
- WebSocket authentication via query param
- CORS restrictions

**Next Steps**:
1. Test drag-and-drop upload functionality
2. Verify API key propagation to frontend
3. Implement actual OpenClaw Session spawning

---

## 2026-03-21

### Session: 14:00-15:00

**Goal**: Integrate 8-stage POF workflow

**Key Decision**: Use 8 stages as defined in POF paper workflow

**Stages**:
1. INTAKE - Paper upload and analysis
2. LITERATURE - Literature search
3. OUTLINE - Paper structure
4. DATA_REQUIREMENTS - Data mapping
5. DRAFTING - Writing
6. POLISHING - PoF style
7. REVIEW - Quality check
8. FINALIZE - Submission

**Components Modified**:
- `stage-navigator.ts` - 8-stage display
- `config-stage.ts` - Intake phase UI
- `paper-app.ts` - Workflow integration

**Issues Encountered**:
1. TypeScript duplicate identifier errors
2. Stage preview vs advance confusion

**Solutions**:
- Added separate preview button
- Clear stage status indicators

---

## Development Principles

1. **Debug First**: Always add console logs and debug panel
2. **Test API Manually**: Use curl before debugging frontend
3. **Document Everything**: Keep this log updated
4. **Code Review**: Discuss with Codex before major changes

## Architecture Decisions

### Why Hybrid (File + Session)?
- File storage ensures persistence
- Session provides AI processing power
- Dashboard stays pure UI

### Why WebSocket Relay?
- Gateway only binds to localhost
- Browser cannot directly connect to Gateway
- Relay provides secure bridge

### Why API Key in Frontend?
- For development convenience
- Production should use proper auth flow
- Key is not sensitive (dev environment)

## Open Questions

1. How to trigger Session from Relay?
2. How to pass task context to Session?
3. Should Session be long-running or spawn-per-task?

## Code Review Notes for Codex

### frontend/src/components/config-stage.ts
- Line 5: API_KEY constant (currently hardcoded)
- Lines 14-20: apiFetch helper function
- Lines 550-600: createTask method
- Lines 650-700: uploadPapers method

### backend/server.js
- API key auth middleware (lines 30-45)
- CORS configuration (lines 47-60)
- Multer file upload config (lines 75-90)

### backend/ws-relay.js
- Gateway handshake (lines 80-100)
- Message routing (lines 150-180)
- Client auth (lines 200-220)
