const { Pool } = require('pg');

// PostgreSQL connection (for Supabase/production)
// Supabase requires SSL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Required for Supabase
  }
});

// Initialize database tables
async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        sender_id TEXT NOT NULL,
        receiver_id TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'text',
        content TEXT NOT NULL,
        duration INTEGER DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'sent',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP,
        reply_to TEXT
      );
    `);
    
    // Add reply_to column if it doesn't exist (for existing databases)
    try {
      const colCheck = await client.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'messages' AND column_name = 'reply_to'
      `);
      if (colCheck.rows.length === 0) {
        await client.query(`ALTER TABLE messages ADD COLUMN reply_to TEXT`);
        console.log('[PostgreSQL] Added reply_to column to messages table');
      }
    } catch (e) {
      console.log('[PostgreSQL] reply_to column check/alter:', e.message);
    }
      
      CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        time TIMESTAMP NOT NULL,
        read INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        user_id TEXT NOT NULL,
        endpoint TEXT PRIMARY KEY,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS offline_messages (
        id SERIAL PRIMARY KEY,
        message_id TEXT NOT NULL,
        receiver_id TEXT NOT NULL,
        pushed INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
      CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
      CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
      CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
      CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);
    `);
    
    console.log('[DB] PostgreSQL tables initialized');
  } finally {
    client.release();
  }
}

// Query helper - returns promise-based API
const db = {
  query: (text, params) => pool.query(text, params),
  
  // Helper methods for common patterns
  one: async (text, params) => {
    const result = await pool.query(text, params);
    return result.rows[0];
  },
  
  all: async (text, params) => {
    const result = await pool.query(text, params);
    return result.rows;
  },
  
  run: async (text, params) => {
    return pool.query(text, params);
  }
};

module.exports = { pool, db, initDatabase };
