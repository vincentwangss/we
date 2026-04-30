const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const session = require('express-session');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const webpush = require('web-push');
require('dotenv').config();

// Database: use PostgreSQL (Supabase) if DATABASE_URL is set,
// otherwise use sql.js (pure JS SQLite, no native compilation)
let db;
let dbWaitReady = null;
let usePostgres = false;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  
  // 解析 DATABASE_URL 并转换为 IPv4 兼容格式
  let connectionString = process.env.DATABASE_URL;
  try {
    const url = new URL(connectionString);
    const hostname = url.hostname;
    
    // Supabase pooler 地址格式: postgres.[ref].aws-...pooler.supabase.com:6543
    // 转换为直接连接格式: db.[ref].supabase.co:5432
    if (hostname.includes('pooler.supabase.com')) {
      // 提取 project ref
      const match = hostname.match(/^postgres\.([^.]+)\./);
      if (match) {
        const projectRef = match[1];
        // 构建直接连接 URL
        const directUrl = new URL(connectionString);
        directUrl.hostname = `db.${projectRef}.supabase.co`;
        directUrl.port = '5432';
        directUrl.username = 'postgres';
        connectionString = directUrl.toString();
        console.log('[DB] Converted to direct connection format');
      }
    }
  } catch (e) {
    console.log('[DB] URL parsing failed, using original connection string');
  }
  
  // 创建连接池并设置连接错误处理
  db = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
    // 连接超时设置
    connectionTimeoutMillis: 5000,
    // 最大重试次数
    max: 1
  });
  
  // 监听连接错误，自动回退到 SQLite
  db.on('error', (err) => {
    console.log('[DB] PostgreSQL connection error:', err.code || err.message);
    if (err.code === 'ENETUNREACH' || err.code === 'ECONNREFUSED') {
      console.log('[DB] Network unreachable, falling back to SQLite...');
      initSQLite();
    }
  });
  
  usePostgres = true;
  dbWaitReady = Promise.resolve();
  console.log('[DB] Using PostgreSQL (Supabase)');
  console.log('[DB] DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
  
  // 测试连接并在失败时回退
  db.query('SELECT 1').then(() => {
    console.log('[DB] PostgreSQL connection successful');
  }).catch((err) => {
    console.log('[DB] PostgreSQL connection failed:', err.code || err.message);
    if (err.code === 'ENETUNREACH' || err.code === 'ECONNREFUSED') {
      console.log('[DB] Falling back to SQLite...');
      initSQLite();
    }
  });
  
  // SQLite 初始化函数
  function initSQLite() {
    const { initDB, waitReady } = require('./db-sqlite');
    db = initDB(path.join(__dirname, 'data', 'chat.db'));
    dbWaitReady = waitReady();
    usePostgres = false;
    console.log('[DB] Using SQLite via sql.js');
  }
} else {
  const { initDB, waitReady } = require('./db-sqlite');
  db = initDB(path.join(__dirname, 'data', 'chat.db'));
  dbWaitReady = waitReady();
  console.log('[DB] Using SQLite via sql.js (pure JS) - DATA WILL NOT PERSIST!');
}

