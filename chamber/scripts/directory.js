const membersEl = document.querySelector('#members');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

async function loadMembers(){
  const res = await fetch('data/members.json');
  const data = await res.json();
  renderMembers(data.members);
}

function renderMembers(members){
  membersEl.innerHTML = '';
  const isGrid = membersEl.classList.contains('grid');

  members.forEach(m => {
    const card = document.createElement('section');
    card.className = 'card';

    if (isGrid) {
      // Grid view: include image
      const img = document.createElement('img');
      img.src = `images/${m.image}`;
      img.alt = `${m.name} logo`;
      img.loading = 'lazy';
      img.width = 120;
      img.height = 120;
      card.appendChild(img);
    }

    const h3 = document.createElement('h3');
    h3.textContent = m.name;
    card.appendChild(h3);

    const addr = document.createElement('p');
    addr.textContent = m.address;
    card.appendChild(addr);

    const phone = document.createElement('p');
    phone.textContent = m.phone;
    card.appendChild(phone);

    const level = document.createElement('p');
    level.textContent = `Membership: ${m.membership}`;
    card.appendChild(level);

    const link = document.createElement('a');
    link.href = m.website;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Website';
    card.appendChild(link);

    membersEl.appendChild(card);
  });
}

function setView(mode){
  if (mode === 'grid') {
    membersEl.classList.remove('list');
    membersEl.classList.add('grid');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  } else {
    membersEl.classList.remove('grid');
    membersEl.classList.add('list');
    gridBtn.setAttribute('aria-pressed', 'false');
    listBtn.setAttribute('aria-pressed', 'true');
  }
  // Re-render to adjust image presence
  loadMembers();
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

// initial load
loadMembers();