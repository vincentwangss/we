// ==================== STATE ====================
let userId = USER_ID || '';
let userName = USER_NAME || '';
let partnerId = '';
let partnerName = '';
let partnerAvatar = '';
let socket = null;
let messages = [];
let isLoadingHistory = false;
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];
let recordingTimer = null;
let recordingSeconds = 0;
let currentPlayingAudio = null;
let typingTimeout = null;
let emojiPickerVisible = false;

const ACCOUNTS_INFO = {
  husband: { name: 'wss', avatar: '🧑' },
  wife:    { name: 'syq', avatar: '👩' }
};

const EMOJIS = {
  smileys: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🫣','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐'],
  hearts: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💕','💞','💓','💗','💖','💘','💝','💟','♥️','🫶','🤝','🫂','💋','👄','💍','💐','🌹','🌺','🌸','🎀','🎁'],
  gestures: ['👋','🤚','🖐️','✋','🖖','🫱','🫲','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','💪'],
  objects: ['🎉','🎊','🎈','🎁','🎂','🍰','🧁','🍕','🍔','🍟','🍦','🍩','🍪','☕','🍵','🧋','🍺','🥂','🍷','🏠','✈️','🚗','📱','💻','🎮','🎵','🎶','📸','🎥','⭐','🌟','💫','🔥','💰','📌'],
  nature: ['🌸','🌺','🌻','🌹','🌷','🌼','💐','🌱','🌿','🍀','🍁','🍂','🍃','🌍','🌙','⭐','🌈','☀️','⛅','🌊','🦋','🐱','🐶','🐰','🐻','🐼','🦊','🐨','🐯','🦁','🐮','🐷']
};

// ==================== DOM REFS ====================
const $ = (sel) => document.querySelector(sel);
const loginScreen = $('#loginScreen');
const chatScreen = $('#chatScreen');
const loginBtn = $('#loginBtn');
const pwdInput = $('#pwdInput');
const loginError = $('#loginError');
const accountOptions = document.querySelectorAll('.account-option');
const partnerNameEl = $('#partnerName');
const partnerAvatarEl = $('#partnerAvatar');
const partnerStatusEl = $('#partnerStatus');
const messageList = $('#messageList');
const loadingMore = $('#loadingMore');
const msgInput = $('#msgInput');
const sendBtn = $('#sendBtn');
const voiceBtn = $('#voiceBtn');
const emojiBtn = $('#emojiBtn');
const imgBtn = $('#imgBtn');
const fileInput = $('#fileInput');
const emojiPicker = $('#emojiPicker');
const emojiGrid = $('#emojiGrid');
const voiceOverlay = $('#voiceOverlay');
const voiceTimer = $('#voiceTimer');
const voiceCancelBtn = $('#voiceCancelBtn');
const voiceSendBtn = $('#voiceSendBtn');
const typingIndicator = $('#typingIndicator');
const imagePreview = $('#imagePreview');
const previewImg = $('#previewImg');
const logoutBtn = $('#logoutBtn');
const searchBar = $('#searchBar') || null;
const searchInput = $('#searchInput') || null;
const searchResults = $('#searchResults') || null;
const contextMenu = $('#contextMenu') || null;

// ==================== LOGIN ====================
let selectedAccount = '';

accountOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    accountOptions.forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    selectedAccount = opt.dataset.id;
    pwdInput.focus();
  });
});

loginBtn.addEventListener('click', handleLogin);
pwdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// Toggle password visibility
const togglePwdBtn = $('#togglePwd');
if (togglePwdBtn) {
  togglePwdBtn.addEventListener('click', () => {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      togglePwdBtn.textContent = '🙈';
    } else {
      pwdInput.type = 'password';
      togglePwdBtn.textContent = '👁';
    }
  });
}

