
const form = document.getElementById('contact-form');
const validators = {
  name: v => v.trim().length >= 2,
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  message: v => v.trim().length >= 10,
};
form?.addEventListener('submit', (e) => {
  let ok = true;
  for (const [id, fn] of Object.entries(validators)){
    const input = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    const valid = fn(input.value);
    err.hidden = valid;
    input.setAttribute('aria-invalid', String(!valid));
    if(!valid){ ok = false; }
  }
  if(!ok){
    e.preventDefault();
  }
});
