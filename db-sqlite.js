/**
 * db-sqlite.js - Pure JS SQLite using sql.js (no native compilation needed)
 * Synchronous API compatible with better-sqlite3 (with init wait).
 */
const path = require('path');
const fs = require('fs');

// sql.js initialization is async - we pre-initialize at module load
let _SQL = null;
let _db = null;
let _dbPath = null;
let _ready = false;
let _readyPromise = null;

function saveDB() {
  if (_db && _dbPath && _ready) {
    try {
      fs.writeFileSync(_dbPath, Buffer.from(_db.export()));
    } catch (e) { /* silent */ }
  }
}

setInterval(saveDB, 5000);
process.on('exit', () => { if (_ready) saveDB(); });
process.on('SIGINT', () => { if (_ready) { saveDB(); process.exit(0); } });
process.on('SIGTERM', () => { if (_ready) { saveDB(); process.exit(0); } });

async function _initSqlite(dbPath) {
  _dbPath = dbPath;
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const initSqlJs = require('sql.js');
  _SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    try {
      _db = new _SQL.Database(fs.readFileSync(dbPath));
      console.log('[SQLite] Loaded existing database from', dbPath);
    } catch (e) {
      _db = new _SQL.Database();
      console.log('[SQLite] Created new DB (load failed):', e.message);
    }
  } else {
    _db = new _SQL.Database();
    console.log('[SQLite] Created new database at', dbPath);
  }

  _db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY, sender_id TEXT NOT NULL, receiver_id TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'text', content TEXT NOT NULL,
      duration INTEGER DEFAULT 0, status TEXT NOT NULL DEFAULT 'sent',
      created_at TEXT NOT NULL, read_at TEXT, reply_to TEXT
    );
  `);
  
  // Add reply_to column if it doesn't exist (for existing databases)
  try {
    _db.run(`ALTER TABLE messages ADD COLUMN reply_to TEXT`);
  } catch (e) {
    // Column already exists, ignore
  }
  _db.run(`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);`);
  _db.run(`CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);`);
  _db.run(`CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);`);
  _db.run(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, role TEXT NOT NULL,
      content TEXT NOT NULL, time TEXT NOT NULL,
      read INTEGER DEFAULT 0, created_at TEXT NOT NULL
    );
  `);
  _db.run(`CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);`);
  _db.run(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      user_id TEXT NOT NULL, endpoint TEXT PRIMARY KEY,
      p256dh TEXT NOT NULL, auth TEXT NOT NULL, created_at TEXT NOT NULL
    );
  `);
  _db.run(`
    CREATE TABLE IF NOT EXISTS offline_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, message_id TEXT NOT NULL,
      receiver_id TEXT NOT NULL, pushed INTEGER DEFAULT 0, created_at TEXT NOT NULL
    );
  `);

  _ready = true;
  saveDB();
  console.log('[SQLite] Database initialized');
}

function _stmtAll(stmt, params) {
  if (params.length > 0) stmt.bind(params);
  const results = [];
  while (stmt.step()) results.push(stmt.getAsObject());
  stmt.free();
  return results;
}

function _createDB() {
  return {
    prepare(query) {
      return {
        all(...params) {
          if (!_ready) { console.warn('[SQLite] DB not ready:', query.substring(0, 50)); return []; }
          try {
            const stmt = _db.prepare(query);
            const results = _stmtAll(stmt, params);
            return results;
          } catch (e) {
            console.error('[SQLite] query error:', query.substring(0, 80), '|', e.message);
            return [];
          }
        },
        run(...params) {
          if (!_ready) { console.warn('[SQLite] DB not ready (run):', query.substring(0, 50)); return { changes: 0 }; }
          try {
            _db.run(query, params);
            saveDB();
            return { changes: _db.getRowsModified(), lastInsertRowid: 0 };
          } catch (e) {
            console.error('[SQLite] run error:', query.substring(0, 80), '|', e.message);
            return { changes: 0 };
          }
        }
      };
    }
  };
}

// Sync wrapper: returns a proxy immediately, starts async init in background
function initDB(dbPath) {
  // Start initialization (async, runs in background)
  _readyPromise = _initSqlite(dbPath);

  // Return a db-like proxy that queues calls until ready
  return _createDB();
}

// Expose a wait function for code that needs to await readiness
function waitReady() {
  return _readyPromise || Promise.resolve();
}

module.exports = { initDB, waitReady };