async function handleLogin() {
  if (!selectedAccount) {
    showError('请选择账号');
    return;
  }
  const password = pwdInput.value.trim();
  if (!password) {
    showError('请输入密码');
    return;
  }

  loginBtn.disabled = true;
  try {
    const res = await fetch('/api/message/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedAccount, password })
    });
    const data = await res.json();
    if (data.success) {
      userId = data.userId;
      userName = data.name;
      initChat();
    } else {
      showError(data.error || '登录失败');
    }
  } catch (err) {
    showError('网络错误');
  }
  loginBtn.disabled = false;
}

function showError(msg) {
  loginError.textContent = msg;
  loginError.style.display = 'block';
  setTimeout(() => { loginError.style.display = 'none'; }, 3000);
}

// ==================== CHAT INIT ====================
function initChat() {
  // Determine partner based on userId (wss <-> syq)
  partnerId = userId === 'wss' ? 'syq' : 'wss';
  partnerName = partnerId === 'wss' ? 'wss' : 'syq';
  partnerAvatar = partnerId === 'wss' ? '🧑' : '👩';

  partnerNameEl.textContent = partnerName;
  partnerAvatarEl.textContent = partnerAvatar;

  loginScreen.style.display = 'none';
  chatScreen.style.display = 'flex';

  connectSocket();
  loadHistory();
  setupPushNotifications();
}

function connectSocket() {
  socket = io('/message', {
    auth: { userId },
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    console.log('[Chat] Connected');
  });

  socket.on('connect_error', (err) => {
    console.error('[Chat] Connection error:', err.message);
  });

  socket.on('chat:message:sent', (msg) => {
    // Update the optimistic message with server data
    const el = document.querySelector(`[data-msg-id="${msg.id}"]`);
    if (el) {
      // Already rendered optimistically
    }
    updateMessageStatus(msg.id, msg.status);
  });

  socket.on('chat:message:new', (msg) => {
    messages.push(msg);
    renderMessage(msg);
    scrollToBottom();
    // playNotificationSound(); // Disabled
    // Auto mark as read if page visible
    if (document.visibilityState === 'visible') {
      markAsRead([msg.id]);
    }
  });

  socket.on('chat:message:status', (data) => {
    updateMessageStatus(data.id, data.status);
  });

  socket.on('chat:message:read', (data) => {
    data.messageIds.forEach(id => {
      updateMessageStatus(id, 'read');
    });
  });

  // Handle system message (login notification)
  socket.on('chat:system', (msg) => {
    console.log('[Chat] Received system message:', msg);
    renderSystemMessage(msg);
    scrollToBottom();
  });

  // Handle recalled message
  socket.on('chat:message:recalled', (data) => {
    const msgEl = document.querySelector(`[data-msg-id="${data.messageId}"]`);
    if (msgEl) {
      msgEl.querySelector('.msg-content')?.remove();
      const bubble = msgEl.querySelector('.msg-bubble');
      if (bubble) {
        bubble.classList.add('recalled');
        bubble.innerHTML = '<span class="recalled-text">该消息已撤回</span>';
      }
    }
    showToast('消息已撤回');
  });

  // Handle deleted message
  socket.on('chat:message:deleted', (data) => {
    const msgEl = document.querySelector(`[data-msg-id="${data.messageId}"]`);
    if (msgEl) {
      msgEl.remove();
    }
    showToast('消息已删除');
  });

  socket.on('chat:typing', () => {
    typingIndicator.style.display = 'block';
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      typingIndicator.style.display = 'none';
    }, 3000);
  });

  socket.on('presence', (data) => {
    if (data.userId === partnerId) {
      if (data.status === 'online') {
        partnerStatusEl.textContent = '在线';
        partnerStatusEl.className = 'partner-status online';
      } else {
        partnerStatusEl.textContent = '离线';
        partnerStatusEl.className = 'partner-status';
      }
    }
  });

  socket.on('unread', (data) => {
    if (data.count > 0) {
      markAsRead(messages.filter(m => m.receiver_id === userId && m.status !== 'read').map(m => m.id));
    }
  });

  socket.on('disconnect', () => {
    console.log('[Chat] Disconnected');
  });
}

