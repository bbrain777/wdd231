
function params(){
  const s = new URLSearchParams(location.search);
  const out = {};
  for (const [k,v] of s) out[k]=v;
  return out;
}
const data = params();
const dl = document.getElementById('receipt');
if(dl){
  Object.entries(data).forEach(([k,v]) => {
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    dl.append(dt, dd);
  });
  const ts = document.createElement('p'); ts.textContent = 'Submitted at ' + new Date().toLocaleString();
  dl.after(ts);
}
