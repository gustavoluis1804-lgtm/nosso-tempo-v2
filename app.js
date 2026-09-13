// Início do contador: 12/09/2026 às 16:43, horário local do aparelho.
const START = new Date(2026, 8, 12, 16, 43, 0, 0);

const el = {
  date: document.getElementById('dateLabel'),
  clock: document.getElementById('clock'),
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

const pad = n => String(n).padStart(2, '0');

function update() {
  const now = new Date();

  el.date.textContent = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  }).format(now);

  el.clock.textContent = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  let diff = now - START;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  el.days.textContent = pad(days);
  el.hours.textContent = pad(hours);
  el.minutes.textContent = pad(minutes);
  el.seconds.textContent = pad(seconds);
}

update();
setInterval(update, 250);

document.getElementById('fullscreenBtn').addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (_) {}
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
