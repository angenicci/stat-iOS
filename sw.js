const CACHE_NAME = "stats-basket-cache-v1";
const urlsToCache = [
  "stat.html",
  "manifest.json",
  "sw.js",
  "icon-192.png",
  "icon-512.png"
];

// Installer et mettre en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Réponse depuis le cache ou fallback réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
