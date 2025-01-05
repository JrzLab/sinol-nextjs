import { IMessage, IStudent, ISubject } from "./types/Types";

export const getSubjectDataEachDay = ({ subjects }: { subjects: ISubject[] }) => {
  const list = Array.from(new Set(subjects.map((item) => item.day)))
    .sort((a, b) => a - b)
    .map((day) => ({
      day: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][day - 1],
      data: subjects.filter((item) => item.day === day),
    }));
  return list;
};

export const getToday = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const date = new Date();
  const day = days[date.getDay()];
  const dateNow = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const today = `${day}, ${dateNow} ${month} ${year}`;
  return today;
};

export const getDate = ({ children, time = "active" }: { children: string; time?: "active" | "deactive" }) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const date = new Date(children);
  const day = days[date.getDay()];
  const dateNow = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const times = date.toTimeString().split(" ")[0].slice(0, 5);
  if (time === "deactive") return `${day}, ${dateNow} ${month} ${year}`;
  return `${day}, ${dateNow} ${month} ${year} | ${times}`;
};

export const toPascalCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const sortStudentsByLastMessage = (messages: IMessage[], sortBy: "latest" | "earliest") => {
  if (sortBy === "latest") return messages.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()) as IMessage[];
  if (sortBy === "earliest") return messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()) as IMessage[];
};
export const dateFormater = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

export const getGreeting = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) {
    return "Selamat Pagi";
  } else if (hours >= 12 && hours < 15) {
    return "Selamat Siang";
  } else if (hours >= 15 && hours < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
};

export const getTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

export const truncateText = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

export function getInitials(fullName: string): string {
  if (!fullName.trim()) return '';

  return fullName
    .split(' ')
    .filter(name => name.length > 0)
    .map(name => name[0].toUpperCase())
    .join('');
}