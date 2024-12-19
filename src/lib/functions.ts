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