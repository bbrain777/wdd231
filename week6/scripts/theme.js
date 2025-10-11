
const KEY = 'zydi-theme';
export function applySavedTheme(){
  const saved = localStorage.getItem(KEY);
  if(saved === 'dark'){ document.documentElement.classList.add('dark'); }
}
export function toggleTheme(){
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem(KEY, isDark ? 'dark' : 'light');
}