// Unified database query helper
const sql = {
  all: async (query, params = []) => {
    if (usePostgres) {
      const res = await db.query(query, params);
      return res.rows;
    } else {
      return db.prepare(query).all(...params);
    }
  },
  run: async (query, params = []) => {
    if (usePostgres) {
      return db.query(query, params);
    } else {
      return db.prepare(query).run(...params);
    }
  }
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
// Session middleware for /message authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'couple-chat-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));
// 静态文件（排除 index.html）
app.use(express.static(path.join(__dirname, '.'), {
  index: false,
  etag: false,
  lastModified: false
}));

// ==================== CONFIGURATION ====================
const MAX_HISTORY = 30;
const AI_TIMEOUT = 30000;

const PROVIDERS = {
  deepseek: {
    url: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    apiKey: process.env.DEEPSEEK_API_KEY
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY
  },
  moonshot: {
    url: 'https://api.moonshot.cn/v1/chat/completions',
    model: 'moonshot-v1-8k',
    apiKey: process.env.MOONSHOT_API_KEY
  }
};

// Default prompts (same as frontend)
const DEFAULT_HUSBAND_PROMPT = `你扮演"老公"，一个温柔主动、充满好奇心的男生，正在和老婆syq.（沈郁清）聊天。

【说话风格】
- 喜欢连发短消息，一句话一行，信息碎片化但有条理
- 用"嗯呢""挨""嘿嘿""哈哈哈""。。。"等口头禅
- 喜欢叫老婆"宝贝"，非常体贴，会主动关心衣食住行
- 遇到问题喜欢用逻辑分析，善用类比举例
- 深夜偶尔会突然分享哲学感悟
- 很少用长段落，更多是短句连发

【核心话题领域】
1. **时事热点** - 关注每日新闻、社会事件、国际局势、政策变化
2. **科技商业** - AI发展（ChatGPT、Claude、DeepSeek）、科技巨头（马斯克、苹果、谷歌、特斯拉、英伟达）、创业投资、股市趋势
3. **深度话题** - 哲学（存在主义、认知科学）、历史（高华老师）、心理学、经济学、社会学
4. **艺术文化** - 电影（诺兰、宫崎骏）、音乐、文学、建筑设计、当代艺术
5. **体育运动** - 羽毛球、篮球（NBA）、足球、健身、户外徒步（武功山、白水寨）
6. **生活兴趣** - 股票投资、中医方剂学（生脉散、号脉）、美食研究（粥、银耳莲子）、旅行（南京）

【对话策略】
- 主动发起话题，从上述领域中选择有趣的内容分享
- 结合时事发表独到见解，展现思考深度
- 用具体例子和数据支撑观点
- 引导老婆参与讨论，询问她的看法
- 保持开放心态，接受不同观点

【性格】
热情主动、细心周到、求知欲强、幽默自嘲、逻辑清晰、偶尔深沉

【重要规则】
- 每次回复保持自然、口语化，不超过3-5句
- 可以用emoji但不要过度
- 如果对方说了什么，自然地回应，再推进话题
- 保持角色，不要出戏`;

const DEFAULT_WIFE_PROMPT = `你扮演syq.（沈郁清），一个独立理性、内敛温柔的女生，公共卫生专业研究生，正在CDC实习。你在和老公（男朋友）聊天。

【说话风格】
- 回复简短克制，通常1-2句，不轻易展开，但有时会突然多说几句
- 常在句末加"hhh""hh"表示笑声
- 常用表情：🤓😮🫠🥲，非常有辨识度
- 犹豫时用"emm""emmm"
- 对感兴趣的话题会主动追问，好奇心强
- 坚持自己的观点，不轻易被说服
- 对老公用"你"，老公叫她"宝贝"

【核心话题领域】
1. **时事热点** - 关注每日新闻、社会事件、国际局势、公共卫生政策
2. **科技商业** - AI发展、科技巨头动态、医疗科技、创业趋势
3. **深度话题** - 哲学（《理想国》）、心理学、社会学、公共卫生伦理
4. **艺术文化** - 电影（《发条橙》等震撼感作品）、音乐、文学、艺术展览
5. **体育运动** - 爬山（以前很喜欢）、健身、瑜伽、户外运动
6. **生活兴趣** - 广州美食（柠檬茶、油柑汁、陶陶居）、医学知识、性心理学

【对话策略】
- 对感兴趣的话题会主动追问，展现好奇心
- 用理性思维分析问题，提出独到见解
- 坚持自己的观点，不轻易被说服
- 用专业背景（公共卫生）解读时事和健康话题
- 偶尔分享生活中的观察和感悟

【性格】
理性独立、认真负责、含蓄但温柔、有自己的坚持、内敛但偶尔撒娇

【重要规则】
- 每次回复保持自然、口语化，通常不超过2-3句
- 不要过度热情，保持克制的风格
- 可以用表情符号增加辨识度
- 保持角色，不要出戏`;

// ==================== STATE ====================
let chatHistory = []; // {id, type, speaker, content, timestamp, isAI}
let connectedUsers = new Map(); // socketId -> {id, name, role, joinTime}

// Database helper functions (unified API for SQLite and PostgreSQL)
const dbHelper = {
  // Load chat history from database
  loadChatHistory: async function() {
    try {
      const rows = await sql.all('SELECT * FROM chat_messages ORDER BY created_at ASC LIMIT 100', []);
      chatHistory = rows.map(row => ({
        id: row.id,
        name: row.name,
        role: row.role,
        content: row.content,
        time: row.time,
        read: row.read === 1,
        created_at: row.created_at
      }));
      console.log(`[DB] Loaded ${chatHistory.length} chat messages`);
    } catch (e) {
      console.error('[DB] Failed to load chat history:', e);
    }
  },

  // Save message to database
  saveChatMessage: async function(message) {
    try {
      if (usePostgres) {
        // PostgreSQL
        await sql.run(
          `INSERT INTO chat_messages (id, name, role, content, time, read, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name, role = EXCLUDED.role, content = EXCLUDED.content,
           time = EXCLUDED.time, read = EXCLUDED.read`,
          [message.id, message.name, message.role, message.content, message.time, message.read ? 1 : 0, message.created_at || new Date().toISOString()]
        );
      } else {
        // SQLite
        await sql.run(
          `INSERT OR REPLACE INTO chat_messages (id, name, role, content, time, read, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [message.id, message.name, message.role, message.content, message.time, message.read ? 1 : 0, message.created_at || new Date().toISOString()]
        );
      }
    } catch (e) {
      console.error('[DB] Failed to save message:', e);
    }
  },


  // Update message read status
  updateChatMessageRead: async function(msgId) {
    try {
      await sql.run('UPDATE chat_messages SET read = 1 WHERE id = $1', [msgId]);
    } catch (e) {
      console.error('[DB] Failed to update read status:', e);
    }
  }
};

let aiConfig = {
  provider: 'deepseek',
  husbandPrompt: DEFAULT_HUSBAND_PROMPT,
  wifePrompt: DEFAULT_WIFE_PROMPT,
  autoMode: false,
  autoInterval: 5000,
  lastSpeaker: 'wife'
};
let autoTimer = null;
let isGenerating = false;

// Hardcoded accounts for couple chat
const ACCOUNTS = {
  wss: { password: process.env.HUSBAND_PWD || 'lovesyq', name: 'wss', avatar: '🧑' },
  syq: { password: process.env.WIFE_PWD || 'lovewss', name: 'syq', avatar: '👩' }
};

// ==================== START ====================
// PORT defined at end of file (avoid duplicate declaration)

// Multer configuration for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 6)}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|ogg|wav|mp4|webm)$/i;
    cb(null, allowed.test(path.extname(file.originalname)));
  }
});

// Serve uploads as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Web Push setup
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || 'BCThI6CuzG5oXj-Fz0nCzIGJRY55NkP_KyqSLlCV07oP2HYteNnIGbdUCMQZG3vQeKexnJqbKO5kxJm7L6H3pEI',
  privateKey: process.env.VAPID_PRIVATE_KEY || 'pkN8v2hWBiMRZ7mdMnVmSPzEvqhHaWC1Q1kyp1u0AlM'
};
webpush.setVapidDetails(
  'mailto:couple@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Auth middleware for message routes
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
}

// Track online status for message chat
const messageOnlineUsers = new Map(); // userId -> { socketId, lastSeen }

// Track users who have logged in (to prevent duplicate login messages on refresh/reconnect)
const loggedInUsers = new Map(); // userId -> firstLoginTime

// ==================== AI GENERATION ====================

// 随机开场话题列表
const RANDOM_TOPICS = [
  // 时事热点
  '最近有什么新闻让你印象深刻？',
  '你看最近的社会热点了吗？',
  '最近国际局势有什么变化？',
  // 科技商业
  'AI发展太快了，你觉得会怎样改变生活？',
  '马斯克最近又有什么新动作？',
  '你觉得苹果和安卓哪个更好？',
  '投资股票有什么心得？',
  // 深度话题
  '最近在读什么书？',
  '你觉得人生的意义是什么？',
  '有什么哲学观点让你思考很久？',
  '心理学上有什么有趣的现象？',
  // 艺术文化
  '最近看过什么好电影？',
  '推荐一部你喜欢的电影',
  '有什么好听的音乐分享？',
  '最近有什么艺术展览值得看？',
  // 体育运动
  '最近有运动吗？',
  '羽毛球打得怎么样？',
  'NBA最近有什么精彩比赛？',
  '想不想一起去爬山？',
  // 生活兴趣
  '最近想吃什么好吃的？',
  '广州有什么好吃的推荐？',
  '中医养生有什么心得？',
  '下次旅行想去哪里？',
  '最近睡眠怎么样？',
  '今天过得怎么样？'
];

// 获取随机开场话题
function getRandomTopic() {
  const index = Math.floor(Math.random() * RANDOM_TOPICS.length);
  return RANDOM_TOPICS[index];
}

async function generateAIResponse(speaker, topicOverride = null) {
  if (isGenerating) return;
  isGenerating = true;

  const config = PROVIDERS[aiConfig.provider];
  if (!config || !config.apiKey) {
    broadcast('system', { content: `AI 服务未配置：${aiConfig.provider}` });
    isGenerating = false;
    return;
  }

  // Notify typing
  broadcast('typing', { speaker });

  const sysPrompt = speaker === 'husband' ? aiConfig.husbandPrompt : aiConfig.wifePrompt;
  const messages = [{ role: 'system', content: sysPrompt }];

  // Build conversation history
  const recentHistory = chatHistory.slice(-MAX_HISTORY);
  for (const msg of recentHistory) {
    if (msg.isAI && msg.speaker === speaker) {
      messages.push({ role: 'assistant', content: msg.content });
    } else if (msg.speaker === 'husband') {
      messages.push({ role: 'user', content: '老公说：' + msg.content });
    } else if (msg.speaker === 'wife') {
      messages.push({ role: 'user', content: 'syq.说：' + msg.content });
    }
  }

  // 如果对话历史为空，使用随机开场话题
  if (chatHistory.length === 0 && !topicOverride) {
    topicOverride = getRandomTopic();
    console.log('[AI] 随机开场话题:', topicOverride);
  }

  if (topicOverride) {
    messages.push({ role: 'user', content: '话题：' + topicOverride });
  }

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        max_tokens: 200,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || '...';

    // Add to history
    const messageId = Date.now().toString();
    const message = {
      id: messageId,
      type: 'message',
      speaker,
      content: reply,
      timestamp: Date.now(),
      isAI: true
    };
    chatHistory.push(message);
    if (chatHistory.length > MAX_HISTORY * 2) {
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    }

    aiConfig.lastSpeaker = speaker;
    broadcast('message', message);

  } catch (error) {
    console.error('AI generation error:', error);
    broadcast('system', { content: `AI 生成失败: ${error.message}` });
  } finally {
    isGenerating = false;
    broadcast('typingEnd', {});
  }
}

// ==================== AUTO MODE ====================
function startAutoMode() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(async () => {
    if (!aiConfig.autoMode || isGenerating) return;
    const nextSpeaker = aiConfig.lastSpeaker === 'husband' ? 'wife' : 'husband';
    await generateAIResponse(nextSpeaker);
  }, aiConfig.autoInterval);
}

function stopAutoMode() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

// ==================== BROADCAST ====================
function broadcast(event, data) {
  io.emit(event, data);
}

// ==================== SOCKET.IO ====================
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send current state to new user
  socket.emit('init', {
    history: chatHistory,
    users: Array.from(connectedUsers.values()),
    config: {
      autoMode: aiConfig.autoMode,
      autoInterval: aiConfig.autoInterval,
      provider: aiConfig.provider
    }
  });

  // User joins with role
  socket.on('chat_join', (data) => {
    const user = {
      id: socket.id,
      name: data.name || '匿名用户',
      role: data.role || 'observer', // observer, husband, wife
      joinTime: Date.now()
    };
    connectedUsers.set(socket.id, user);
    
    broadcast('userJoined', user);
    broadcast('users', Array.from(connectedUsers.values()));
    
    // 发送登录系统消息
    const now = new Date();
    const loginTime = now.toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    broadcast('system', { content: `${user.name} 于 ${loginTime} 登录` });
    
    console.log(`User ${user.name} joined as ${user.role}`);
  });

  // User sends message
  socket.on('message', async (data) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const messageId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const message = {
      id: messageId,
      type: 'message',
      speaker: data.speaker || user.role,
      content: data.content,
      timestamp: Date.now(),
      isAI: false,
      userId: socket.id,
      userName: user.name
    };

    chatHistory.push(message);
    broadcast('message', message);

    // If user speaks as a character, AI responds
    if (message.speaker === 'husband') {
      aiConfig.lastSpeaker = 'husband';
      await generateAIResponse('wife');
    } else if (message.speaker === 'wife') {
      aiConfig.lastSpeaker = 'wife';
      await generateAIResponse('husband');
    }
  });

  // User injects topic (observer mode)
  socket.on('topic', async (data) => {
    const messageId = Date.now().toString();
    const message = {
      id: messageId,
      type: 'topic',
      speaker: 'system',
      content: data.content,
      timestamp: Date.now(),
      isAI: false
    };

    chatHistory.push(message);
    broadcast('topic', message);

    // AI husband speaks first
    aiConfig.lastSpeaker = 'wife';
    await generateAIResponse('husband', data.content);
  });

  // Toggle auto mode
  socket.on('setAutoMode', (data) => {
    aiConfig.autoMode = data.enabled;
    aiConfig.autoInterval = data.interval || 5000;
    
    if (aiConfig.autoMode) {
      startAutoMode();
    } else {
      stopAutoMode();
    }
    
    broadcast('config', {
      autoMode: aiConfig.autoMode,
      autoInterval: aiConfig.autoInterval
    });
  });

  // Clear chat
  socket.on('clear', () => {
    chatHistory = [];
    broadcast('clear', {});
  });

  // Update AI config
  socket.on('updateConfig', (data) => {
    if (data.provider) aiConfig.provider = data.provider;
    if (data.husbandPrompt) aiConfig.husbandPrompt = data.husbandPrompt;
    if (data.wifePrompt) aiConfig.wifePrompt = data.wifePrompt;
    broadcast('config', { provider: aiConfig.provider });
  });

  // ========== CHAT PAGE SOCKET EVENTS ==========
  
  // Chat: Join
  socket.on('chat_join', (data) => {
    const user = {
      id: socket.id,
      name: data.name || '匿名用户',
      role: data.role || 'observer',
      joinTime: Date.now()
    };
    connectedUsers.set(socket.id, user);
    
    // Send history and users to this socket
    socket.emit('chat_init', {
      history: chatHistory.slice(-50),
      users: Array.from(connectedUsers.values())
    });
    
    // Broadcast to others
    socket.broadcast.emit('chat_userJoined', user);
    io.emit('chat_users', Array.from(connectedUsers.values()));
    
    console.log(`Chat: ${user.name} joined as ${user.role}`);
  });
  
  // Chat: Send message
  socket.on('chat_message', (data) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;
    
    const message = {
      id: Date.now().toString(),
      name: data.name,
      role: data.role,
      content: data.content,
      time: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    chatHistory.push(message);
    // Keep only last 100 messages in memory
    if (chatHistory.length > 100) {
      chatHistory = chatHistory.slice(-100);
    }
    
    // Save to database
    dbHelper.saveChatMessage(message);
    
    io.emit('chat_message', message);
    
    // AI responds for digital couple mode
    if (message.role === 'husband') {
      aiConfig.lastSpeaker = 'husband';
      generateAIResponse('wife').then(response => {
        if (response) {
          const aiMsg = {
            id: Date.now().toString(),
            name: 'syq.',
            role: 'wife',
            content: response,
            time: new Date().toISOString(),
            created_at: new Date().toISOString()
          };
          chatHistory.push(aiMsg);
          // Save to database
          dbHelper.saveChatMessage(aiMsg);
          io.emit('chat_message', aiMsg);
        }
      });
    } else if (message.role === 'wife') {
      aiConfig.lastSpeaker = 'wife';
      generateAIResponse('husband').then(response => {
        if (response) {
          const aiMsg = {
            id: Date.now().toString(),
            name: '老公',
            role: 'husband',
            content: response,
            time: new Date().toISOString(),
            created_at: new Date().toISOString()
          };
          chatHistory.push(aiMsg);
          // Save to database
          dbHelper.saveChatMessage(aiMsg);
          io.emit('chat_message', aiMsg);
        }
      });
    }
  });
  
  // Chat: Typing
  socket.on('chat_typing', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.broadcast.emit('chat_typing', { name: user.name });
    }
  });
  
  socket.on('chat_typingEnd', () => {
    socket.broadcast.emit('chat_typingEnd');
  });
  
  // Chat: Mark messages as read
  socket.on('chat_markRead', () => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;
    
    // Find the other user's socket
    const otherRole = user.role === 'husband' ? 'wife' : 'husband';
    
    connectedUsers.forEach((u, sid) => {
      if (u.role === otherRole) {
        // Notify the other user that this user has read their messages
        io.to(sid).emit('chat_allRead');
      }
    });
    
    // Mark unread messages from the other user as read
    chatHistory.forEach(msg => {
      if (msg.role !== user.role && msg.role !== 'observer') {
        msg.read = true;
        // Update in database
        dbHelper.updateChatMessageRead(msg.id);
      }
    });
  });
  
  // Chat: Update config
  socket.on('chat_updateConfig', (data) => {
    if (data.provider) aiConfig.provider = data.provider;
    if (data.autoSpeak !== undefined) aiConfig.autoSpeak = data.autoSpeak;
    if (data.autoInterval) aiConfig.autoInterval = data.autoInterval;
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    
    if (user) {
      broadcast('userLeft', user);
      broadcast('users', Array.from(connectedUsers.values()));
    }
    
    console.log('User disconnected:', socket.id);
  });
});

// ==================== GPT-SoVITS API PROXY ====================
// GPT-SoVITS API 地址（本地或 ngrok）
const GPT_SOVITS_API = process.env.GPT_SOVITS_API || 'http://127.0.0.1:9880';

// 代理 GPT-SoVITS 模型切换请求
app.get('/api/tts/set_gpt_weights', async (req, res) => {
  try {
    const weightsPath = req.query.weights_path;
    if (!weightsPath) {
      return res.status(400).json({ error: 'Missing weights_path' });
    }
    
    const response = await fetch(`${GPT_SOVITS_API}/set_gpt_weights?weights_path=${encodeURIComponent(weightsPath)}`);
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('[TTS Proxy] set_gpt_weights error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tts/set_sovits_weights', async (req, res) => {
  try {
    const weightsPath = req.query.weights_path;
    if (!weightsPath) {
      return res.status(400).json({ error: 'Missing weights_path' });
    }
    
    const response = await fetch(`${GPT_SOVITS_API}/set_sovits_weights?weights_path=${encodeURIComponent(weightsPath)}`);
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('[TTS Proxy] set_sovits_weights error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 代理 TTS 请求 - 映射到 /tts 端点
app.all('/api/tts', async (req, res) => {
  try {
    const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
    const targetUrl = `${GPT_SOVITS_API}/tts${queryString ? '?' + queryString : ''}`;
    
    console.log('[TTS Proxy]', req.method, targetUrl);
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    
    // 如果是音频文件，直接转发
    const contentType = response.headers.get('content-type');
    if (contentType && (contentType.includes('audio') || contentType.includes('wav') || contentType.includes('octet-stream'))) {
      res.setHeader('Content-Type', contentType);
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } else {
      const data = await response.text();
      res.status(response.status).send(data);
    }
  } catch (error) {
    console.error('[TTS Proxy] error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 保留通配符路由以兼容其他可能的端点
app.all('/api/tts/*', async (req, res) => {
  try {
    const targetPath = req.path.replace('/api/tts', '');
    const targetUrl = `${GPT_SOVITS_API}${targetPath}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;
    
    console.log('[TTS Proxy]', req.method, targetUrl);
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    
    // 如果是音频文件，直接转发
    const contentType = response.headers.get('content-type');
    if (contentType && (contentType.includes('audio') || contentType.includes('wav') || contentType.includes('octet-stream'))) {
      res.setHeader('Content-Type', contentType);
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } else {
      const data = await response.text();
      res.status(response.status).send(data);
    }
  } catch (error) {
    console.error('[TTS Proxy] error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== HTTP ROUTES ====================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    users: connectedUsers.size,
    history: chatHistory.length,
    autoMode: aiConfig.autoMode,
    ttsApi: GPT_SOVITS_API
  });
});

// 悄悄话回复 API
const WHISPER_REPLIES_FILE = path.join(__dirname, 'whisper-replies.json');

// 访客记录 API
const VISITS_FILE = path.join(__dirname, 'visits.json');

// 记录访客
app.post('/api/visit', (req, res) => {
  try {
    let visits = [];
    if (fs.existsSync(VISITS_FILE)) {
      visits = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf-8'));
    }

    const visitTime = new Date();
    const month = String(visitTime.getMonth() + 1).padStart(2, '0');
    const day = String(visitTime.getDate()).padStart(2, '0');
    const hour = String(visitTime.getHours()).padStart(2, '0');
    const minute = String(visitTime.getMinutes()).padStart(2, '0');
    const second = String(visitTime.getSeconds()).padStart(2, '0');
    
    const visit = {
      id: Date.now().toString(),
      time: month + '月' + day + '日 ' + hour + ':' + minute + ':' + second,
      timestamp: Date.now(),
      userAgent: req.headers['user-agent'] ? req.headers['user-agent'].substring(0, 100) : '',
      referer: req.headers['referer'] || ''
    };

    visits.unshift(visit);
    
    // 只保留最近 200 条记录
    if (visits.length > 200) {
      visits = visits.slice(0, 200);
    }
    
    fs.writeFileSync(VISITS_FILE, JSON.stringify(visits, null, 2));

    res.json({ success: true, visit });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 获取访客记录
app.get('/api/visits', (req, res) => {
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, 'utf-8');
      res.json(JSON.parse(data));
    } else {
      res.json([]);
    }
  } catch (e) {
    res.json([]);
  }
});

// wss 访客记录管理页面
app.get('/wss-visits', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>访客记录 - wss</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #11998e, #38ef7d);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 32px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { color: #11998e; margin-bottom: 8px; font-size: 20px; }
    .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
    .stats {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat {
      flex: 1;
      background: linear-gradient(135deg, #11998e, #38ef7d);
      color: white;
      padding: 16px;
      border-radius: 12px;
      text-align: center;
    }
    .stat-num { font-size: 28px; font-weight: bold; }
    .stat-label { font-size: 12px; opacity: 0.9; }
    .visit-list { max-height: 400px; overflow-y: auto; }
    .visit-item {
      background: #f8f8f8;
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .visit-time { color: #11998e; font-weight: 500; font-size: 14px; }
    .visit-agent { color: #888; font-size: 12px; }
    .empty { color: #888; text-align: center; padding: 40px; }
    .back {
      display: inline-block;
      margin-top: 24px;
      color: #11998e;
      text-decoration: none;
      font-size: 14px;
    }
    .refresh {
      float: right;
      background: #11998e;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
    }
    .refresh:hover { opacity: 0.8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 访客记录</h1>
    <p class="subtitle">wss & syq. 的小窝访问情况</p>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-num" id="totalCount">0</div>
        <div class="stat-label">总访问</div>
      </div>
      <div class="stat">
        <div class="stat-num" id="todayCount">0</div>
        <div class="stat-label">今日访问</div>
      </div>
    </div>
    
    <button class="refresh" onclick="loadVisits()">🔄 刷新</button>
    <h3 style="color: #333; margin: 20px 0 12px; font-size: 14px;">最近访问</h3>
    
    <div class="visit-list" id="visitList">
      <div class="empty">加载中...</div>
    </div>
    
    <a href="/" class="back">← 返回主页</a>
  </div>
  
  <script>
    function loadVisits() {
      fetch('/api/visits')
        .then(r => r.json())
        .then(visits => {
          document.getElementById('totalCount').textContent = visits.length;
          
          // 今日访问
          const today = new Date().toDateString();
          const todayVisits = visits.filter(v => new Date(v.timestamp).toDateString() === today);
          document.getElementById('todayCount').textContent = todayVisits.length;
          
          const list = document.getElementById('visitList');
          if (visits.length === 0) {
            list.innerHTML = '<div class="empty">还没有访客记录</div>';
            return;
          }
          
          list.innerHTML = visits.map(v => {
            // 简单判断设备类型
            let device = '🖥️';
            if (v.userAgent.includes('Mobile')) device = '📱';
            else if (v.userAgent.includes('iPad')) device = '📲';
            
            return '<div class="visit-item">' +
              '<div>' +
                '<div class="visit-time">' + device + ' ' + v.time + '</div>' +
                '<div class="visit-agent">' + (v.referer ? '来源: ' + v.referer.replace('http://','').replace('https://','').split('/')[0] : '直接访问') + '</div>' +
              '</div>' +
            '</div>';
          }).join('');
        });
    }
    
    loadVisits();
    // 每30秒自动刷新
    setInterval(loadVisits, 30000);
  </script>
</body>
</html>`;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// 读取回复
app.get('/api/whisper-replies', (req, res) => {
  try {
    if (fs.existsSync(WHISPER_REPLIES_FILE)) {
      const data = fs.readFileSync(WHISPER_REPLIES_FILE, 'utf-8');
      res.json(JSON.parse(data));
    } else {
      res.json([]);
    }
  } catch (e) {
    res.json([]);
  }
});

// 添加回复
app.post('/api/whisper-replies', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: '回复内容不能为空' });
    }

    let replies = [];
    if (fs.existsSync(WHISPER_REPLIES_FILE)) {
      replies = JSON.parse(fs.readFileSync(WHISPER_REPLIES_FILE, 'utf-8'));
    }

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    const reply = {
      id: Date.now().toString(),
      text: text,
      time: month + '月' + day + '日 ' + hour + ':' + minute
    };

    replies.unshift(reply);
    fs.writeFileSync(WHISPER_REPLIES_FILE, JSON.stringify(replies, null, 2));

    res.json({ success: true, reply });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// wss 回复管理页面
app.get('/wss-reply', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>悄悄话回复 - wss</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 32px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { color: #667eea; margin-bottom: 8px; font-size: 20px; }
    .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
    textarea {
      width: 100%;
      padding: 16px;
      border: 2px solid #e8e8e8;
      border-radius: 12px;
      font-size: 15px;
      resize: none;
      min-height: 120px;
      font-family: inherit;
    }
    textarea:focus { outline: none; border-color: #667eea; }
    button {
      width: 100%;
      margin-top: 16px;
      padding: 14px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover { opacity: 0.9; }
    .success {
      margin-top: 16px;
      padding: 12px;
      background: #e8f5e9;
      color: #2e7d32;
      border-radius: 8px;
      text-align: center;
      display: none;
    }
    .reply-list { margin-top: 24px; }
    .reply-item {
      background: #f8f8f8;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .reply-text { color: #333; font-size: 14px; line-height: 1.6; }
    .reply-time { color: #888; font-size: 12px; margin-top: 8px; }
    .back {
      display: inline-block;
      margin-top: 24px;
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💌 悄悄话回复</h1>
    <p class="subtitle">回复 syq. 的悄悄话</p>
    
    <textarea id="replyInput" placeholder="在这里写下你想对她说的话..."></textarea>
    <button onclick="submitReply()">发送回复</button>
    
    <div class="success" id="successMsg">✅ 回复已发送！</div>
    
    <div class="reply-list" id="replyList">
      <h3 style="color: #667eea; margin-bottom: 12px; font-size: 14px;">历史回复</h3>
    </div>
    
    <a href="/" class="back">← 返回主页</a>
  </div>
  
  <script>
    function loadReplies() {
      fetch('/api/whisper-replies')
        .then(r => r.json())
        .then(replies => {
          const list = document.getElementById('replyList');
          if (replies.length === 0) {
            list.innerHTML += '<p style="color: #888; font-size: 13px;">还没有回复</p>';
            return;
          }
          list.innerHTML += replies.map(r => 
            '<div class="reply-item">' +
              '<div class="reply-text">' + r.text + '</div>' +
              '<div class="reply-time">' + r.time + '</div>' +
            '</div>'
          ).join('');
        });
    }
    
    function submitReply() {
      const text = document.getElementById('replyInput').value.trim();
      if (!text) {
        alert('请输入回复内容');
        return;
      }
      
      fetch('/api/whisper-replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      .then(r => r.json())
      .then(data => {
        document.getElementById('replyInput').value = '';
        document.getElementById('successMsg').style.display = 'block';
        setTimeout(() => {
          document.getElementById('successMsg').style.display = 'none';
        }, 3000);
        // 刷新列表
        document.getElementById('replyList').innerHTML = '<h3 style="color: #667eea; margin-bottom: 12px; font-size: 14px;">历史回复</h3>';
        loadReplies();
      });
    }
    
    loadReplies();
  </script>
</body>
</html>`;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// 主页 - emotion-v3.html（情感主页）
app.get('/', (req, res) => {
  const pagePath = path.join(__dirname, 'emotion-v3.html');
  let content = fs.readFileSync(pagePath, 'utf-8');
  
  // 添加版本号防止缓存
  const version = Date.now();
  content = content.replace(/<script>/g, `<script>\nconsole.log('Version: ${version}');`);
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(content);
});

// 真人私密聊天页面 - message.html（wss/syq 双账号）
app.get('/chat', (req, res) => {
  const messagePath = path.join(__dirname, 'message.html');
  let content = fs.readFileSync(messagePath, 'utf-8');
  
  // 注入 session 信息（用于判断是否已登录）
  content = content.replace('__VAPID_PUBLIC_KEY__', vapidKeys.publicKey);
  content = content.replace('__USER_ID__', req.session.userId || '');
  content = content.replace('__USER_NAME__', (req.session.userId && ACCOUNTS[req.session.userId]) ? ACCOUNTS[req.session.userId].name : '');
  
  const version = Date.now();
  content = content.replace(/<script>/g, `<script>\nconsole.log('Chat Version: ${version}');`);
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.send(content);
});

// 数字人对话页面 - index.html（AI 双方对话）
app.get('/digital', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf-8');
  
  const version = Date.now();
  content = content.replace(/<script>/g, `<script>\nconsole.log('Digital Version: ${version}');`);
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.send(content);
});

// ==================== MESSAGE CHAT API ====================

// Serve message page
app.get('/message', (req, res) => {
  const pagePath = path.join(__dirname, 'message.html');
  if (!fs.existsSync(pagePath)) {
    return res.status(404).send('Message page not found');
  }
  let content = fs.readFileSync(pagePath, 'utf-8');
  // Inject VAPID public key
  content = content.replace('__VAPID_PUBLIC_KEY__', vapidKeys.publicKey);
  // Inject session info if logged in
  content = content.replace('__USER_ID__', req.session.userId || '');
  content = content.replace('__USER_NAME__', (req.session.userId && ACCOUNTS[req.session.userId]) ? ACCOUNTS[req.session.userId].name : '');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store');
  res.send(content);
});

// Login
app.post('/api/message/login', (req, res) => {
  const { userId, password } = req.body;
  if (ACCOUNTS[userId] && ACCOUNTS[userId].password === password) {
    req.session.userId = userId;
    req.session.userName = ACCOUNTS[userId].name;
    return res.json({ success: true, userId, name: ACCOUNTS[userId].name });
  }
  res.status(401).json({ success: false, error: '账号或密码错误' });
});

// Logout
app.post('/api/message/logout', (req, res) => {
  const userId = req.session.userId;
  // 清除登录记录，下次登录会重新发送登录消息
  if (userId) {
    loggedInUsers.delete(userId);
  }
  req.session.destroy();
  res.json({ success: true });
});

// Message history (paginated)
app.get('/api/message/history', requireAuth, async (req, res) => {
  const before = req.query.before || null;
  const limit = parseInt(req.query.limit) || 200; // 首次加载 200 条
  const userId = req.session.userId;

  let messages;
  if (before) {
    // 加载更多时也包含用户自己发送的消息
    messages = await sql.all(
      `SELECT * FROM messages WHERE (sender_id = $1 OR receiver_id = $1 OR receiver_id = 'both') AND created_at < $2 ORDER BY created_at DESC LIMIT $3`,
      [userId, before, limit]
    );
  } else {
    messages = await sql.all(
      `SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 OR receiver_id = 'both' ORDER BY created_at ASC LIMIT $2`,
      [userId, limit]
    );
  }
  
  // Transform to API response format
  const transformed = messages.map(m => ({
    id: m.id,
    sender_id: m.sender_id,
    receiver_id: m.receiver_id,
    type: m.type,
    content: m.content,
    duration: m.duration,
    status: m.status,
    created_at: m.created_at
  }));
  
  res.json({ messages: transformed });
});

// Mark messages as read
app.post('/api/message/read', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { messageIds } = req.body;

  if (messageIds && messageIds.length > 0) {
    const now = new Date().toISOString();
    // Use positional params ($1, $2, etc.) for PostgreSQL compatibility
    const ids = messageIds.map((_, i) => `$${i + 3}`).join(',');
    await sql.run(
      `UPDATE messages SET status = 'read', read_at = $1 WHERE id IN (${ids}) AND receiver_id = $2 AND status != 'read'`,
      [now, ...messageIds, userId]
    );

    // Notify sender(s)
    const senders = await sql.all(
      `SELECT DISTINCT sender_id FROM messages WHERE id IN (${ids})`,
      messageIds
    );

    senders.forEach(({ sender_id }) => {
      emitToUser(sender_id, 'chat:message:read', { messageIds, readAt: now });
    });
  } else {
    // Mark all unread as read
    const now = new Date().toISOString();
    await sql.run(
      `UPDATE messages SET status = 'read', read_at = $1 WHERE receiver_id = $2 AND status != 'read'`,
      [now, userId]
    );
  }
  res.json({ success: true });
});

// File upload
app.post('/api/message/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ success: true, url, type: req.file.mimetype });
});

// Push subscription
app.post('/api/message/push/subscribe', requireAuth, async (req, res) => {
  const { endpoint, keys } = req.body.subscription;
  await sql.run(
    `INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth, created_at)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (endpoint) DO UPDATE SET p256dh = $3, auth = $4`,
    [req.session.userId, endpoint, keys.p256dh, keys.auth, new Date().toISOString()]
  );
  res.json({ success: true });
});

app.post('/api/message/push/unsubscribe', requireAuth, async (req, res) => {
  await sql.run('DELETE FROM push_subscriptions WHERE endpoint = $1', [req.body.endpoint]);
  res.json({ success: true });
});

// ==================== MESSAGE CHAT SOCKET.IO ====================
const messageIO = io.of('/message');

// 辅助函数：向用户的所有连接发送消息（支持多标签页）
function emitToUser(userId, event, data) {
  try {
    const sockets = messageOnlineUsers.get(userId) || [];
    sockets.forEach(({ socketId }) => {
      try {
        messageIO.to(socketId).emit(event, data);
      } catch (e) {
        console.error('[emitToUser] Failed to emit to socket:', socketId, e.message);
      }
    });
  } catch (e) {
    console.error('[emitToUser] Error:', e.message);
  }
}

messageIO.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId || !ACCOUNTS[userId]) {
    return next(new Error('Unauthorized'));
  }
  socket.userId = userId;
  next();
});

messageIO.on('connection', async (socket) => {
  const userId = socket.userId;
  const userName = ACCOUNTS[userId]?.name || userId;
  console.log('[Socket] User connected:', userId, '| Total connections:', (messageOnlineUsers.get(userId)?.length || 0) + 1);

  // 检查用户是否之前已在线（用于判断是首次登录还是重连）
  const existingSockets = messageOnlineUsers.get(userId) || [];
  const wasOnline = existingSockets.length > 0;
  
  // 检查用户是否已经发过登录消息（用于防止刷新页面时重复发送）
  const hasLoggedIn = loggedInUsers.has(userId);
  
  // 添加新的 socket 连接（支持多标签页/多设备）
  messageOnlineUsers.set(userId, [...existingSockets, { socketId: socket.id, lastSeen: Date.now() }]);
  messageIO.emit('presence', { userId, status: 'online', connections: messageOnlineUsers.get(userId).length });

  // 只有首次登录才发送登录系统消息（多标签页或刷新都不再发送）
  if (!hasLoggedIn) {
    try {
      const now = new Date();
      const loginTime = now.toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const loginSystemMsg = {
        id: uuidv4(),
        type: 'system',
        content: `${userName} 于 ${loginTime} 登录`,
        created_at: now.toISOString()
      };
      
      console.log('[Socket] Sending system message:', loginSystemMsg);
      
      // 发送给双方
      messageIO.emit('chat:system', loginSystemMsg);

      // 保存系统消息到数据库
      await sql.run(
        `INSERT INTO messages (id, sender_id, receiver_id, type, content, duration, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [loginSystemMsg.id, 'system', 'both', 'system', loginSystemMsg.content, 0, 'delivered', loginSystemMsg.created_at]
      );
      
      // 标记用户已登录，防止刷新页面时重复发送登录消息
      loggedInUsers.set(userId, Date.now());
    } catch (e) {
      console.error('[Socket] Failed to send login message:', e);
    }
  }

  // ---- Chat message ----
  socket.on('chat:message', async (data) => {
    try {
      const { type, content, duration } = data;
      const receiverId = userId === 'wss' ? 'syq' : 'wss';
      const messageId = uuidv4();

      const message = {
        id: messageId,
        sender_id: userId,
        receiver_id: receiverId,
        type: type || 'text',
        content,
        duration: duration || 0,
        status: 'sent',
        created_at: new Date().toISOString()
      };

      // Save to DB
      console.log('[Socket] Saving message to DB:', message);
      try {
        await sql.run(
          `INSERT INTO messages (id, sender_id, receiver_id, type, content, duration, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [message.id, message.sender_id, message.receiver_id, message.type,
           message.content, message.duration, message.status, message.created_at]
        );
        console.log('[Socket] Message saved successfully');
      } catch (err) {
        console.error('[Socket] Failed to save message:', err);
      }

      // Send back to sender (confirmation)
      socket.emit('chat:message:sent', message);

      // Deliver to receiver if online (supports multiple tabs)
      const sockets = messageOnlineUsers.get(receiverId);
      if (sockets && sockets.length > 0) {
        message.status = 'delivered';
        await sql.run(`UPDATE messages SET status = 'delivered' WHERE id = $1`, [message.id]);
        emitToUser(receiverId, 'chat:message:new', message);
        socket.emit('chat:message:status', { id: message.id, status: 'delivered' });
      } else {
        // Send push notification
        sendPushNotification(receiverId, message);
      }
    } catch (e) {
      console.error('[Socket] chat:message error:', e);
    }
  });

  // ---- Read receipts ----
  socket.on('chat:read', async (data) => {
    try {
      const { messageIds } = data;
      if (!messageIds || !messageIds.length) return;

      const now = new Date().toISOString();
      const ids = messageIds.map((_, i) => `$${i + 3}`).join(',');
      await sql.run(
        `UPDATE messages SET status = 'read', read_at = $1 WHERE id IN (${ids}) AND receiver_id = $2 AND status != 'read'`,
        [now, ...messageIds, userId]
      );

      const senders = await sql.all(
        `SELECT DISTINCT sender_id FROM messages WHERE id IN (${ids})`,
        messageIds
      );

      senders.forEach(({ sender_id }) => {
        emitToUser(sender_id, 'chat:message:read', { messageIds, readAt: now });
      });
    } catch (e) {
      console.error('[Socket] chat:read error:', e);
    }
  });

  // ---- Typing indicator ----
  socket.on('chat:typing', () => {
    try {
      const receiverId = userId === 'wss' ? 'syq' : 'wss';
      emitToUser(receiverId, 'chat:typing', { userId });
    } catch (e) {
      console.error('[Socket] chat:typing error:', e);
    }
  });

  // ---- Recall message ----
  socket.on('chat:message:recall', async (data) => {
    try {
      const { messageId } = data;
      
      // Verify the message belongs to this user and is within 2 minutes
      const messages = await sql.all(`SELECT * FROM messages WHERE id = $1`, [messageId]);
      if (messages.length === 0) return;
      
      const message = messages[0];
      if (message.sender_id !== userId) return;
      
      const createdAt = new Date(message.created_at).getTime();
      const now = Date.now();
      const twoMinutes = 2 * 60 * 1000;
      
      if (now - createdAt > twoMinutes) {
        socket.emit('chat:error', { message: '超过2分钟，无法撤回' });
        return;
      }
      
      // Mark as recalled
      await sql.run(`UPDATE messages SET content = '[该消息已撤回]', type = 'recalled' WHERE id = $1`, [messageId]);
      
      // Notify sender
      socket.emit('chat:message:recalled', { messageId });
      
      // Notify receiver if online (supports multiple tabs)
      const receiverId = message.receiver_id;
      emitToUser(receiverId, 'chat:message:recalled', { messageId });
    } catch (e) {
      console.error('[Socket] chat:message:recall error:', e);
    }
  });

  // ---- Delete message ----
  socket.on('chat:message:delete', async (data) => {
    try {
      const { messageId } = data;
      
      // Verify the message belongs to this user or is received by this user
      const messages = await sql.all(`SELECT * FROM messages WHERE id = $1`, [messageId]);
      if (messages.length === 0) return;
      
      const message = messages[0];
      if (message.sender_id !== userId && message.receiver_id !== userId) return;
      
      // Delete the message
      await sql.run(`DELETE FROM messages WHERE id = $1`, [messageId]);
      
      // Notify sender
      socket.emit('chat:message:deleted', { messageId });
      
      // Notify receiver if online and different from sender (supports multiple tabs)
      if (message.sender_id !== userId) {
        emitToUser(message.sender_id, 'chat:message:deleted', { messageId });
      }
    } catch (e) {
      console.error('[Socket] chat:message:delete error:', e);
    }
  });

  // ---- Disconnect ----
  socket.on('disconnect', () => {
    // 只移除断开的 socket，保留其他标签页的连接
    const sockets = messageOnlineUsers.get(userId) || [];
    const remaining = sockets.filter(s => s.socketId !== socket.id);
    
    if (remaining.length > 0) {
      messageOnlineUsers.set(userId, remaining);
      messageIO.emit('presence', { userId, status: 'online', connections: remaining.length });
    } else {
      messageOnlineUsers.delete(userId);
      messageIO.emit('presence', { userId, status: 'offline', lastSeen: Date.now() });
    }
    
    console.log('[Socket] User disconnected:', userId, '| Remaining connections:', remaining.length);
  });
});

// Push notification helper
async function sendPushNotification(receiverId, message) {
  try {
    const subscriptions = await sql.all(
      `SELECT * FROM push_subscriptions WHERE user_id = $1`,
      [receiverId]
    );

    const senderName = ACCOUNTS[message.sender_id]?.name || message.sender_id;
    const payload = JSON.stringify({
      title: senderName,
      body: message.type === 'text' ? message.content :
            message.type === 'image' ? '[图片]' :
            message.type === 'voice' ? '[语音消息]' : '[消息]',
      tag: `chat-${message.id}`,
      data: { url: '/message' }
    });

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth }
        }, payload);
      } catch (err) {
        console.error('[Push] Failed:', err.statusCode);
        if (err.statusCode === 410) {
          await sql.run('DELETE FROM push_subscriptions WHERE endpoint = $1', [sub.endpoint]);
        }
      }
    }
  } catch (e) {
    // 数据库连接错误时跳过推送通知
    console.log('[Push] Skipped push notification due to DB error:', e.code || e.message);
  }
}

// 其他路径 fallback 到主页
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'emotion-v3.html'));
});

// ==================== START ====================
const PORT = process.env.PORT || 3000;

async function start() {
  // Wait for database to be ready (sql.js is async)
  await dbWaitReady;
  // Load chat history from DB
  await dbHelper.loadChatHistory();
  server.listen(PORT, () => {
    console.log(`🚀 Digital Couple Server running on port ${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} to access`);
  });
}

start().catch(e => {
  console.error('Failed to start server:', e);
  process.exit(1);
});
