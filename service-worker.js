self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('plant-reminder').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/images/plant_1.png',
          '/images/plant_2.png',
          '/images/plant_3.png',
          '/images/icon-192.png',
          '/images/icon-512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  