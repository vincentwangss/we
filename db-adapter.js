// Database adapter - supports both SQLite (local) and PostgreSQL (Supabase/production)
let db;

if (process.env.DATABASE_URL) {
  // Use PostgreSQL (Supabase/production)
  const { pool, initDatabase } = require('./db-pg');
  
  // Initialize tables and export pool
  initDatabase().then(() => {
    console.log('[DB] Connected to PostgreSQL (Supabase)');
  }).catch(err => {
    console.error('[DB] PostgreSQL init failed:', err);
  });
  
  module.exports = { pool };
} else {
  // Use SQLite (local development)
  module.exports = require('./db.js');
}
