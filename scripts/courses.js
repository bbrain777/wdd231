// courses.js — animated filter cards + dynamic list + credits
const courses = [
  { code: "WDD 130", title: "Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", title: "Web Frontend Development I", credits: 3, completed: false },
  { code: "CSE 110", title: "Introduction to Programming", credits: 2, completed: true },
  { code: "CSE 111", title: "Programming with Functions", credits: 2, completed: true }, // per user: COMPLETED
  { code: "CSE 210", title: "Programming with Classes", credits: 3, completed: false }
];

const container = document.getElementById('courses');
const creditTotal = document.getElementById('credit-total');
const filterCards = document.querySelectorAll('.card-btn');

function render(list){
  container.innerHTML = "";
  let credits = 0;

  list.forEach(course => {
    credits += Number(course.credits) || 0;

    const card = document.createElement('article');
    card.className = 'course' + (course.completed ? ' completed' : '');
    const track = course.code.startsWith('WDD') ? 'wdd' : 'cse';
    card.innerHTML = `
      <h3>${course.code} — ${course.title}</h3>
      <p class="meta">
        <span class="badge ${track}">${track.toUpperCase()}</span>
        <span class="badge">${course.credits} credits</span>
        <span class="badge ${course.completed ? 'completed' : 'inprogress'}">${course.completed ? 'Completed' : 'In Progress'}</span>
      </p>
    `;
    container.appendChild(card);
  });

  creditTotal.textContent = credits;
}

function applyFilter(type){
  // Update pressed states
  filterCards.forEach(btn => {
    const isActive = btn.dataset.filter === type;
    btn.setAttribute('aria-pressed', String(isActive));
  });

  let list = courses.slice();
  if(type === 'wdd') list = list.filter(c => c.code.startsWith('WDD'));
  if(type === 'cse') list = list.filter(c => c.code.startsWith('CSE'));
  if(type === 'completed') list = list.filter(c => c.completed);
  if(type === 'inprogress') list = list.filter(c => !c.completed);
  render(list);
}

// Set up events
filterCards.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));

// initial
applyFilter('all');
