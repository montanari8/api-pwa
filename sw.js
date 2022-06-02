const BaseURL = "https://montanari8.github.io/api-pwa/"
const CACHE_NAME = "Retroflix";
const assets = [
    BaseURL,
    `${BaseURL}/app.html`,
    `${BaseURL}/manifest.json`,
    `${BaseURL}/css/materialize.min.css`,
    `${BaseURL}/js/materialize.min.js`,
    `${BaseURL}js/instalar.js`,
    `${BaseURL}/js/app.js`
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(assets);
      })
    );
  });

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});