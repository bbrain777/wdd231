
import { initWayfinding, initHamburger, setYear, initViewPreference } from './modules/ui.js';
import { loadPrograms, renderFeatured, renderAll, attachFilters } from './modules/programs.js';
import { initModal } from './modules/modal.js';
import { initWeather } from './modules/weather.js';

setYear();
initHamburger();
initWayfinding();
initViewPreference();
initModal();

const path = location.pathname;
if (path.endsWith('index.html') || path.endsWith('/')) {
  loadPrograms().then(data => {
    renderFeatured(data);
    attachFilters(data, { page: 'home' });
  });
}
if (path.endsWith('programs.html')) {
  loadPrograms().then(data => {
    renderAll(data);
    attachFilters(data, { page: 'programs' });
  });
}
if (path.endsWith('about.html')) {
  initWeather();
}
