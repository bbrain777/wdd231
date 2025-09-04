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
// Normalize a path by removing trailing '/index.html' and ensuring
// directories end with a single trailing slash.
function normalizePath(pathname) {
  let p = pathname.replace(/\/index\.html?$/i, '/');
  // collapse multiple slashes to one
  p = p.replace(/\/{2,}/g, '/');
  // ensure a trailing slash for directories (no file extension)
  if (!/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/')) p += '/';
  return p;
}

// Use location.href as base so relative links like "./" resolve
// inside repo subfolders (e.g. /wdd231/) on GitHub Pages.
const base = location.href;
const currentPath = normalizePath(location.pathname);

const links = nav?.querySelectorAll('a[href]') ?? [];
links.forEach((a) => {
  try {
    const href = a.getAttribute('href');
    // Skip in-page anchors/mailto/tel
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
      return;
    }
    const url = new URL(href, base);
    // Only compare paths when same-origin
    if (url.origin !== location.origin) {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
      return;
    }
    const targetPath = normalizePath(url.pathname);

    if (targetPath === currentPath) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    }
  } catch {
    // If URL parsing fails, make sure link is not marked active
    a.classList.remove('active');
    a.removeAttribute('aria-current');
  }
});
