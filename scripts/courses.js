// courses.js — course cards + filtering + credits total
// Paste the official Course List Array provided by the course below.
// Keep the property names: code (e.g., "WDD 231"), title, credits (number), and completed (boolean).
// Example items are included so the page works even before you paste the official list.

const courses = [
  { code: "WDD 130", title: "Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", title: "Web Frontend Development I", credits: 3, completed: false },
  { code: "CSE 110", title: "Introduction to Programming", credits: 2, completed: true },
  { code: "CSE 111", title: "Programming with Functions", credits: 2, completed: false },
  { code: "CSE 210", title: "Programming with Classes", credits: 3, completed: false }
];

const container = document.getElementById('courses');
const creditTotal = document.getElementById('credit-total');
const filterBtns = document.querySelectorAll('.filter');

function render(list){
  container.innerHTML = "";
  let credits = 0;

  list.forEach(course => {
    credits += Number(course.credits) || 0;

    const card = document.createElement('article');
    card.className = 'course' + (course.completed ? ' completed' : '');
    card.innerHTML = `
      <h3>${course.code} — ${course.title}</h3>
      <p class="meta">
        <span class="badge ${course.code.startsWith('WDD') ? 'wdd' : 'cse'}">${course.code.startsWith('WDD') ? 'WDD' : 'CSE'}</span>
        <span class="badge">${course.credits} credits</span>
        <span class="badge" role="status" aria-label="Completion status">${course.completed ? 'Completed' : 'In Progress'}</span>
      </p>
    `;
    container.appendChild(card);
  });

  creditTotal.textContent = credits;
}

function applyFilter(type){
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === type));
  let list = courses;
  if(type === 'wdd') list = courses.filter(c => c.code.startsWith('WDD'));
  if(type === 'cse') list = courses.filter(c => c.code.startsWith('CSE'));
  render(list);
}

// Set up event listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

// Initial render
applyFilter('all');
