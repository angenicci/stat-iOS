const CACHE_NAME = "stats-basket-cache"; // nom fixe
const urlsToCache = [
  "index.html",   // ⚠️ mets "stat.html" si tu n’as pas encore renommé
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
  self.skipWaiting(); // ⚡ force la mise à jour immédiate
});

// Activer et supprimer les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim(); // ⚡ applique la nouvelle version sans attendre
});

// Réponse depuis le cache ou fallback réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
