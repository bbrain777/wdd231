// navigation.js — responsive hamburger + wayfinding
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

menuBtn?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when clicking a link (small view)
nav?.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if(link && nav.classList.contains('open')){
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// Wayfinding: mark current page link active
const links = nav?.querySelectorAll('a') ?? [];
const here = location.pathname.replace(/\/index\.html$/,'/');
links.forEach(a => {
  if(a.getAttribute('href') === './' || a.pathname === here){
    a.classList.add('active');
  }
});
