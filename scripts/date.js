// date.js — dynamic copyright + last modified
const ownerName = "Olakunle Obademi";      // ← update to your name
const ownerLocation = "United Kingdom";    // ← update to your state/country

const yearSpan = document.getElementById('copyright');
const ownerSpan = document.getElementById('owner');
const locSpan = document.getElementById('location');
const lastMod = document.getElementById('lastModified');

const now = new Date();
yearSpan.textContent = `© ${now.getFullYear()}`;
ownerSpan.textContent = ownerName;
locSpan.textContent = ownerLocation;

lastMod.textContent = `Last Modified: ${document.lastModified}`;
