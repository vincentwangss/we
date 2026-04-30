/**
 * migrate-sqlite-to-pg.js
 * 将 SQLite 数据库迁移到 PostgreSQL (Supabase)
 * 
 * 使用方法:
 * 1. 确保本地 SQLite 数据库存在 (data/chat.db)
 * 2. 设置 DATABASE_URL 环境变量指向 Supabase
 * 3. 运行: node migrate-sqlite-to-pg.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

if (!process.env.DATABASE_URL) {
  console.error('❌ 请设置 DATABASE_URL 环境变量');
  console.error('   示例: DATABASE_URL=postgresql://user:pass@host:5432/dbname node migrate-sqlite-to-pg.js');
  process.exit(1);
}

const { Pool } = require('pg');

async function migrate() {
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  // 初始化 PostgreSQL 表
  const client = await pgPool.connect();
  try {
    console.log('📦 初始化 PostgreSQL 表...');
    
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
        read_at TIMESTAMP
      );
      
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

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
      CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
      CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
      CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
      CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);
    `);

    console.log('✅ PostgreSQL 表初始化完成');

    // 检查 SQLite 数据库
    const sqlitePath = path.join(__dirname, 'data', 'chat.db');
    if (!fs.existsSync(sqlitePath)) {
      console.log('ℹ️  SQLite 数据库不存在，跳过迁移');
      return;
    }

    console.log('📂 读取 SQLite 数据库...');
    const initSqlJs = require('sql.js');
    const SQL = await initSqlJs();
    const db = new SQL.Database(fs.readFileSync(sqlitePath));

    // 迁移 messages 表
    console.log('📨 迁移 messages 表...');
    const messages = db.exec('SELECT * FROM messages');
    if (messages.length > 0 && messages[0].values.length > 0) {
      const columns = messages[0].columns;
      let count = 0;
      
      for (const row of messages[0].values) {
        const rowData = {};
        columns.forEach((col, i) => rowData[col] = row[i]);
        
        await client.query(`
          INSERT INTO messages (id, sender_id, receiver_id, type, content, duration, status, created_at, read_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (id) DO UPDATE SET
            sender_id = EXCLUDED.sender_id,
            receiver_id = EXCLUDED.receiver_id,
            type = EXCLUDED.type,
            content = EXCLUDED.content,
            status = EXCLUDED.status
        `, [
          rowData.id,
          rowData.sender_id,
          rowData.receiver_id,
          rowData.type || 'text',
          rowData.content,
          rowData.duration || 0,
          rowData.status || 'sent',
          rowData.created_at || new Date().toISOString(),
          rowData.read_at
        ]);
        count++;
      }
      console.log(`   ✅ 迁移了 ${count} 条消息`);
    } else {
      console.log('   ℹ️  没有消息需要迁移');
    }

    // 迁移 chat_messages 表
    console.log('💬 迁移 chat_messages 表...');
    const chatMessages = db.exec('SELECT * FROM chat_messages');
    if (chatMessages.length > 0 && chatMessages[0].values.length > 0) {
      const columns = chatMessages[0].columns;
      let count = 0;
      
      for (const row of chatMessages[0].values) {
        const rowData = {};
        columns.forEach((col, i) => rowData[col] = row[i]);
        
        await client.query(`
          INSERT INTO chat_messages (id, name, role, content, time, read, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            content = EXCLUDED.content
        `, [
          rowData.id,
          rowData.name,
          rowData.role,
          rowData.content,
          rowData.time,
          rowData.read || 0,
          rowData.created_at || new Date().toISOString()
        ]);
        count++;
      }
      console.log(`   ✅ 迁移了 ${count} 条聊天记录`);
    } else {
      console.log('   ℹ️  没有聊天记录需要迁移');
    }

    console.log('🎉 迁移完成!');
  } catch (err) {
    console.error('❌ 迁移失败:', err.message);
    throw err;
  } finally {
    client.release();
    await pgPool.end();
  }
}

migrate().catch(console.error);
