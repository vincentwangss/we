// 测试脚本 - 全场景测试
const http = require('http');
const https = require('https');
const { URL } = require('url');

// 测试配置
const BASE_URL = 'http://localhost:3000';
const ACCOUNTS = [
  { userId: 'wss', password: 'lovesyq', name: '老公' },
  { userId: 'syq', password: 'lovewss', name: '老婆' }
];

// 简单的 HTTP 请求封装
function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const lib = isHttps ? https : http;
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    const req = lib.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data,
          cookies: res.headers['set-cookie']
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Cookie jar
let cookieJar = [];

async function test(name, fn) {
  process.stdout.write(`\n[TEST] ${name}... `);
  try {
    const result = await fn();
    console.log('✅ PASS');
    if (result && result.detail) console.log(`    -> ${result.detail}`);
    return result;
  } catch (err) {
    console.log(`❌ FAIL: ${err.message}`);
    return null;
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('🧪 全场景测试开始');
  console.log('='.repeat(60));
  
  // 1. 健康检查
  await test('健康检查', async () => {
    const res = await httpRequest(`${BASE_URL}/api/health`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    const data = JSON.parse(res.data);
    return { detail: `服务器运行中，用户数: ${data.users}` };
  });
  
  // 2. 主页访问
  await test('主页访问', async () => {
    const res = await httpRequest(BASE_URL);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: '主页返回 200' };
  });
  
  // 3. 登录页面访问
  await test('消息页面访问', async () => {
    const res = await httpRequest(`${BASE_URL}/message`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: '消息页面返回 200' };
  });
  
  // 4. 测试不同账号登录
  for (const account of ACCOUNTS) {
    await test(`${account.name} 登录 (${account.userId})`, async () => {
      const res = await httpRequest(`${BASE_URL}/api/message/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: account.userId, password: account.password })
      });
      
      if (res.status !== 200) {
        throw new Error(`状态码: ${res.status}, ${res.data}`);
      }
      
      const data = JSON.parse(res.data);
      if (!data.success) throw new Error(data.error);
      
      // 保存 cookie
      if (res.cookies) {
        cookieJar = res.cookies;
      }
      
      return { detail: `登录成功: ${data.name}` };
    });
    
    // 5. 登录后获取消息历史
    await test(`${account.name} 获取消息历史`, async () => {
      const cookieStr = cookieJar.map(c => c.split(';')[0]).join('; ');
      const res = await httpRequest(`${BASE_URL}/api/message/history`, {
        headers: { 'Cookie': cookieStr }
      });
      
      if (res.status === 401) throw new Error('未授权 - Cookie 可能未正确设置');
      if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
      
      const data = JSON.parse(res.data);
      return { detail: `获取到 ${data.messages?.length || 0} 条消息` };
    });
    
    // 6. 测试错误密码
    await test(`${account.name} 错误密码登录`, async () => {
      const res = await httpRequest(`${BASE_URL}/api/message/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: account.userId, password: 'wrongpassword' })
      });
      
      if (res.status !== 401) throw new Error(`应该返回 401，实际: ${res.status}`);
      return { detail: '正确拒绝错误密码' };
    });
    
    // 7. 未登录访问受保护接口
    await test(`${account.name} 未登录访问消息历史 (应返回401)`, async () => {
      const res = await httpRequest(`${BASE_URL}/api/message/history`);
      
      if (res.status !== 401) throw new Error(`应该返回 401，实际: ${res.status}`);
      return { detail: '正确返回 401' };
    });
  }
  
  // 8. Cookie 属性检查
  await test('Cookie 属性检查', async () => {
    const res = await httpRequest(`${BASE_URL}/api/message/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'wss', password: 'lovesyq' })
    });
    
    if (!res.cookies || res.cookies.length === 0) {
      throw new Error('未收到 Set-Cookie');
    }
    
    const cookie = res.cookies[0];
    const checks = [];
    
    if (cookie.includes('HttpOnly')) checks.push('HttpOnly ✓');
    if (cookie.includes('SameSite')) checks.push('SameSite ✓');
    if (cookie.includes('Secure')) checks.push('Secure ⚠️ (本地不应有)');
    if (!cookie.includes('Secure')) checks.push('无 Secure ✓ (本地正确)');
    
    return { detail: checks.join(', ') };
  });
  
  // 9. 访客记录 API
  await test('访客记录 API', async () => {
    const res = await httpRequest(`${BASE_URL}/api/visits`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: '访客记录 API 正常' };
  });
  
  // 10. 悄悄话回复 API
  await test('悄悄话回复 API - 获取', async () => {
    const res = await httpRequest(`${BASE_URL}/api/whisper-replies`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: '悄悄话 API 正常' };
  });
  
  // 11. Socket.IO 连接测试 (通过 HTTP)
  await test('Socket.IO 握手测试', async () => {
    const res = await httpRequest(`${BASE_URL}/socket.io/?EIO=4&transport=polling`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: 'Socket.IO 可访问' };
  });
  
  // 12. 数字人页面
  await test('数字人页面访问', async () => {
    const res = await httpRequest(`${BASE_URL}/digital`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: '数字人页面正常' };
  });
  
  // 13. 404 处理
  await test('404 处理', async () => {
    const res = await httpRequest(`${BASE_URL}/nonexistent-page-xyz`);
    if (res.status !== 200) throw new Error(`应返回 200 (fallback), 实际: ${res.status}`);
    return { detail: '正确 fallback 到主页' };
  });
  
  // 14. CORS 测试
  await test('CORS 头检查', async () => {
    const res = await httpRequest(`${BASE_URL}/api/health`);
    if (!res.headers['access-control-allow-origin']) throw new Error('缺少 CORS 头');
    return { detail: `CORS: ${res.headers['access-control-allow-origin']}` };
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('🧪 测试完成');
  console.log('='.repeat(60));
}

runTests().catch(console.error);
