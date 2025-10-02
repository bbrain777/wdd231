// Toggle nav (mobile)
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = navList.style.display === 'block';
    navList.style.display = open ? 'none' : 'block';
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
}

// Render cards from JSON
async function renderCards() {
  try {
    const res = await fetch('data/items.json');
    const items = await res.json();
    const gallery = document.querySelector('.gallery');

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="images/${item.photo}" alt="${item.name} — ${item.description}" width="300" height="200" loading="lazy">
        </figure>
        <div class="pad">
          <address>${item.address}</address>
          <p>${item.description}</p>
          <a class="btn" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Learn more about ${item.name}">Learn more</a>
        </div>
      `;
      gallery.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to render cards:', err);
  }
}
renderCards();

// localStorage message
(function lastVisit() {
  const el = document.getElementById('visitMessage');
  const key = 'chamber_last_visit';
  const now = Date.now();
  const last = Number(localStorage.getItem(key));
  if (!last) {
    el.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const days = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    el.textContent = days < 1 ? 'Back so soon! Awesome!' : `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
  }
  localStorage.setItem(key, String(now));
})();