import {fetchPrograms, fetchTeam} from './data.js';
import {initToolbar, renderPrograms, mountModal} from './ui.js';

(function(){
  const nav=document.querySelector('header nav');const btn=document.querySelector('.mobile-toggle');
  if(btn&&nav){btn.addEventListener('click',()=>{const isOpen=nav.getAttribute('data-open')==='true';nav.setAttribute('data-open',String(!isOpen));btn.setAttribute('aria-expanded',String(!isOpen));});}
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===path)a.setAttribute('aria-current','page');});
  document.addEventListener('DOMContentLoaded',()=>{const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();});
})();

// Home: programs list (15 items)
(async function home(){
  if(!document.getElementById('programRoot')) return;
  mountModal();
  const root = document.getElementById('programRoot');
  initToolbar(root);
  const items = await fetchPrograms();
  renderPrograms(root, items);
})();

// About: team cards
(async function about(){
  if(!document.getElementById('teamList')) return;
  try{
    const team = await fetchTeam();
    const wrap = document.getElementById('teamList');
    wrap.innerHTML = '';
    team.forEach(m=>{
      const initials=m.name.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();
      const card=document.createElement('article'); card.className='card';
      card.innerHTML=`
        <div class="team-row gap-1">
          <figure class="avatar" aria-hidden="true">${initials}</figure>
          <div>
            <h3 class="mt-025">${m.name}</h3>
            <p class="small"><span class="badge">${m.role}</span></p>
            <p>${m.bio}</p>
            <p class="small"><a href="mailto:${m.email}">${m.email}</a></p>
          </div>
        </div>`;
      wrap.appendChild(card);
    });
  }catch(e){ console.error(e); }
})();

// Contact: show URL params on success page
(function contact(){
  const out = document.getElementById('formOut');
  if(!out) return;
  const params = new URLSearchParams(location.search);
  if([...params.keys()].length===0) { out.innerHTML = '<p>No submission found.</p>'; return; }
  const entries = [...params.entries()].map(([k,v])=>`<li><strong>${k}</strong>: ${v}</li>`).join('');
  out.innerHTML = `<ul>${entries}</ul>`;
})();
