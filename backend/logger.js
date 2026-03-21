/**
 * Centralized Logger for Paper Dashboard
 * Writes to /tmp/paper-dashboard-debug.log
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = '/tmp/paper-dashboard-debug.log';

// Ensure log file exists
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '');
}

function formatTimestamp() {
  return new Date().toISOString();
}

function formatLog(level, source, message, data) {
  const entry = {
    timestamp: formatTimestamp(),
    level,
    source,
    message,
    data
  };
  return JSON.stringify(entry);
}

function write(entry) {
  const line = JSON.stringify(entry) + '\n';
  fs.appendFileSync(LOG_FILE, line);
  
  // Also print to stdout for real-time monitoring
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
  
  error(source, message, data) {
    write({ timestamp: formatTimestamp(), level: 'error', source, message, data });
  },
  
  debug(message, data) {
    write({ timestamp: formatTimestamp(), level: 'debug', source: 'DEBUG', message, data });
  }
};

// Helper to read recent logs
logger.readRecent = function(count = 100) {
  if (!fs.existsSync(LOG_FILE)) return [];
  
  const lines = fs.readFileSync(LOG_FILE, 'utf-8').split('\n').filter(Boolean);
  return lines.slice(-count).map(line => JSON.parse(line));
};

module.exports = logger;
