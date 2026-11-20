// РћС„Р»Р°Р№РЅ-РєСЌС€: РїРѕСЃР»Рµ РїРµСЂРІРѕРіРѕ РѕС‚РєСЂС‹С‚РёСЏ РёРіСЂР° СЂР°Р±РѕС‚Р°РµС‚ Р±РµР· РёРЅС‚РµСЂРЅРµС‚Р°.
// РџСЂРё РѕР±РЅРѕРІР»РµРЅРёРё РёРіСЂС‹ СѓРІРµР»РёС‡СЊС‚Рµ РЅРѕРјРµСЂ РІРµСЂСЃРёРё.
const CACHE = 'symphony-vk-v14';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './voice/index.json', './voice/m_gx.mp3', './voice/m_g0.mp3', ...Array.from({ length: 34 }, (_, i) => './assets/animals/animal-' + String(i + 1).padStart(2, '0') + '.png')];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // СЃРЅР°С‡Р°Р»Р° СЃРµС‚СЊ (С‡С‚РѕР±С‹ РѕР±РЅРѕРІР»РµРЅРёСЏ РїСЂРёС…РѕРґРёР»Рё), Р±РµР· СЃРµС‚Рё вЂ” РєСЌС€
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
});

