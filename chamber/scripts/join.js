// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Hidden timestamp (when the form was loaded)
const ts = document.getElementById('timestamp');
if (ts) {
  const now = new Date();
  // ISO-like (local) without milliseconds: YYYY-MM-DD HH:MM:SS
  const timestamp = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);
  ts.value = timestamp;
}

// Open HTML <dialog> modals for membership benefits
document.querySelectorAll('.open-modal').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.modal;
    const dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
    }
  });
});

// Initial-load animation for membership cards (NOT hover)
// Cards start hidden (opacity 0, translateY(10px)) and animate when they enter the viewport
const cards = document.querySelectorAll('[data-animate]');
function revealCard(el) {
  el.classList.add('is-visible');
}

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealCard(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => io.observe(c));
} else {
  // Fallback: reveal all
  cards.forEach(revealCard);
}

// OPTIONAL: If you want the animation to run immediately on load without scrolling,
// uncomment this block:
// window.addEventListener('load', () => {
//   document.querySelectorAll('[data-animate]').forEach(revealCard);
// });

// Let browser show built-in validation messages; block submit if invalid
const form = document.getElementById('join-form');
if (form) {
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) e.preventDefault();
  });
}
