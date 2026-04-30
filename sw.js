// Service Worker for push notifications & offline support
const CACHE_NAME = 'couple-chat-v2';
const STATIC_ASSETS = [
  '/',
  '/chat',
  '/digital',
  '/message.css',
  '/message.js'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Ignore cache errors during install
      });
    })
  );
  self.skipWaiting();
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Socket.IO and API requests
  if (url.pathname.includes('/socket.io') || url.pathname.startsWith('/api/')) return;

  // Skip chrome-extension and other non-http
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline fallback
        return caches.match(request);
      })
  );
});

// Push notification
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '新消息';
  const options = {
    body: data.body || '',
    icon: '/data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💕</text></svg>',
    badge: '/data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💕</text></svg>',
    tag: data.tag || 'chat-message',
    data: data.data || {},
    vibrate: [200, 100, 200],
    requireInteraction: false,
    actions: [
      { action: 'open', title: '查看消息' },
      { action: 'dismiss', title: '忽略' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || '/message';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if available
      for (const client of clientList) {
        if (client.url.includes('/message') && 'focus' in client) {
          client.focus();
          client.postMessage({ type: 'notification-clicked' });
          return;
        }
      }
      // Open new window
      return clients.openWindow(url);
    })
  );
});

// Message sync for background updates
self.addEventListener('message', function(event) {
  if (event.data?.type === 'skip-waiting') {
    self.skipWaiting();
  }
});
