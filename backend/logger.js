/**
 * Centralized Logger for Paper Dashboard
 */

const fs = require('fs');

const LOG_FILE = '/tmp/paper-dashboard-debug.log';

if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '');
}

function formatTimestamp() {
  return new Date().toISOString();
}

function write(entry) {
  const line = JSON.stringify(entry) + '\n';
  fs.appendFileSync(LOG_FILE, line);
  
  const color = entry.level === 'error' ? '\x1b[31m' : 
                entry.level === 'warn' ? '\x1b[33m' : '\x1b[36m';
  const reset = '\x1b[0m';
  console.log(`${color}[${entry.source}]${reset} ${entry.message}`, entry.data || '');
}

const logger = {
  api(level, message, data) {
    write({ timestamp: formatTimestamp(), level, source: 'API', message, data });
  },
  
  ws(level, message, data) {
    write({ timestamp: formatTimestamp(), level, source: 'WS', message, data });
  },
  
  gateway(level, message, data) {
    write({ timestamp: formatTimestamp(), level, source: 'GATEWAY', message, data });
  },
  
  upload(level, message, data) {
    write({ timestamp: formatTimestamp(), level, source: 'UPLOAD', message, data });
  },
  
  processor(level, message, data) {
    write({ timestamp: formatTimestamp(), level, source: 'PROCESSOR', message, data });
  },
  
  error(source, message, data) {
    write({ timestamp: formatTimestamp(), level: 'error', source, message, data });
  },
  
  info(message, data) {
    write({ timestamp: formatTimestamp(), level: 'info', source: 'SYSTEM', message, data });
  },
  
  warn(message, data) {
    write({ timestamp: formatTimestamp(), level: 'warn', source: 'SYSTEM', message, data });
  },
  
  readRecent(count = 100) {
    if (!fs.existsSync(LOG_FILE)) return [];
    const lines = fs.readFileSync(LOG_FILE, 'utf-8').split('\n').filter(Boolean);
    return lines.slice(-count).map(line => JSON.parse(line));
  }
};

module.exports = logger;