// ==================== HISTORY ====================
async function loadHistory(before) {
  if (isLoadingHistory) return;
  isLoadingHistory = true;
  loadingMore.style.display = 'block';

  try {
    let url = '/api/message/history?limit=30';
    if (before) url += `&before=${encodeURIComponent(before)}`;

    const res = await fetch(url);
    console.log('[Chat] History response status:', res.status);
    if (!res.ok) {
      console.error('[Chat] Load history failed:', res.status);
      loadingMore.style.display = 'none';
      isLoadingHistory = false;
      return;
    }
    const data = await res.json();
    console.log('[Chat] History messages count:', data.messages?.length || 0);
    const historyMessages = data.messages || [];

    if (historyMessages.length === 0) {
      loadingMore.style.display = 'none';
      isLoadingHistory = false;
      return;
    }

    const oldScrollHeight = messageList.scrollHeight;

    // Prepend messages (oldest first from API)
    historyMessages.forEach(msg => {
      if (!messages.find(m => m.id === msg.id)) {
        messages.push(msg);
      }
    });

    // Sort and render
    messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    renderAllMessages();

    if (before) {
      // Restore scroll position
      messageList.scrollTop = messageList.scrollHeight - oldScrollHeight;
    } else {
      scrollToBottom();
    }
  } catch (err) {
    console.error('[Chat] Load history failed:', err);
  }

  loadingMore.style.display = 'none';
  isLoadingHistory = false;
}

// Infinite scroll - load more on scroll to top
messageList.addEventListener('scroll', () => {
  if (messageList.scrollTop < 50 && !isLoadingHistory && messages.length > 0) {
    const oldest = messages[0];
    if (oldest) loadHistory(oldest.created_at);
  }
});

// ==================== RENDERING ====================
function renderAllMessages() {
  // Clear except loading indicator
  const children = Array.from(messageList.children);
  children.forEach(c => { if (c !== loadingMore) c.remove(); });

  let lastDate = '';
  messages.forEach(msg => {
    const msgDate = formatDate(msg.created_at);
    if (msgDate !== lastDate) {
      insertDateSeparator(msgDate);
      lastDate = msgDate;
    }
    renderMessage(msg, false);
  });
}

function renderMessage(msg, animate = true) {
  // Handle system messages
  if (msg.type === 'system') {
    renderSystemMessage(msg);
    return;
  }

  const row = document.createElement('div');
  row.className = `msg-row ${msg.sender_id === userId ? 'me' : 'partner'}`;
  row.dataset.msgId = msg.id;

  const avatar = document.createElement('span');
  avatar.className = 'msg-avatar';
  avatar.textContent = msg.sender_id === userId ? (userId === 'wss' ? '🧑' : '👩') : partnerAvatar;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  // Render content based on type
  if (msg.type === 'image') {
    renderImageBubble(bubble, msg);
  } else if (msg.type === 'voice') {
    renderVoiceBubble(bubble, msg);
  } else {
    renderTextBubble(bubble, msg);
  }

  // Meta (time only - no status icons)
  const meta = document.createElement('div');
  meta.className = 'bubble-meta';
  meta.innerHTML = `<span>${formatTime(msg.created_at)}</span>`;

  bubble.appendChild(meta);
  row.appendChild(avatar);
  row.appendChild(bubble);

  if (animate) {
    row.style.opacity = '0';
    row.style.transform = 'translateY(10px)';
  }

  messageList.appendChild(row);

  if (animate) {
    requestAnimationFrame(() => {
      row.style.transition = 'all 0.2s ease-out';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    });
  }
}

function renderTextBubble(bubble, msg) {
  const text = document.createElement('div');
  text.className = 'bubble-text';
  text.textContent = msg.content;
  bubble.appendChild(text);
}

function renderImageBubble(bubble, msg) {
  const imgWrap = document.createElement('div');
  imgWrap.className = 'bubble-image';
  const img = document.createElement('img');
  img.src = msg.content;
  img.loading = 'lazy';
  img.addEventListener('click', () => {
    previewImg.src = msg.content;
    imagePreview.style.display = 'flex';
  });
  imgWrap.appendChild(img);
  bubble.appendChild(imgWrap);
}

