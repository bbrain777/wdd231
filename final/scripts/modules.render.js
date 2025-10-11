
export function renderCards(items, container){
  container.innerHTML = items.map(item => cardTemplate(item)).join('');
  container.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open');
      const data = items.find(i => String(i.id) === id) || items[Number(id)] || items[0];
      const body = document.getElementById('modal-body');
      body.innerHTML = `
        <img src="${data.image}" alt="${data.title} image" loading="lazy">
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Age Range:</strong> ${data.ageRange}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p>${data.description}</p>
        <p><a href="${data.link}" target="_blank" rel="noopener">Learn more</a></p>
      `;
      document.getElementById('modal').showModal();
    });
  });
}
function cardTemplate(d){
  return `
  <article class="card">
    <img src="${d.image}" alt="${d.title} image" width="800" height="450" loading="lazy">
    <h3>${d.title}</h3>
    <div class="meta">
      <span>${d.category}</span>
      <span>${d.location}</span>
      <span>${d.ageRange}</span>
      <span>${d.startDate}</span>
    </div>
    <p>${d.description}</p>
    <button class="button" data-open="${d.id}">Details</button>
  </article>`;
}
