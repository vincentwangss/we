# 💑 数字人对话系统

基于真实聊天记录训练的 AI 数字人对话系统，支持多人实时互动和语音播报。

## 功能

- 👨 **老公数字人** - 热情主动、碎碎念、爱叫"宝贝"、喜欢逻辑分析
- 👩 **syq. 数字人** - 内敛克制、回复简短、常用 hhh/🤓/🫠
- 🎙️ **语音播报** - 基于 GPT-SoVITS 的真实声音合成
- 👥 **多人互动** - 支持旁观/参与模式，多人可同时加入对话
- 🤖 **AI 话题** - 时事热点、科技商业、哲学艺术、体育等多元话题

## 使用方式

1. 打开网页后输入 API Key（支持 DeepSeek / OpenAI / Moonshot）
2. 选择参与模式：旁观 / 以老公身份 / 以 syq. 身份
3. 开启语音播报（需本地启动 GPT-SoVITS API）
4. 开启自动对话，或手动输入话题

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

## 技术栈

- **前端**: HTML + CSS + JavaScript
- **后端**: Node.js + Express + Socket.IO
- **AI**: DeepSeek / OpenAI / Moonshot API
- **语音**: GPT-SoVITS 声音克隆

## 隐私说明

- API Key 仅存储在浏览器 localStorage，不会上传到任何服务器
- 所有对话通过用户自己的 API Key 直接与 AI 服务商通信

---

*基于 6718 条真实微信聊天记录分析构建*
