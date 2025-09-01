// date.js — footer owner + formatted last modified (UK format)
const ownerName = "Olakunle Obademi";
const ownerLocation = "Stockton-on-Tees, United Kingdom";

const yearSpan = document.getElementById('copyright');
const ownerSpan = document.getElementById('owner');
const locSpan = document.getElementById('location');
const lastMod = document.getElementById('lastModified');

const now = new Date();
yearSpan.textContent = `© ${now.getFullYear()}`;
ownerSpan.textContent = ownerName;
locSpan.textContent = ownerLocation;

// Format document.lastModified as DD/MM/YYYY HH:MM:SS (UK-style)
function formatLastMod(s){
  const d = new Date(s);
  const pad = (n) => String(n).padStart(2,'0');
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth()+1);
  const yyyy = d.getFullYear();
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
}
lastMod.textContent = `Last Modified: ${formatLastMod(document.lastModified)}`;
