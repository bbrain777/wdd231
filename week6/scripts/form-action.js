
const params = new URLSearchParams(location.search);
const out = [];
params.forEach((v,k)=>{ out.push(`<p><strong>${k}:</strong> ${String(v).replace(/</g,'&lt;')}</p>`); });
const result = document.getElementById('result');
if (result) result.innerHTML = out.join('');
if (params.get('updates') === 'yes') { localStorage.setItem('zydi:updatesOptIn', 'true'); }
