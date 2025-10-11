
(function(){
  const nav=document.querySelector('header nav');const btn=document.querySelector('.mobile-toggle');
  if(btn&&nav){btn.addEventListener('click',()=>{const isOpen=nav.getAttribute('data-open')==='true';nav.setAttribute('data-open',String(!isOpen));btn.setAttribute('aria-expanded',String(!isOpen));});}
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===path)a.setAttribute('aria-current','page');});
  if(path==='programs.html') loadPrograms();
  if(path==='about.html') loadTeam();
})();

async function loadPrograms(){
  const res=await fetch('data/programs.json'); const list=await res.json();
  const wrap=document.getElementById('programList'); wrap.innerHTML='';
  list.forEach(p=>{
    const card=document.createElement('article'); card.className='card';
    card.innerHTML=`
      <figure><img src="${p.img}" width="800" height="500" loading="lazy" decoding="async" alt="${p.title}"></figure>
      <h3>${p.title}</h3>
      <p class="small"><span class="badge">${p.status}</span> • ${p.meets} • ${p.location}</p>
      <p>${p.summary}</p>
      <p class="small"><strong>Outcomes:</strong> ${p.outcomes.join(', ')}</p>`;
    wrap.appendChild(card);
  });
}

async function loadTeam(){
  const res=await fetch('data/team.json'); const list=await res.json();
  const wrap=document.getElementById('teamList'); wrap.innerHTML='';
  list.forEach(m=>{
    const initials=m.name.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();
    const card=document.createElement('article'); card.className='card';
    card.innerHTML=`
      <div style="display:flex;gap:1rem;align-items:flex-start">
        <figure aria-hidden="true" style="width:56px;height:56px;border-radius:999px;display:grid;place-items:center;background:#eff6ff;border:1px solid #e2e8f0;font-weight:800">${initials}</figure>
        <div>
          <h3 style="margin:.25rem 0">${m.name}</h3>
          <p class="small"><span class="badge">${m.role}</span></p>
          <p>${m.bio}</p>
          <p class="small"><a href="mailto:${m.email}">${m.email}</a></p>
        </div>
      </div>`;
    wrap.appendChild(card);
  });
}
