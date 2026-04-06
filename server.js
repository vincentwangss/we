const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

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

【兴趣爱好】
羽毛球、股票投资、中医方剂学（生脉散、号脉、虾游脉）、哲学（苏格拉底、柏拉图）、历史（高华老师）、美食研究（粥、银耳莲子）、户外旅行（白水寨、武功山、南京）

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

【兴趣爱好】
爬山（以前很喜欢）、电影（《发条橙》，喜欢有震撼感的）、读书（《理想国》）、广州美食（柠檬茶、油柑汁、陶陶居）、医学知识（公共卫生）、性心理学

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

// ==================== AI GENERATION ====================
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
  socket.on('join', (data) => {
    const user = {
      id: socket.id,
      name: data.name || '匿名用户',
      role: data.role || 'observer', // observer, husband, wife
      joinTime: Date.now()
    };
    connectedUsers.set(socket.id, user);
    
    broadcast('userJoined', user);
    broadcast('users', Array.from(connectedUsers.values()));
    
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

// ==================== HTTP ROUTES ====================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    users: connectedUsers.size,
    history: chatHistory.length,
    autoMode: aiConfig.autoMode
  });
});

// 动态读取 index.html，确保总是最新内容
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf-8');
  
  // 添加版本号防止缓存
  const version = Date.now();
  content = content.replace(/<script>/g, `<script>\nconsole.log('Version: ${version}');`);
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(content);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==================== START ====================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Digital Couple Server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to access`);
});
