// 测试 Render 部署
const https = require('https');

const BASE_URL = 'https://digital-couple.onrender.com';

function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    const req = https.request(reqOptions, (res) => {
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
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) req.write(options.body);
    req.end();
  });
}

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
  console.log('🧪 Render 部署测试');
  console.log('='.repeat(60));
  
  // 1. 健康检查
  await test('健康检查', async () => {
    const res = await httpsRequest(`${BASE_URL}/api/health`);
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    return { detail: 'Render 服务器运行正常' };
  });
  
  // 2. 登录并检查 Cookie
  await test('wss 登录 (检查 Cookie)', async () => {
    const res = await httpsRequest(`${BASE_URL}/api/message/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'wss', password: 'lovesyq' })
    });
    
    if (res.status !== 200) throw new Error(`${res.status}: ${res.data}`);
    
    const data = JSON.parse(res.data);
    if (!data.success) throw new Error(data.error);
    
    // 检查 Cookie
    if (!res.cookies || res.cookies.length === 0) throw new Error('未收到 Cookie');
    
    const cookie = res.cookies[0];
    console.log(`    -> Cookie: ${cookie.substring(0, 80)}...`);
    
    const checks = [];
    if (cookie.includes('HttpOnly')) checks.push('HttpOnly ✓');
    if (cookie.includes('SameSite')) checks.push('SameSite ✓');
    if (cookie.includes('Secure')) checks.push('Secure ✓');
    if (!cookie.includes('Secure')) checks.push('无 Secure ⚠️');
    
    return { detail: checks.join(', ') };
  });
  
  // 3. 登录后获取消息历史
  let cookieStr = '';
  await test('wss 登录后获取消息历史', async () => {
    // 先登录
    const loginRes = await httpsRequest(`${BASE_URL}/api/message/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'wss', password: 'lovesyq' })
    });
    
    if (loginRes.status !== 200) throw new Error('登录失败');
    
    // 提取 Cookie
    cookieStr = loginRes.cookies.map(c => c.split(';')[0]).join('; ');
    
    // 用 Cookie 获取消息历史
    const res = await httpsRequest(`${BASE_URL}/api/message/history`, {
      headers: { 'Cookie': cookieStr }
    });
    
    if (res.status === 401) throw new Error('401 - Cookie 未生效');
    if (res.status !== 200) throw new Error(`状态码: ${res.status}`);
    
    const data = JSON.parse(res.data);
    return { detail: `获取到 ${data.messages?.length || 0} 条消息` };
  });
  
  // 4. syq 登录
  await test('syq 登录', async () => {
    const res = await httpsRequest(`${BASE_URL}/api/message/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'syq', password: 'lovewss' })
    });
    
    if (res.status !== 200) throw new Error(`${res.status}: ${res.data}`);
    const data = JSON.parse(res.data);
    return { detail: `登录成功: ${data.name}` };
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('🧪 测试完成');
  console.log('='.repeat(60));
}

runTests().catch(console.error);
