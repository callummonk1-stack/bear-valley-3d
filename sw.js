/* map3d service worker (build.py, field.json pwa): the page, three.js and the fonts, once saved for offline
   ("Save for offline" puts them in the cache), are served from the cache - so the map and GPS work with no signal.
   Online, the network answers and the cache is only the fallback. */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  e.respondWith(fetch(r).catch(async () => (await caches.match(r, {ignoreSearch: true}))
    || (r.mode === 'navigate' ? (await caches.match(r.url.split('#')[0].split('?')[0])) : null)
    || Response.error()));
});
