function waterPlant(plantNum) {
    const now = new Date();
    localStorage.setItem(`plant${plantNum}-watered`, now.toISOString());
    updateStatus();
  }
  
  function updateStatus() {
    const now = new Date();
  
    for (let i = 1; i <= 3; i++) {
      const lastStr = localStorage.getItem(`plant${i}-watered`);
      const last = new Date(lastStr);
      const wateredEl = document.getElementById(`last-watered${i === 1 ? '' : '-' + i}`);
      const statusEl = document.getElementById(`status-${i}`);
  
      if (!isNaN(last)) {
        const hoursSince = (now - last) / (1000 * 60 * 60);
        wateredEl.textContent = last.toLocaleString();
        statusEl.textContent = hoursSince < 1 ? '😊' : '🥺';
      } else {
        wateredEl.textContent = 'Not yet';
        statusEl.textContent = '🥺';
      }
    }
  }
  
  updateStatus();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker Registered!'));
  }
  
  