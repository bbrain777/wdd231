
const membersEl=document.querySelector('#members');
const gridBtn=document.querySelector('#grid');
const listBtn=document.querySelector('#list');
async function loadMembers(){
  const res=await fetch('data/members.json');
  const data=await res.json();
  renderMembers(data.members);
}
function renderMembers(members){
  membersEl.innerHTML='';
  members.forEach(m=>{
    const card=document.createElement('section');
    card.className='card';
    card.innerHTML=`<h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank" rel="noopener">Website</a>`;
    membersEl.appendChild(card);
  });
}
gridBtn.addEventListener('click',()=>{membersEl.classList.remove('list');membersEl.classList.add('grid');});
listBtn.addEventListener('click',()=>{membersEl.classList.remove('grid');membersEl.classList.add('list');});
loadMembers();
