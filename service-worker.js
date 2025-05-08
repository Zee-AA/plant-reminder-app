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

  // moodNotes.js — for mood notes & whispering popups

function waterPlant(id) {
    const now = new Date();
    const moodNote = prompt("How's your plant feeling? (optional)");
  
    document.getElementById(`last-watered-${id}`).textContent = now.toLocaleString();
    localStorage.setItem(`plant${id}-watered`, now);
  
    if (moodNote && moodNote.trim() !== "") {
      localStorage.setItem(`plant${id}-note`, moodNote);
    } else {
      localStorage.removeItem(`plant${id}-note`);
    }
  
    updateStatus();
  }
  
  function updateStatus() {
    const now = new Date();
  
    for (let i = 1; i <= 3; i++) {
      const watered = new Date(localStorage.getItem(`plant${i}-watered`));
      const hoursSince = (now - watered) / (1000 * 60 * 60);
      const statusEl = document.getElementById(`status-${i}`);
      const lastEl = document.getElementById(`last-watered-${i}`);
      const note = localStorage.getItem(`plant${i}-note`) || "";
  
      statusEl.textContent = (hoursSince < 1) ? "😊" : "🥺";
      lastEl.textContent = !isNaN(watered) ? watered.toLocaleString() : "Not yet";
  
      if (note) {
        statusEl.title = note;
      }
  
      // Whisper if thirsty
      if (hoursSince >= 1) {
        const msg = [
          "I missed you... I'm thirsty 💧",
          "Hydrate me and let's bloom 🌱",
          "Not mad... just parched 🥲",
          "Could use a sip of love 💚"
        ];
        alert(msg[Math.floor(Math.random() * msg.length)] + `\n(Plant ${i})`);
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", updateStatus);
  
  