
const dialog = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');
closeBtn?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (e) => {
  const rect = dialog.getBoundingClientRect();
  const inDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                   rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
  if (!inDialog) dialog.close();
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && dialog?.open) dialog.close();
});
