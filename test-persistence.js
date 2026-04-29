const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function test() {
  // 1. 登录
  const loginData = JSON.stringify({ userId: 'husband', password: 'lovesyq' });
  const login = await makeRequest({
    hostname: 'localhost', port: 3000, path: '/api/message/login',
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) }
  }, loginData);
  console.log('登录结果:', login.body);
  
  // 获取 cookie
  const setCookie = login.headers['set-cookie'];
  if (!setCookie) {
    console.log('未获取到 cookie');
    return;
  }
  const cookie = setCookie[0].split(';')[0];
  console.log('Cookie:', cookie.substring(0, 60));
  
  // 2. 获取历史消息
  const history = await makeRequest({
    hostname: 'localhost', port: 3000, path: '/api/message/history',
    headers: { Cookie: cookie }
  });
  
  try {
    const msgs = JSON.parse(history.body);
    console.log('\n历史消息数量:', msgs.messages.length);
    console.log('服务器重启后成功恢复的消息:');
    msgs.messages.forEach((m) => {
      console.log('  [' + m.role + ']', m.content);
    });
  } catch (e) {
    console.log('解析失败:', history.body);
  }
}

test();
