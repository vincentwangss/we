# 💑 数字情侣 - Digital Couple

基于真实聊天记录训练的 AI 数字人对话系统 + 私密聊天工具。

## 功能

### 🤖 AI 数字人对话
- 👨 **老公数字人 (wss)** - 热情主动、碎碎念、爱叫"宝贝"、喜欢逻辑分析
- 👩 **老婆数字人 (syq.)** - 内敛克制、回复简短、常用 hhh/🤓/🫠
- 🎙️ **语音播报** - 基于 GPT-SoVITS 的真实声音合成
- 👥 **多人互动** - 支持旁观/参与模式，多人可同时加入对话
- 🤖 **AI 话题** - 时事热点、科技商业、哲学艺术、体育等多元话题
- ⚙️ **自动对话** - 可开启自动模式，让 AI 自由聊天

### 💬 私密聊天工具
- 🔐 **账号登录** - wss / syq. 双账号密码登录
- 💾 **消息存储** - SQLite 数据库持久化
- 🔔 **推送通知** - Web Push 离线消息推送
- 📷 **图片发送** - 支持发送图片消息
- 🎤 **语音消息** - 一键录制语音消息
- 😊 **表情选择** - 多分类表情面板
- ✅ **已读回执** - 显示消息送达/已读状态
- 🟢 **在线状态** - 实时显示对方是否在线
- 🔍 **聊天搜索** - 全文搜索历史消息
- 📱 **移动适配** - 支持长按操作、键盘优化

### 🌸 情感主页
- 💭 **每日絮语** - 每日话题、悄悄话
- 💌 **悄悄话树洞** - 双向匿名留言
- 🏆 **成就墙** - 记录在一起的里程碑
- 📊 **访客统计** - 记录访问情况

## 使用方式

### AI 数字人对话 (`/digital`)
1. 打开网页后输入 API Key（支持 DeepSeek / OpenAI / Moonshot）
2. 选择参与模式：旁观 / 以老公身份 / 以 syq. 身份
3. 开启语音播报（需本地启动 GPT-SoVITS API）
4. 开启自动对话，或手动输入话题

### 私密聊天 (`/chat`)
1. 选择登录账号（wss 或 syq.）
2. 输入密码登录
3. 开始聊天

## 本地部署

### 启动 Node.js 服务

```bash
npm install
node server.js
```

访问 http://localhost:3000

### 启动 GPT-SoVITS 语音服务

```bash
cd /path/to/GPT-SoVITS
runtime\python.exe api_v2.py -a 127.0.0.1 -p 9880
```

### 内网穿透（可选）

如需网络访问本地语音服务：

```bash
cd /path/to/ngrok
ngrok.exe http 9880
```

将生成的公网地址配置到 Render 环境变量 `GPT_SOVITS_API`

## 网络部署

### Render 部署

1. Fork 本仓库到 GitHub
2. 在 [Render](https://render.com) 创建 Web Service
3. 连接 GitHub 仓库
4. 配置环境变量：
   - `GPT_SOVITS_API` - GPT-SoVITS 服务地址（本地或 ngrok）
   - `DEEPSEEK_API_KEY` / `OPENAI_API_KEY` / `MOONSHOT_API_KEY`
   - `HUSBAND_PWD` / `WIFE_PWD` - 聊天账号密码

## 技术栈

- **前端**: HTML + CSS + JavaScript
- **后端**: Node.js + Express + Socket.IO
- **AI**: DeepSeek / OpenAI / Moonshot API
- **语音**: GPT-SoVITS 声音克隆
- **数据库**: SQLite
- **推送**: Web Push

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + F` | 打开搜索 |
| `Escape` | 关闭搜索 |
| `Enter` | 发送消息 |
| `Shift + Enter` | 换行 |

## 页面导航

| 路径 | 页面 |
|------|------|
| `/` | 情感主页 |
| `/digital` | AI 数字人对话 |
| `/chat` | 私密聊天（双账号） |
| `/wss-visits` | 访客统计 |
| `/wss-reply` | 悄悄话回复 |

## 账号配置

| 账号 | 默认密码 | 角色 |
|------|----------|------|
| husband | love_syq | wss |
| wife | love_wss | syq. |

---

*基于 6718 条真实微信聊天记录分析构建*
