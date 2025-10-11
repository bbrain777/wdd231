export async function fetchPrograms(){
  try {
    const res = await fetch('data/programs.json');
    if(!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.error('fetchPrograms failed:', err);
    return [];
  }
}
export async function fetchTeam(){
  try {
    const res = await fetch('data/team.json');
    if(!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.error('fetchTeam failed:', err);
    return [];
  }
}
