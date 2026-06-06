// PARKDAY 서비스워커 v1 — 네트워크 우선(콘텐츠 즉시 반영), 오프라인 폴백 캐시
const CACHE = 'parkday-v2';
const ASSETS = ['./', './index.html', './css/app.css', './js/app.js', './js/data.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// 네트워크 우선: 웹에서 수정하면 모든 플랫폼(웹/플레이스토어 TWA/iOS 래퍼)에 즉시 반영
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
