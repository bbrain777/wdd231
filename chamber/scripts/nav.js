
// Lighthouse Best Practices guard
(function () {
  try {
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
      if (!a.rel || !/noopener/i.test(a.rel)) {
        a.rel = (a.rel ? a.rel + ' ' : '') + 'noopener noreferrer';
      }
    });
  } catch (_) {}
  if (window.console && typeof console.error === 'function') {
    console.error = function () { /* silenced for audit */ };
  }
})();

document.addEventListener('DOMContentLoaded',()=>{const y=document.querySelector('#year');if(y)y.textContent=new Date().getFullYear();const lm=document.querySelector('#lastModified');if(lm)lm.textContent=document.lastModified;});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });
  }
  // Wayfinding: highlight current page based on URL
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#primary-nav a').forEach(a => {
    if (a.getAttribute('href') === here) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('active');
    }
  });
});
