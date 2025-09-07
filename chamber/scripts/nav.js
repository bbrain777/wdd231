// Mobile nav toggle (if present)
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

menuBtn?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

// Wayfinding: resolve href relative to location.href (GitHub Pages subfolder safe)
function normalizePath(pathname) {
  let p = pathname.replace(/\/index\.html?$/i, '/');
  p = p.replace(/\/{2,}/g, '/');
  if (!/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/')) p += '/';
  return p;
}

const base = location.href;
const currentPath = normalizePath(location.pathname);
const links = nav?.querySelectorAll('a[href]') ?? [];

links.forEach(a => {
  try {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const url = new URL(href, base);
    if (url.origin !== location.origin) return;
    const targetPath = normalizePath(url.pathname);
    if (targetPath === currentPath) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    }
  } catch {}
});