function renderVoiceBubble(bubble, msg) {
  const voice = document.createElement('div');
  voice.className = 'bubble-voice';
  voice.innerHTML = `
    <span class="voice-play-icon">▶</span>
    <div class="voice-wave"><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <span class="voice-duration">${msg.duration || 0}"</span>
  `;
  voice.addEventListener('click', () => playVoice(msg.content, voice));
  bubble.appendChild(voice);
}

function insertDateSeparator(dateStr) {
  const sep = document.createElement('div');
  sep.className = 'date-separator';
  sep.innerHTML = `<span>${dateStr}</span>`;
  messageList.appendChild(sep);
}

function renderSystemMessage(msg) {
  console.log('[Chat] renderSystemMessage called:', msg);
  const row = document.createElement('div');
  row.className = 'system-message';
  row.innerHTML = `<span>${msg.content}</span>`;
  messageList.appendChild(row);
  console.log('[Chat] System message added to DOM');
}

function updateMessageStatus(msgId, status) {
  const row = document.querySelector(`[data-msg-id="${msgId}"]`);
  if (!row) return;
  const statusEl = row.querySelector('.msg-status');
  if (statusEl) {
    statusEl.className = `msg-status ${status}`;
    statusEl.textContent = getStatusIcon(status);
  }
  // Update in messages array
  const msg = messages.find(m => m.id === msgId);
  if (msg) msg.status = status;
}

function getStatusIcon(status) {
  // 已读打钩功能已移除，始终返回空
  return '';
}

// ==================== SEND MESSAGES ====================
// Text input auto-resize & show/hide send button
msgInput.addEventListener('input', () => {
  msgInput.style.height = 'auto';
  msgInput.style.height = Math.min(msgInput.scrollHeight, 100) + 'px';
  sendBtn.style.display = msgInput.value.trim() ? 'block' : 'none';
  voiceBtn.style.display = msgInput.value.trim() ? 'none' : 'block';

  // Emit typing
  if (socket) {
    socket.emit('chat:typing');
  }
});

msgInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendTextMessage();
  }
});

sendBtn.addEventListener('click', sendTextMessage);

function sendTextMessage() {
  const text = msgInput.value.trim();
  if (!text || !socket) return;

  const msg = {
    id: 'temp-' + Date.now(),
    sender_id: userId,
    receiver_id: partnerId,
    type: 'text',
    content: text,
    duration: 0,
    status: 'sent',
    created_at: new Date().toISOString()
  };

  messages.push(msg);
  renderMessage(msg);
  scrollToBottom();

  socket.emit('chat:message', { type: 'text', content: text });

  msgInput.value = '';
  msgInput.style.height = 'auto';
  sendBtn.style.display = 'none';
  voiceBtn.style.display = 'block';
}

// ==================== IMAGE ====================
imgBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/message/upload', { method: 'POST', credentials: 'include', body: formData });
    const data = await res.json();

    if (data.success) {
      const msg = {
        id: 'temp-' + Date.now(),
        sender_id: userId,
        receiver_id: partnerId,
        type: 'image',
        content: data.url,
        duration: 0,
        status: 'sent',
        created_at: new Date().toISOString()
      };
      messages.push(msg);
      renderMessage(msg);
      scrollToBottom();

      socket.emit('chat:message', { type: 'image', content: data.url });
    }
  } catch (err) {
    console.error('[Chat] Upload failed:', err);
  }
  fileInput.value = '';
});

// ==================== VOICE ====================
voiceBtn.addEventListener('click', startRecording);

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    audioChunks = [];
    recordingSeconds = 0;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.start();
    isRecording = true;
    voiceOverlay.style.display = 'flex';

    recordingTimer = setInterval(() => {
      recordingSeconds++;
      const m = Math.floor(recordingSeconds / 60);
      const s = recordingSeconds % 60;
      voiceTimer.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    }, 1000);
  } catch (err) {
    console.error('[Chat] Mic access denied:', err);
  }
}

voiceCancelBtn.addEventListener('click', cancelRecording);
voiceSendBtn.addEventListener('click', stopAndSendRecording);

function cancelRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stream.getTracks().forEach(t => t.stop());
    mediaRecorder.stop();
  }
  clearInterval(recordingTimer);
  isRecording = false;
  voiceOverlay.style.display = 'none';
}

async function stopAndSendRecording() {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

  return new Promise((resolve) => {
    mediaRecorder.onstop = async () => {
      clearInterval(recordingTimer);
      // Stop mic tracks
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      isRecording = false;
      voiceOverlay.style.display = 'none';

      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      if (blob.size < 1000) { resolve(); return; } // Too short

      try {
        const formData = new FormData();
        formData.append('file', blob, `voice_${Date.now()}.webm`);
        const res = await fetch('/api/message/upload', { method: 'POST', credentials: 'include', body: formData });
        const data = await res.json();

        if (data.success) {
          const msg = {
            id: 'temp-' + Date.now(),
            sender_id: userId,
            receiver_id: partnerId,
            type: 'voice',
            content: data.url,
            duration: recordingSeconds,
            status: 'sent',
            created_at: new Date().toISOString()
          };
          messages.push(msg);
          renderMessage(msg);
          scrollToBottom();

          socket.emit('chat:message', { type: 'voice', content: data.url, duration: recordingSeconds });
        }
      } catch (err) {
        console.error('[Chat] Voice upload failed:', err);
      }
      resolve();
    };
    mediaRecorder.stop();
  });
}

function playVoice(url, voiceEl) {
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    document.querySelectorAll('.voice-wave.playing').forEach(w => w.classList.remove('playing'));
  }

  const audio = new Audio(url);
  currentPlayingAudio = audio;
  const wave = voiceEl.querySelector('.voice-wave');
  wave.classList.add('playing');
  const icon = voiceEl.querySelector('.voice-play-icon');
  icon.textContent = '⏸';

  audio.play();
  audio.onended = () => {
    wave.classList.remove('playing');
    icon.textContent = '▶';
    currentPlayingAudio = null;
  };
}

// ==================== EMOJI ====================
emojiBtn.addEventListener('click', toggleEmojiPicker);

function toggleEmojiPicker() {
  emojiPickerVisible = !emojiPickerVisible;
  emojiPicker.style.display = emojiPickerVisible ? 'flex' : 'none';
  if (emojiPickerVisible && emojiGrid.children.length === 0) {
    renderEmojis('smileys');
  }
  msgInput.focus();
}

document.querySelectorAll('.emoji-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.emoji-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderEmojis(tab.dataset.category);
  });
});

function renderEmojis(category) {
  emojiGrid.innerHTML = '';
  (EMOJIS[category] || []).forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'emoji-item';
    btn.textContent = emoji;
    btn.addEventListener('click', () => insertEmoji(emoji));
    emojiGrid.appendChild(btn);
  });
}

function insertEmoji(emoji) {
  const start = msgInput.selectionStart;
  const end = msgInput.selectionEnd;
  const text = msgInput.value;
  msgInput.value = text.substring(0, start) + emoji + text.substring(end);
  msgInput.selectionStart = msgInput.selectionEnd = start + emoji.length;
  msgInput.focus();
  msgInput.dispatchEvent(new Event('input'));
}

// Close emoji picker on outside click
document.addEventListener('click', (e) => {
  if (emojiPickerVisible && !emojiPicker.contains(e.target) && e.target !== emojiBtn) {
    emojiPickerVisible = false;
    emojiPicker.style.display = 'none';
  }
});

// ==================== IMAGE PREVIEW ====================
imagePreview.addEventListener('click', () => {
  imagePreview.style.display = 'none';
});

// ==================== READ RECEIPTS ====================
async function markAsRead(messageIds) {
  if (!messageIds || !messageIds.length) return;
  try {
    await fetch('/api/message/read', {
      method: 'POST',
      credentials: 'include',  // 重要：发送 session cookie
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageIds })
    });
  } catch (err) {
    console.error('[Chat] Mark read failed:', err);
  }
}

