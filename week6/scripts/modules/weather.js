
const DEBUG = false;

export async function fetchWeather(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`;
  const res = await fetch(url).catch(()=>null);
  if(!res || !res.ok) throw new Error('weather_fetch_failed');
  return await res.json();
}

function codeToText(code){
  const map = {0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Light drizzle',53:'Drizzle',55:'Dense drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Snow',80:'Rain showers'};
  return map[code] ?? 'Conditions';
}

function renderWeather(data){
  const nowTemp = document.getElementById('weather-temp');
  const nowDesc = document.getElementById('weather-desc');
  const fcWrap  = document.getElementById('weather-forecast');
  if(!nowTemp || !nowDesc || !fcWrap) return;
  nowTemp.textContent = Math.round(data.current_weather.temperature);
  nowDesc.textContent = codeToText(data.current_weather.weathercode);
  const days = data.daily;
  fcWrap.innerHTML = days.time.map((date, i)=>(
    `<div class="weather__day"><strong>${date}</strong><div>${codeToText(days.weathercode[i])}</div><div>${Math.round(days.temperature_2m_min[i])}°C / ${Math.round(days.temperature_2m_max[i])}°C</div></div>`
  )).join('');
}

async function loadWithFallback(lat, lon){
  try{
    const data = await fetchWeather(lat, lon);
    renderWeather(data);
  }catch(e){
    const fallback = { lat: 54.553, lon: -1.304 };
    try{
      const data = await fetchWeather(fallback.lat, fallback.lon);
      renderWeather(data);
    }catch(e2){
      if (DEBUG) console.warn('Weather unavailable');
    }
  }
}

export function initWeather(){
  const weatherSection = document.getElementById('weather');
  if(!weatherSection) return;

  // Add user-gesture geolocation button
  let btn = weatherSection.querySelector('[data-use-location]');
  if(!btn){
    const body = weatherSection.querySelector('.body') || weatherSection;
    const wrap = document.createElement('div');
    wrap.style.marginTop = '.5rem';
    wrap.innerHTML = `<button class="btn small" type="button" data-use-location>Use my location</button>`;
    body.appendChild(wrap);
    btn = wrap.querySelector('[data-use-location]');
  }

  // Always load fallback first (avoids geolocation on HTTP)
  loadWithFallback(54.553, -1.304);

  btn?.addEventListener('click', ()=>{
    if (location.protocol !== 'https:') {
      loadWithFallback(54.553, -1.304);
      return;
    }
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        (pos)=> loadWithFallback(pos.coords.latitude, pos.coords.longitude),
        ()=> loadWithFallback(54.553, -1.304),
        {timeout:4000}
      );
    } else {
      loadWithFallback(54.553, -1.304);
    }
  });
}
