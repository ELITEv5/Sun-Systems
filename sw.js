const CACHE = 'sun-systems-v2';
const ASSETS = [
  '/Sun-Systems/',
  '/Sun-Systems/index.html',
  '/Sun-Systems/SunPLS_token.png',
  '/Sun-Systems/sundailogo.png',
  '/Sun-Systems/icon-192.png',
  '/Sun-Systems/icon-512.png',
  '/Sun-Systems/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(url => c.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
