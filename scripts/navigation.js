// Mobile menu toggle
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

menuBtn?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

nav?.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ---- Wayfinding (active link) ----
function normalizePath(p) {
  // Remove trailing /index.html
  return p.replace(/\/index\.html$/i, '/');
}

const links = nav?.querySelectorAll('a') ?? [];
const currentPath = normalizePath(location.pathname);

// Compare normalized absolute paths
links.forEach(a => {
  const url = new URL(a.getAttribute('href'), location.origin);
  const targetPath = normalizePath(url.pathname);
  if (targetPath === currentPath) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  } else {
    a.classList.remove('active');
    a.removeAttribute('aria-current');
  }
});
