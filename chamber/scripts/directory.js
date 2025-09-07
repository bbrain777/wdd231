const container = document.querySelector('#directory');
const btnGrid = document.querySelector('#btn-grid');
const btnList = document.querySelector('#btn-list');
const lastMod = document.querySelector('#lastModified');
const yearSpan = document.querySelector('#currentyear');

const setLayout = (mode) => {
  if (mode === 'list') {
    container.classList.add('list');
    btnList.classList.add('active'); btnGrid.classList.remove('active');
  } else {
    container.classList.remove('list');
    btnGrid.classList.add('active'); btnList.classList.remove('active');
  }
  localStorage.setItem('dirLayout', mode);
};

btnGrid?.addEventListener('click', () => setLayout('grid'));
btnList?.addEventListener('click', () => setLayout('list'));

const loadMembers = async () => {
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();
    members.forEach(m => {
      const card = document.createElement('article');
      card.className = 'card';
      const img = document.createElement('img');
      img.src = `images/${m.image}`;
      img.alt = `${m.name} logo`;
      img.loading = 'lazy';
      img.width = 240; img.height = 160;

      const h3 = document.createElement('h3'); h3.textContent = m.name;
      const pAddr = document.createElement('p'); pAddr.textContent = m.address;
      const pPhone = document.createElement('p'); pPhone.textContent = m.phone;
      const a = document.createElement('a'); a.href = m.url; a.textContent = 'Visit website'; a.target = '_blank'; a.rel = 'noopener';

      const badge = document.createElement('span'); badge.className = 'badge';
      badge.textContent = m.membership === 3 ? 'Gold' : m.membership === 2 ? 'Silver' : 'Member';

      card.append(img, h3, badge, pAddr, pPhone, a);
      container.appendChild(card);
    });
  } catch (e) {
    container.textContent = 'Failed to load members.';
    console.error(e);
  }
};

// Footer dates
yearSpan && (yearSpan.textContent = new Date().getFullYear());
lastMod && (lastMod.textContent = `Last Modified: ${document.lastModified}`);

// Restore layout preference
setLayout(localStorage.getItem('dirLayout') || 'grid');

loadMembers();