// Mark all as read when page becomes visible
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const unread = messages.filter(m => m.receiver_id === userId && m.status !== 'read');
    if (unread.length > 0) {
      markAsRead(unread.map(m => m.id));
    }
  }
});

// ==================== PUSH NOTIFICATIONS ====================
async function setupPushNotifications() {
  if (!('Notification' in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  if (!('serviceWorker' in navigator) || !VAPID_PUBLIC_KEY) return;

  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    await fetch('/api/message/push/subscribe', {
      method: 'POST',
      credentials: 'include',  // 重要：发送 session cookie
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription: subscription.toJSON() })
    });
  } catch (err) {
    console.error('[Chat] Push setup failed:', err);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// ==================== NOTIFICATION SOUND ====================
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = 'sine';
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

// ==================== LOGOUT ====================
logoutBtn.addEventListener('click', async () => {
  if (confirm('确定要退出登录吗？')) {
    if (socket) socket.disconnect();
    await fetch('/api/message/logout', { method: 'POST', credentials: 'include' });
    location.reload();
  }
});

// ==================== SEARCH ====================
let searchTimeout = null;
let currentSearchResults = [];

function toggleSearch() {
  if (!searchBar) return;
  const isActive = searchBar.classList.contains('active');
  if (isActive) {
    searchBar.classList.remove('active');
    searchResults?.classList.remove('active');
    if (searchInput) searchInput.value = '';
    currentSearchResults = [];
  } else {
    searchBar.classList.add('active');
    if (searchInput) {
      searchInput.focus();
    }
  }
}

function performSearch(query) {
  if (!query || !query.trim()) {
    if (searchResults) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
    }
    return;
  }

  const lowerQuery = query.toLowerCase();
  currentSearchResults = messages.filter(msg => {
    if (msg.type !== 'text') return false;
    return msg.content.toLowerCase().includes(lowerQuery);
  });

  if (!searchResults) return;

  searchResults.classList.add('active');

  if (currentSearchResults.length === 0) {
    searchResults.innerHTML = '<div class="search-no-results">没有找到相关消息</div>';
    return;
  }

  searchResults.innerHTML = currentSearchResults.map((msg, index) => `
    <div class="search-result-item" data-index="${index}">
      <div class="search-result-text">${highlightText(msg.content, query)}</div>
      <div class="search-result-time">${formatDate(msg.created_at)} ${formatTime(msg.created_at)}</div>
    </div>
  `).join('');

  // Add click handlers
  searchResults.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      const msg = currentSearchResults[index];
      scrollToMessage(msg.id);
      searchBar?.classList.remove('active');
      searchResults?.classList.remove('active');
    });
  });
}

function highlightText(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scrollToMessage(msgId) {
  const msgEl = document.querySelector(`[data-msg-id="${msgId}"]`);
  if (msgEl) {
    msgEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    msgEl.style.animation = 'pulse 0.5s ease-in-out 3';
    setTimeout(() => {
      msgEl.style.animation = '';
    }, 1500);
  }
}

// Search input handler
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleSearch();
    }
  });
}

// ==================== CONTEXT MENU ====================
let contextMenuTarget = null;

function showContextMenu(e, msg) {
  e.preventDefault();
  contextMenuTarget = msg;

  if (!contextMenu) return;

  // Show/hide recall and delete buttons based on message ownership
  const recallBtn = document.getElementById('recallBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const isMyMessage = msg.sender === userId;
  
  if (recallBtn) recallBtn.style.display = isMyMessage ? 'flex' : 'none';
  if (deleteBtn) deleteBtn.style.display = 'flex'; // Both can delete

  contextMenu.classList.add('active');
  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.left = `${e.clientX}px`;

  // Adjust position if off-screen
  const rect = contextMenu.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    contextMenu.style.left = `${window.innerWidth - rect.width - 10}px`;
  }
  if (rect.bottom > window.innerHeight) {
    contextMenu.style.top = `${window.innerHeight - rect.height - 10}px`;
  }
}

function hideContextMenu() {
  if (contextMenu) {
    contextMenu.classList.remove('active');
  }
  contextMenuTarget = null;
}

