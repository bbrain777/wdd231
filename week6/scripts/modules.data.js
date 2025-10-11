
export async function fetchPrograms(){
  try{
    const res = await fetch('data/programs.json',{cache:'no-store'});
    if(!res.ok) throw new Error('Failed to fetch programs');
    const data = await res.json();
    if(!Array.isArray(data)) throw new Error('Invalid data format');
    return data;
  }catch(err){
    console.error('fetchPrograms error', err);
    return [
      { id: 0, title: 'Mentorship Hub', category:'Mentorship', location:'Teesside', ageRange:'13–18', startDate:'2025-01-10', image:'images/placeholder.svg', link:'#', description:'Weekly group mentoring with professionals.' }
    ];
  }
}
