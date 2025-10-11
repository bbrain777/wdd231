
import { fetchPrograms } from './modules.data.js';
import { renderCards } from './modules.render.js';

const container = document.getElementById('programs-container');
const categoryFilter = document.getElementById('category-filter');
const search = document.getElementById('search');
const viewToggle = document.getElementById('view-toggle');

let programs = [];
let filtered = [];

function uniqueCategories(items){
  return ['All', ...Array.from(new Set(items.map(i => i.category)))];
}
function applyFilters(){
  const cat = (categoryFilter.value || 'All').toLowerCase();
  const term = (search.value || '').toLowerCase();
  filtered = programs.filter(p => {
    const catOk = cat === 'all' || p.category.toLowerCase() === cat;
    const termOk = [p.title, p.description, p.location].join(' ').toLowerCase().includes(term);
    return catOk && termOk;
  });
  renderCards(filtered, container);
}

(async () => {
  programs = await fetchPrograms();
  programs = programs.map((p, idx) => ({ id: idx, ...p }));
  uniqueCategories(programs).forEach(c => {
    const opt = document.createElement('option'); opt.value = c.toLowerCase(); opt.textContent = c;
    categoryFilter.appendChild(opt);
  });
  applyFilters();
})();

categoryFilter?.addEventListener('change', applyFilters);
search?.addEventListener('input', applyFilters);
viewToggle?.addEventListener('change', () => {
  container.classList.toggle('list', viewToggle.checked);
});
