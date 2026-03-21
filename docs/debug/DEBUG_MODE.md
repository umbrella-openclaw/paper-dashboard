# Paper Dashboard Debug Mode

## Overview

Debug mode system for diagnosing issues like "drag-and-drop not working".

## Quick Debug Checklist

1. Backend running? `curl http://localhost:8080/api/health`
2. API Key matches? `cat backend/.api_key`
3. Browser console errors? F12 → Console
4. Network requests succeed? F12 → Network → filter by 8080

## Debug Panel

Toggle with: `?debug=true` in URL or `Ctrl+Shift+D`

Shows:
- API Calls
- WebSocket Messages  
- Component Logs
- State Changes

## Current Issue: Drag-and-Drop Not Working

### Possible Causes

1. [ ] Backend API not accessible
2. [ ] CORS blocking requests
3. [ ] API Key mismatch
4. [ ] File validation failing
5. [ ] WebSocket connection failed
6. [ ] Task creation succeeded but upload URL wrong

### Test Commands

```bash
# 1. Check backend
curl http://localhost:8080/api/health

# 2. Get API key
cat /home/nothingts/paper-dashboard/backend/.api_key

# 3. Create task
curl -X POST -H "X-Api-Key: <key>" http://localhost:8080/api/tasks

# 4. Upload file
curl -X POST -H "X-Api-Key: <key>" \
  -F "paper=@/path/to/file.pdf" \
  http://localhost:8080/api/tasks/<task_id>/papers
```

## Console Log Patterns

Look for these in browser console (F12):
```
[ConfigStage] uploadPapers called
[ConfigStage] createTask called
[ConfigStage] Upload response:
[ConfigStage] Error:
```
