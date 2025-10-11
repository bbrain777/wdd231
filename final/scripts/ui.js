import {getView,setView,getFaves,toggleFave} from './state.js';

export function initToolbar(root){
  const toolbar = root.querySelector('.toolbar');
  const gridBtn = toolbar.querySelector('[data-view="grid"]');
  const listBtn = toolbar.querySelector('[data-view="list"]');
  const set = (v)=>{
    root.classList.toggle('list', v==='list');
    gridBtn.setAttribute('aria-pressed', String(v==='grid'));
    listBtn.setAttribute('aria-pressed', String(v==='list'));
    setView(v);
  };
  set(getView());
  gridBtn.addEventListener('click', ()=>set('grid'));
  listBtn.addEventListener('click', ()=>set('list'));
}

export function renderPrograms(root, items){
  const wrap = root.querySelector('.cards');
  wrap.innerHTML = '';
  const faves = new Set(getFaves());
  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <figure><img src="${p.image}" width="800" height="500" loading="lazy" decoding="async" alt="${p.title} illustration"></figure>
      <h3>${p.title}</h3>
      <p class="small"><span class="badge">${p.level}</span> • ${p.category} • ${p.location}</p>
      <p>${p.summary}</p>
      <p class="small"><strong>Meets:</strong> ${p.meets} • <strong>Spots:</strong> ${p.spots}</p>
      <div class="view-toggle">
        <button class="btn" data-detail="${p.id}">Details</button>
        <button class="btn" data-fave="${p.id}" aria-pressed="${faves.has(p.id)}">${faves.has(p.id)?'★ Favorite':'☆ Favorite'}</button>
      </div>`;
    wrap.appendChild(card);
  });
  wrap.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    if(btn.dataset.detail){
      const id = btn.dataset.detail;
      const item = items.find(i=>i.id===id);
      openModal(item);
    } else if(btn.dataset.fave){
      const id = btn.dataset.fave;
      const set = new Set(toggleFave(id));
      btn.setAttribute('aria-pressed', String(set.has(id)));
      btn.textContent = set.has(id) ? '★ Favorite' : '☆ Favorite';
    }
  }, {once:true});
}

let modalEl;
export function mountModal(){
  modalEl = document.getElementById('modal');
  modalEl.querySelector('[data-close]').addEventListener('click', closeModal);
  modalEl.addEventListener('click', (e)=>{ if(e.target===modalEl) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
}
export function openModal(item){
  const body = modalEl.querySelector('.modal-body');
  body.innerHTML = `
    <h3>${item.title}</h3>
    <p class="small">${item.category} • ${item.level} • ${item.location}</p>
    <p>${item.summary}</p>
    <p class="small"><strong>Meets:</strong> ${item.meets} • <strong>Spots:</strong> ${item.spots}</p>`;
  modalEl.setAttribute('open','');
  modalEl.querySelector('[data-close]').focus();
}
export function closeModal(){
  if(modalEl) modalEl.removeAttribute('open');
}
