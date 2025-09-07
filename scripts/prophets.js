const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');
    const meta = document.createElement('small');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    meta.textContent = `Born: ${prophet.birthdate} · Place: ${prophet.birthplace}`;

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(meta);
    cards.appendChild(card);
  });
};

const getProphetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
  } catch (err) {
    console.error('Error fetching prophets:', err);
    cards.textContent = 'Failed to load data.';
  }
};

getProphetData();
