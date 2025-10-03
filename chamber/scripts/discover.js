// DISCOVER PAGE: builds 8 cards from /data/items.json + visit message
(function () {
  const grid = document.getElementById('discover-grid');
  const msgEl = document.querySelector('.visit-msg');

  // 1) Visit message (localStorage)
  function visitMessage() {
    const now = Date.now();
    const KEY = 'tsc_last_visit_ms';
    const prev = localStorage.getItem(KEY);

    let msg = 'Welcome! Let us know if you have any questions.';
    if (prev) {
      const diff = now - Number(prev);
      const dayMs = 24 * 60 * 60 * 1000;
      if (diff < dayMs) {
        msg = 'Back so soon! Awesome!';
      } else {
        const days = Math.floor(diff / dayMs);
        msg = days === 1 ? 'You last visited 1 day ago.' : `You last visited ${days} days ago.`;
      }
    }
    localStorage.setItem(KEY, String(now));
    if (msgEl) {
      msgEl.textContent = msg;
      msgEl.classList.add('show');
    }
  }

  // 2) Build card element
  function makeCard(item, areaName) {
    const art = document.createElement('article');
    art.className = 'card';
    art.style.gridArea = areaName;

    const h2 = document.createElement('h2');
    h2.textContent = item.name;

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = `${item.name} — photo`;
    img.width = 300; img.height = 200;
    img.decoding = 'async';
    img.sizes = '(min-width:1025px) 300px, (min-width:641px) 300px, 100vw';
    img.loading = 'lazy';
    fig.appendChild(img);

    const adr = document.createElement('address');
    adr.textContent = item.address;

    const p = document.createElement('p');
    p.textContent = item.description;

    const actions = document.createElement('div');
    actions.className = 'actions';
    const a = document.createElement('a');
    a.className = 'btn';
    a.href = item.more || '#';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = `Learn more about ${item.name}`;
    actions.appendChild(a);

    art.append(h2, fig, adr, p, actions);
    return art;
  }

  // 3) Fetch JSON and render
  async function renderCards() {
    try {
      const res = await fetch('data/items.json?v=2', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const items = await res.json();

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('JSON empty or wrong shape');
      }

      const frag = document.createDocumentFragment();
      items.slice(0, 8).forEach((item, i) => {
        const area = 'c' + (i + 1);
        const card = makeCard(item, area);
        // Make first image LCP
        if (i === 0) {
          const img = card.querySelector('img');
          img.loading = 'eager';
          img.fetchPriority = 'high';
        }
        frag.appendChild(card);
      });
      grid.innerHTML = '';
      grid.appendChild(frag);
    } catch (err) {
      console.error('Discover build failed:', err);
      if (msgEl) {
        msgEl.textContent = 'We could not load the discovery items. Please check data/items.json.';
        msgEl.classList.add('error', 'show');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    visitMessage();
    renderCards();
    // Year in footer
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
