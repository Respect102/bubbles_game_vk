// РћС„Р»Р°Р№РЅ-РєСЌС€: РїРѕСЃР»Рµ РїРµСЂРІРѕРіРѕ РѕС‚РєСЂС‹С‚РёСЏ РёРіСЂР° СЂР°Р±РѕС‚Р°РµС‚ Р±РµР· РёРЅС‚РµСЂРЅРµС‚Р°.
// РџСЂРё РѕР±РЅРѕРІР»РµРЅРёРё РёРіСЂС‹ СѓРІРµР»РёС‡СЊС‚Рµ РЅРѕРјРµСЂ РІРµСЂСЃРёРё.
const CACHE = 'symphony-vk-v17';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './voice/index.json', './voice/m_gx.mp3', './voice/m_g0.mp3', ...Array.from({ length: 34 }, (_, i) => './assets/objects/animal-' + String(i + 1).padStart(2, '0') + '.webp')];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  if (new URL(e.request.url).pathname.includes('/assets/objects/')) {
    e.respondWith(caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request);
      if (cached) return cached;
      const response = await fetch(e.request);
      if (response.ok) await cache.put(e.request, response.clone());
      return response;
    }));
    return;
  }
  // СЃРЅР°С‡Р°Р»Р° СЃРµС‚СЊ (С‡С‚РѕР±С‹ РѕР±РЅРѕРІР»РµРЅРёСЏ РїСЂРёС…РѕРґРёР»Рё), Р±РµР· СЃРµС‚Рё вЂ” РєСЌС€
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    if (e.request.mode === 'navigate') return (await caches.match('./index.html')) || Response.error();
    return Response.error();
  }));
});

