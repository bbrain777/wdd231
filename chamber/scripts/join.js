const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const ts = document.getElementById('timestamp');
if (ts) {
  const now = new Date();
  const timestamp = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().replace('T', ' ').slice(0, 19);
  ts.value = timestamp;
}

document.querySelectorAll('.open-modal').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.modal;
    const dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
  });
});

const cards = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => io.observe(c));
} else {
  cards.forEach(c => c.classList.add('is-visible'));
}

const form = document.getElementById('join-form');
if (form) {
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) e.preventDefault();
  });
}
