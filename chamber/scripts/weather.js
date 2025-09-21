// Weather module — uses OpenWeatherMap (free 5-day/3-hour API)
// Location: Stockton-on-Tees, UK
const OWM_KEY = "ac3830367ae34b9051ad23aa15b9c8e1";
const LAT = 54.569; 
const LON = -1.318;

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function byDay(list) {
  // group 3-hour entries by date (YYYY-MM-DD)
  const out = {};
  for (const item of list) {
    const d = new Date(item.dt * 1000);
    const key = d.toISOString().slice(0,10);
    (out[key] ||= []).push(item);
  }
  return out;
}

function pickNoon(entries) {
  // pick the item closest to 12:00
  return entries.reduce((best, cur) => {
    const h = new Date(cur.dt * 1000).getHours();
    const score = Math.abs(12 - h);
    return score < (best.score ?? 99) ? {score, item: cur} : best;
  }, {score: 99, item: entries[0]}).item;
}

function renderForecast(days) {
  const wrap = document.getElementById('weather-forecast');
  if (!wrap) return;
  wrap.innerHTML = '';
  days.forEach(d => {
    const card = document.createElement('div');
    card.className = 'forecast-day';
    const date = new Date(d.dt * 1000);
    const label = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const icon = d.weather?.[0]?.icon ?? '01d';
    const desc = d.weather?.[0]?.description ?? '';
    const temp = Math.round(d.main?.temp ?? 0);
    card.innerHTML = `
      <div class="forecast-date">${label}</div>
      <img alt="${desc}" src="https://openweathermap.org/img/wn/${icon}@2x.png" width="50" height="50" loading="lazy">
      <div class="forecast-temp">${temp}°C</div>
      <div class="forecast-desc">${desc}</div>
    `;
    wrap.appendChild(card);
  });
}

(async () => {
  try {
    // current
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${OWM_KEY}`;
    const cur = await fetchJSON(currentURL);
    document.getElementById('weather-temp').textContent = Math.round(cur.main.temp);
    document.getElementById('weather-desc').textContent = cur.weather?.[0]?.description ?? '';

    // forecast (next 3 days from tomorrow)
    const fcURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${OWM_KEY}`;
    const fc = await fetchJSON(fcURL);
    const grouped = byDay(fc.list);
    const keys = Object.keys(grouped).sort();
    const today = new Date().toISOString().slice(0,10);
    const futureKeys = keys.filter(k => k > today).slice(0,3);
    const picks = futureKeys.map(k => pickNoon(grouped[k]));
    renderForecast(picks);
  } catch (err) {
    console.error('Weather error', err);
    const note = document.getElementById('weather-note');
    if (note) note.hidden = false;
  }
})();
