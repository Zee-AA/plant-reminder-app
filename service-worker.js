const CACHE_NAME = 'plant-reminder-v2'; // increment version number

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/plant_1.png',
  '/images/plant_2.png',
  '/images/plant_3.png',
  '/images/plant_1_sad.png',
  '/images/plant_2_sad.png',
  '/images/plant_3_sad.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // activate new service worker immediately
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control immediately
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
