
import { openModal } from './modal.js';

const DEBUG = new URLSearchParams(location.search).get('debug') === '1';
const FALLBACK_IMG = 'assets/images/fallback-zydi.webp';

async function fetchJSON(url){
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('bad_response');
    return await res.json();
  }catch(err){
    if (DEBUG) console.warn('Fetch error:', err);
    return [];
  }
}

export async function loadPrograms(){
  const data = await fetchJSON('data/programs.json');
  return Array.isArray(data) ? data : [];
}

function imgTag(src, title, w, h){
  const onerr = `this.onerror=null;this.src='${FALLBACK_IMG}'`;
  return `<img src="${src}" alt="${title}" width="${w}" height="${h}" loading="lazy" onerror="${onerr}">`;
}

function cardTemplate(p){
  return `
  <article class="card">
    <a class="thumb" href="#" data-id="${p.id}" aria-label="Open details for ${p.title}">
      ${imgTag(p.image, p.title, 800, 500)}
    </a>
    <div class="body">
      <h3>${p.title}</h3>
      <p class="meta"><span>${p.category}</span> • <span>${p.location}</span> • <span>${p.status}</span></p>
      <p>${p.summary || p.description || ''}</p>
      <button class="btn small" data-id="${p.id}" aria-label="More about ${p.title}">Details</button>
    </div>
  </article>`;
}

function mountCards(container, list){
  container.innerHTML = list.map(cardTemplate).join('');
  container.querySelectorAll('[data-id]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = Number(el.getAttribute('data-id'));
      const p = list.find(x=>x.id === id);
      if(!p) return;
      openModal(p.title, `
        <picture>${imgTag(p.image, p.title, 900, 560)}</picture>
        <p><strong>Category:</strong> ${p.category}</p>
        <p><strong>Location:</strong> ${p.location}</p>
        <p><strong>Status:</strong> ${p.status}</p>
        ${p.beneficiaries ? `<p><strong>Beneficiaries:</strong> ${p.beneficiaries}</p>` : ''}
        <p>${p.description || ''}</p>
      `);
    });
  });
}

export function renderFeatured(data){
  const grid = document.getElementById('programGrid');
  if(!grid) return;
  const featured = data.slice(0, 6);
  mountCards(grid, featured);
}

export function renderAll(data){
  const list = document.getElementById('programList');
  if(!list) return;
  mountCards(list, data);
}

export function attachFilters(data, { page }){
  if(page === 'home'){
    const select = document.getElementById('category');
    if(select){
      const cats = Array.from(new Set(data.map(d=>d.category))).sort();
      cats.forEach(c=>{
        const opt = document.createElement('option');
        opt.value = c; opt.textContent = c;
        select.appendChild(opt);
      });
      select.addEventListener('change', ()=>{
        const grid = document.getElementById('programGrid');
        if(!grid) return;
        const val = select.value;
        const filtered = val === 'all' ? data.slice(0,6) : data.filter(d=>d.category===val).slice(0,6);
        mountCards(grid, filtered);
      });
    }
  }
  if(page === 'programs'){
    const search = document.getElementById('search');
    const status = document.getElementById('status');
    const render = ()=>{
      const term = (search?.value || '').toLowerCase();
      const stat = status?.value || 'all';
      const filtered = data.filter(d=>{
        const inText = `${d.title} ${d.category} ${d.location} ${d.summary ?? ''}`.toLowerCase().includes(term);
        const okStatus = stat==='all' || stat===d.status;
        return inText && okStatus;
      });
      const list = document.getElementById('programList');
      if(list) mountCards(list, filtered);
    };
    search?.addEventListener('input', render);
    status?.addEventListener('change', render);
    render();
  }
}
