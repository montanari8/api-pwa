const BaseURL = "https://montanari8.github.io/api-pwa/"
const CACHE_NAME = "retroflix";
const assets = [
    BaseURL,
    `${BaseURL}app.html`,
    `${BaseURL}manifest.json`,
    `${BaseURL}css/materialize.min.css`,
    `${BaseURL}js/materialize.min.js`,
    `${BaseURL}js/instalar.js`,
    `${BaseURL}js/app.js`,
    `${BaseURL}img/icon.png`
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Install');
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(assets);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith( // busca conteudo em cache ou retorna resultado da request
      caches.match(event.request).then(response => {
        if (response) return response; // se encontrar cache igual ao resultado da chamada, retorna o cache
        
        const requestClone = event.request.clone(); // clona o objeto request para ser usado pelo cache e pelo browser
        
        return fetch(requestClone).then((response) => {        
          const responseCache = response.clone(); // clona o objeto response para ser usado pelo browser e pelo cache
          
          caches.open(CACHE_NAME).then((cache) => { // abre o cache e atualiza com o novo conteudo
            cache.put(event.request, responseCache);
          });
  
          return response;
        });
      })
    );
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
/*
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
*/