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
  
  function setupMoodNotes() {
    for (let i = 1; i <= 3; i++) {
      const textarea = document.querySelectorAll('.mood-note')[i - 1];
      const whisper = document.getElementById(`whisper-${i}`);
      const key = `plant${i}-mood`;
  
      // Load saved mood
      const savedMood = localStorage.getItem(key);
      if (savedMood) {
        whisper.textContent = `“${savedMood}”`;
        whisper.style.display = 'block';
      }
  
      // Save mood on blur (when user clicks away)
      textarea.addEventListener('blur', () => {
        const mood = textarea.value.trim();
        if (mood) {
          localStorage.setItem(key, mood);
          whisper.textContent = `“${mood}”`;
          whisper.style.display = 'block';
          textarea.value = '';
        }
      });
    }
  }
  
  // Run on load
  updateStatus();
  setupMoodNotes();
  