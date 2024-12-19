export const getToday = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const date = new Date();
  const day = days[date.getDay()];
  const dateNow = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const today = `${day}, ${dateNow} ${month} ${year}`;
  return today
} 

export const FixDate = ({ children }: { children: string }) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const date = new Date(children);
  const day = days[date.getDay()];
  const dateNow = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toTimeString().split(' ')[0].slice(0, 5);
  return `${day}, ${dateNow} ${month} ${year} | ${time}`
}

// export const fix = (link: string = "http://localhost:3000/classroom/6") => {
//   const path = link.split('/')[]

//   return 
// }


