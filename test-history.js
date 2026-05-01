const fetch = require('node-fetch');

async function test() {
  const baseUrl = 'https://digital-couple.onrender.com';
  
  // Step 1: Login
  console.log('=== Step 1: Login ===');
  const loginRes = await fetch(`${baseUrl}/api/message/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({userId: 'wss', password: 'lovesyq'})
  });
  const loginData = await loginRes.json();
  console.log('Login:', JSON.stringify(loginData));
  
  // Get set-cookie header
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('Set-Cookie:', setCookie ? setCookie.substring(0, 150) : 'NONE');
  
  // Step 2: Get history
  console.log('\n=== Step 2: Get History ===');
  const histRes = await fetch(`${baseUrl}/api/message/history?limit=30`, {
    headers: {'Cookie': setCookie || ''}
  });
  const histData = await histRes.json();
  console.log('History status:', histRes.status);
  console.log('Messages count:', histData.messages?.length || 0);
  
  if (histData.messages && histData.messages.length > 0) {
    console.log('\nLatest 5 messages:');
    const msgs = histData.messages.slice(-5);
    msgs.forEach((m, i) => {
      console.log(`${i+1}. [${m.sender_id} -> ${m.receiver_id}] ${m.content} (${m.created_at})`);
    });
  }
  
  // Try with higher limit
  console.log('\n=== With limit=500 ===');
  const histRes2 = await fetch(`${baseUrl}/api/message/history?limit=500`, {
    headers: {'Cookie': setCookie || ''}
  });
  const histData2 = await histRes2.json();
  console.log('Messages count:', histData2.messages?.length || 0);
  if (histData2.messages && histData2.messages.length > 0) {
    console.log('\nLatest 5 messages:');
    const msgs = histData2.messages.slice(-5);
    msgs.forEach((m, i) => {
      console.log(`${i+1}. [${m.sender_id} -> ${m.receiver_id}] ${m.content} (${m.created_at})`);
    });
  }
}

test().catch(console.error);
