
let dialog;
export function initModal(){
  dialog = document.getElementById('programModal');
  if(!dialog) return;
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', ()=> dialog.close());
  dialog.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') dialog.close();
  });
  dialog.addEventListener('click', (e)=>{
    const rect = dialog.querySelector('article').getBoundingClientRect();
    const inDialog = e.clientX >= rect.left && e.clientX <= rect.right &&
                     e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inDialog) dialog.close();
  });
}
export function openModal(title, html){
  if (!dialog) return;
  dialog.querySelector('#modalTitle').textContent = title;
  dialog.querySelector('#modalBody').innerHTML = html;
  dialog.showModal();
}
