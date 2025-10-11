export const getView = () => localStorage.getItem('view') || 'grid';
export const setView = (v) => localStorage.setItem('view', v);
export const getFaves = () => JSON.parse(localStorage.getItem('faves')||'[]');
export const toggleFave = (id) => {
  const f = new Set(getFaves());
  if (f.has(id)) f.delete(id); else f.add(id);
  localStorage.setItem('faves', JSON.stringify([...f]));
  return [...f];
};
