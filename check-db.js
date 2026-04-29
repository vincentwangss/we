const db = require('better-sqlite3')('./data/chat.db');
console.log('Tables:', db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all());
console.log('\nMessages table columns:');
const cols = db.prepare('PRAGMA table_info(messages)').all();
console.log(cols.map(c => c.name).join(', '));

console.log('\nMessages data:');
const msgs = db.prepare('SELECT * FROM messages LIMIT 5').all();
msgs.forEach(m => console.log(JSON.stringify(m)));

console.log('\nChat_messages table columns:');
const cols2 = db.prepare('PRAGMA table_info(chat_messages)').all();
console.log(cols2.map(c => c.name).join(', '));

console.log('\nChat_messages data:');
const msgs2 = db.prepare('SELECT * FROM chat_messages LIMIT 5').all();
msgs2.forEach(m => console.log(JSON.stringify(m)));

db.close();
