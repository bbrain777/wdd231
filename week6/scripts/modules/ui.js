
export function setYear(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}
export function initHamburger(){
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });
}
export function initWayfinding(){
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const links = nav.querySelectorAll('a');
  const here = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a=>{
    const dest = a.getAttribute('href');
    if (dest === here) a.setAttribute('aria-current','page');
  });
}
export function initViewPreference(){
  const key = 'zydi:view';
  const grid = document.getElementById('programGrid') || document.getElementById('programList');
  const toggle = document.getElementById('toggleView');
  if (!grid) return;
  const saved = localStorage.getItem(key) || 'grid';
  grid.classList.toggle('list', saved==='list');
  grid.classList.toggle('grid', saved!=='list');
  if (toggle){
    toggle.setAttribute('aria-pressed', String(saved==='list'));
    toggle.addEventListener('click', ()=>{
      const listMode = grid.classList.toggle('list');
      grid.classList.toggle('grid', !listMode);
      localStorage.setItem(key, listMode ? 'list' : 'grid');
      toggle.setAttribute('aria-pressed', String(listMode));
    });
  }
}
