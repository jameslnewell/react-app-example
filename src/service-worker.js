const cacheName = 'example-react-app';
const filesToCache = serviceWorkerOption.assets;

filesToCache.push('/')
filesToCache.push('/contact')
filesToCache.push('/vendor.js')

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell', filesToCache);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        console.log('key', key)
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // return self.skipWaiting();
  // return self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('FETCH event', event);
  //return cached version if it exists, otherwise fetch it from the network
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('fetch cache', response)
      return response || fetch(event.request);
    })
  );

});