function copyMessageText() {
  if (contextMenuTarget && contextMenuTarget.type === 'text') {
    navigator.clipboard.writeText(contextMenuTarget.content).catch(() => {});
    // Show a brief toast
    showToast('已复制到剪贴板');
  }
  hideContextMenu();
}

function forwardMessage() {
  if (contextMenuTarget && contextMenuTarget.type === 'text') {
    const text = contextMenuTarget.content;
    const shareData = { text: text };
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板，可转发给好友');
      }).catch(() => {});
    }
  }
  hideContextMenu();
}

// Recall message (sender can recall within 2 minutes)
function recallMessage() {
  if (!contextMenuTarget) return;
  
  const msg = contextMenuTarget;
  const now = Date.now();
  const createdAt = new Date(msg.created_at).getTime();
  const twoMinutes = 2 * 60 * 1000;
  
  if (now - createdAt > twoMinutes) {
    showToast('超过2分钟，无法撤回');
    hideContextMenu();
    return;
  }
  
  socket.emit('chat:message:recall', { messageId: msg.id });
  hideContextMenu();
}

// Delete message (for both sender and receiver)
function deleteMessage() {
  if (!contextMenuTarget) return;
  
  const msg = contextMenuTarget;
  socket.emit('chat:message:delete', { messageId: msg.id });
  hideContextMenu();
}

// Toast notification
function showToast(message, duration = 2000) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.2s';
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

// Close context menu on click outside
document.addEventListener('click', (e) => {
  if (contextMenu && !contextMenu.contains(e.target)) {
    hideContextMenu();
  }
});

// Add long press for mobile
let longPressTimer = null;
let longPressTarget = null;

messageList?.addEventListener('touchstart', (e) => {
  const target = e.target.closest('.msg-bubble');
  if (target) {
    longPressTarget = target.closest('.msg-row');
    longPressTimer = setTimeout(() => {
      if (longPressTarget) {
        const msgId = longPressTarget.dataset.msgId;
        const msg = messages.find(m => m.id === msgId);
        if (msg) {
          showContextMenu({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, preventDefault: () => {} }, msg);
        }
      }
    }, 500);
  }
}, { passive: true });

messageList?.addEventListener('touchend', () => {
  clearTimeout(longPressTimer);
  longPressTarget = null;
});

messageList?.addEventListener('touchmove', () => {
  clearTimeout(longPressTimer);
  longPressTarget = null;
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + F for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    toggleSearch();
  }
  // Escape to close search
  if (e.key === 'Escape') {
    if (searchBar?.classList.contains('active')) {
      toggleSearch();
    }
    hideContextMenu();
  }
});

// ==================== VISIBILITY CHANGE ====================
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Refresh presence when tab becomes visible
    if (socket && socket.connected) {
      socket.emit('chat:typing'); // Just to check connection
    }
    // Mark unread as read
    const unread = messages.filter(m => m.receiver_id === userId && m.status !== 'read');
    if (unread.length > 0) {
      markAsRead(unread.map(m => m.id));
    }
  }
});

// ==================== RECONNECT HANDLING ====================
if (socket) {
  socket.on('reconnect', () => {
    console.log('[Chat] Reconnected');
    // Reload messages on reconnect
    messages = [];
    loadHistory();
  });

  socket.on('reconnect_attempts', (attempts) => {
    console.log('[Chat] Reconnect attempt:', attempts);
  });
}

// ==================== HELPERS ====================
function scrollToBottom() {
  requestAnimationFrame(() => {
    messageList.scrollTop = messageList.scrollHeight;
  });
}

function formatTime(isoStr) {
  const d = new Date(isoStr);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function formatDate(isoStr) {
  const d = new Date(isoStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = (today - msgDate) / (1000 * 60 * 60 * 24);

  if (diff === 0) return '今天';
  if (diff === 1) return '昨天';
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

// ==================== AUTO-INIT ====================
// If already logged in (session exists), init chat directly
if (userId && userName) {
  initChat();
}
