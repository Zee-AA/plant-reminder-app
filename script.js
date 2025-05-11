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
    const plantImg = document.getElementById(`plant-img-${i}`);

    if (!isNaN(last)) {
      const hoursSince = (now - last) / (1000 * 60 * 60);
      wateredEl.textContent = last.toLocaleString();

      if (hoursSince < 2) {
        plantImg.src = `images/plant_${i}_happy.png`;
      } else {
        plantImg.src = `images/plant_${i}_sad.png`;
        sendReminder(i); // Send notification if 2+ hours passed
      }
    } else {
      wateredEl.textContent = 'Not yet';
      plantImg.src = `images/plant_${i}_sad.png`;
    }
  }
}

function sendReminder(plantNum) {
  if (Notification.permission === "granted") {
    new Notification("🌿 Plant Reminder", {
      body: `Plant ${plantNum} is thirsty! 💧`,
      icon: `images/plant_${plantNum}_sad.png`
    });
  }
}

// Ask for notification permission when the page loads
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Check status every 10 minutes (600,000 ms)
setInterval(updateStatus, 600000); // optional — you can change the interval

updateStatus();
