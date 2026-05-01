// Simple test using built-in fetch
async function test() {
  const baseUrl = 'https://digital-couple.onrender.com';
  
  // Step 1: Login
  console.log('=== Step 1: Login ===');
  const loginData = JSON.stringify({ userId: 'wss', password: 'lovesyq' });
  
  const loginResult = await fetch(`${baseUrl}/api/message/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: loginData
  });
  
  console.log('Login status:', loginResult.status);
  const loginResponse = await loginResult.json();
  console.log('Login response:', JSON.stringify(loginResponse, null, 2));
  
  // Check cookies from response headers
  const setCookies = loginResult.headers.get('set-cookie');
  console.log('Set-Cookie header:', setCookies ? setCookies.substring(0, 200) + '...' : 'none');
  
  // Step 2: Get history with the session cookie
  console.log('\n=== Step 2: Get History ===');
  
  const historyResult = await fetch(`${baseUrl}/api/message/history?limit=30`, {
    method: 'GET',
    headers: {
      'Cookie': setCookies || ''
    }
  });
  
  console.log('History status:', historyResult.status);
  
  try {
    const historyData = await historyResult.json();
    console.log('History messages count:', historyData.messages?.length || 0);
    if (historyData.messages && historyData.messages.length > 0) {
      console.log('First few messages:', JSON.stringify(historyData.messages.slice(0, 3), null, 2));
    }
  } catch (e) {
    console.log('History response (raw):', await historyResult.text());
  }
}

test().catch(console.error);
