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

    const reply = {
      id: Date.now().toString(),
      text: text,
      time: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '月').replace(',', '日 ')
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

// 聊天页面 - index.html
app.get('/chat', (req, res) => {
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

// 其他路径 fallback 到主页
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'emotion-v3.html'));
});

// ==================== START ====================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Digital Couple Server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to access`);
});
