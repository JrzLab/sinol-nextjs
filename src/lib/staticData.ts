export const subjectStaticData = [
  {
    id: 1,
    title: "Dasar Dasar Pemprograman",
    teacher: "Pak SiDragon",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta tempore neque ipsum deleniti nostrum dignissimos ducimus voluptas corporis. Voluptates voluptate quibusdam facilis ad quo, aperiam necessitatibus vitae accusantium rerum.",
    notifications: 1,
    event: 5,
    person: 20,
    day: 7
  },
  {
    id: 2,
    title: "Dasar Dasar Komputasi",
    teacher: "Pak Jatmiko",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta tempore neque ipsum deleniti nostrum dignissimos ducimus voluptas corporis. Voluptates voluptate quibusdam facilis ad quo, aperiam necessitatibus vitae accusantium rerum.",
    notifications: 1,
    event: 3,
    person: 15,
    day: 2
  },
  {
    id: 3,
    title: "Keterampilan Interpersonal",
    teacher: "Bu Siti",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla soluta tempore neque ipsum deleniti nostrum dignissimos ducimus voluptas corporis. Voluptates voluptate quibusdam facilis ad quo, aperiam necessitatibus vitae accusantium rerum.",
    notifications: 1,
    event: 4,
    person: 18,
    day: 2
  },
  {
    id: 4,
    title: "Pengantar Teknologi Informasi",
    teacher: "Pak Ahmad",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam veritatis eveniet fugit iure perferendis. Distinctio ea dolorem vel consequuntur eius.",
    notifications: 2,
    event: 6,
    person: 25,
    day: 2
  },
  {
    id: 5,
    title: "Manajemen Basis Data",
    teacher: "Bu Lestari",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto recusandae quasi neque placeat voluptatibus nihil delectus dolores.",
    notifications: 3,
    event: 7,
    person: 30,
    day: 1
  },
  {
    id: 6,
    title: "Statistika dan Probabilitas",
    teacher: "Pak Surya",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum obcaecati eaque magni, voluptas facere consectetur officiis error?",
    notifications: 0,
    event: 2,
    person: 12,
    day: 1
  },
  {
    id: 7,
    title: "Pemrograman Berbasis Web",
    teacher: "Pak Arif",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, eligendi! Voluptates molestias tempora aspernatur impedit aliquid.",
    notifications: 1,
    event: 8,
    person: 28,
    day: 7
  },
  {
    id: 8,
    title: "Pemrograman Berorientasi Objek",
    teacher: "Bu Dina",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, odit. Fugiat exercitationem consectetur atque adipisci doloremque repellat!",
    notifications: 2,
    event: 6,
    person: 22,
    day: 3
  },
  {
    id: 9,
    title: "Jaringan Komputer Dasar",
    teacher: "Pak Rizal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit optio molestias hic mollitia, quibusdam repellendus.",
    notifications: 1,
    event: 4,
    person: 17,
    day: 2
  },
  {
    id: 10,
    title: "Sistem Operasi",
    teacher: "Bu Indah",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequuntur quas repudiandae repellat dicta animi.",
    notifications: 2,
    event: 5,
    person: 19,
    day: 4
  },
  {
    id: 11,
    title: "Sistem Operasi 2",
    teacher: "Bu Indah",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequuntur quas repudiandae repellat dicta animi.",
    notifications: 2,
    event: 5,
    person: 19,
    day: 4
  }
]

export const eventStaticData = [
  {
    subjectId: 2, // foreign key
    eventId: 1,   // primary key
    title: "Membuat Array",
    date: "2024/09/20 09:00:12",
    description: "lorem ipsum...."
  },
  {
    subjectId: 3,
    eventId: 2,
    title: "Belajar JavaScript",
    date: "2024/10/01 10:30:00",
    description: "Dasar-dasar JavaScript untuk pemula."
  },
  {
    subjectId: 4,
    eventId: 3,
    title: "Workshop React",
    date: "2024/10/05 14:00:00",
    description: "Pengenalan React dan komponennya."
  },
  {
    subjectId: 2,
    eventId: 4,
    title: "Kuis CSS",
    date: "2024/10/10 08:45:00",
    description: "Tes pengetahuan CSS tingkat dasar."
  },
  {
    subjectId: 5,
    eventId: 5,
    title: "Latihan Flexbox",
    date: "2024/10/15 09:15:00",
    description: "Menyusun layout dengan CSS Flexbox."
  },
  {
    subjectId: 6,
    eventId: 6,
    title: "Belajar Next.js",
    date: "2024/10/20 13:00:00",
    description: "Membangun aplikasi dengan Next.js."
  },
  {
    subjectId: 7,
    eventId: 7,
    title: "Pemrograman TypeScript",
    date: "2024/10/25 15:00:00",
    description: "Dasar-dasar TypeScript untuk pengembangan aplikasi."
  },
  {
    subjectId: 8,
    eventId: 8,
    title: "Event Delegation di JavaScript",
    date: "2024/11/01 11:30:00",
    description: "Meningkatkan performa event handling dengan delegation."
  },
  {
    subjectId: 9,
    eventId: 9,
    title: "Refactoring Kode",
    date: "2024/11/05 10:00:00",
    description: "Praktik terbaik untuk menyempurnakan kode Anda."
  },
  {
    subjectId: 10,
    eventId: 10,
    title: "Latihan Tailwind CSS",
    date: "2024/11/10 16:00:00",
    description: "Membangun antarmuka responsif dengan Tailwind CSS."
  },
  {
    subjectId: 11,
    eventId: 11,
    title: "Belajar Debugging",
    date: "2024/11/15 14:45:00",
    description: "Memahami teknik debugging yang efektif."
  },
  {
    subjectId: 12,
    eventId: 12,
    title: "Pengenalan Node.js",
    date: "2024/11/20 10:00:00",
    description: "Dasar-dasar pengembangan backend menggunakan Node.js."
  },
  {
    subjectId: 13,
    eventId: 13,
    title: "Workshop MongoDB",
    date: "2024/11/25 13:30:00",
    description: "Mengelola basis data dengan MongoDB."
  },
  {
    subjectId: 14,
    eventId: 14,
    title: "Membuat API REST",
    date: "2024/12/01 15:00:00",
    description: "Belajar membuat API REST menggunakan Express.js."
  },
  {
    subjectId: 15,
    eventId: 15,
    title: "UI/UX Design Basics",
    date: "2024/12/05 11:00:00",
    description: "Memahami dasar-dasar desain antarmuka pengguna dan pengalaman pengguna."
  },
  {
    subjectId: 16,
    eventId: 16,
    title: "Deploying with Vercel",
    date: "2024/12/10 09:30:00",
    description: "Panduan untuk mendeploy aplikasi web menggunakan Vercel."
  }
];


export const chartStaticData1 = [
  { date: "2024-04-01", data: 222 },
  { date: "2024-04-02", data: 97 },
  { date: "2024-04-03", data: 167 },
  { date: "2024-04-04", data: 242 },
  { date: "2024-04-05", data: 373 },
  { date: "2024-04-06", data: 301 },
  { date: "2024-04-07", data: 245 },
  { date: "2024-04-08", data: 409 },
  { date: "2024-04-09", data: 59 },
  { date: "2024-04-10", data: 261 },
  { date: "2024-04-11", data: 327 },
  { date: "2024-04-12", data: 292 },
  { date: "2024-04-13", data: 342 },
  { date: "2024-04-14", data: 137 },
  { date: "2024-04-15", data: 120 },
  { date: "2024-04-16", data: 138 },
  { date: "2024-04-17", data: 446 },
  { date: "2024-04-18", data: 364 },
  { date: "2024-04-19", data: 243 },
  { date: "2024-04-20", data: 89 },
  { date: "2024-04-21", data: 137 },
  { date: "2024-04-22", data: 224 },
  { date: "2024-04-23", data: 138 },
  { date: "2024-04-24", data: 387 },
  { date: "2024-04-25", data: 215 },
  { date: "2024-04-26", data: 75 },
  { date: "2024-04-27", data: 383 },
  { date: "2024-04-28", data: 122 },
  { date: "2024-04-29", data: 315 },
  { date: "2024-04-30", data: 454 },
  { date: "2024-05-01", data: 165 },
  { date: "2024-05-02", data: 293 },
  { date: "2024-05-03", data: 247 },
  { date: "2024-05-04", data: 385 },
  { date: "2024-05-05", data: 481 },
  { date: "2024-05-06", data: 498 },
  { date: "2024-05-07", data: 388 },
  { date: "2024-05-08", data: 149 },
  { date: "2024-05-09", data: 227 },
  { date: "2024-05-10", data: 293 },
  { date: "2024-05-11", data: 335 },
  { date: "2024-05-12", data: 197 },
  { date: "2024-05-13", data: 197 },
  { date: "2024-05-14", data: 448 },
  { date: "2024-05-15", data: 473 },
  { date: "2024-05-16", data: 338 },
  { date: "2024-05-17", data: 499 },
  { date: "2024-05-18", data: 315 },
  { date: "2024-05-19", data: 235 },
  { date: "2024-05-20", data: 177 },
  { date: "2024-05-21", data: 82 },
  { date: "2024-05-22", data: 81 },
  { date: "2024-05-23", data: 252 },
  { date: "2024-05-24", data: 294 },
  { date: "2024-05-25", data: 201 },
  { date: "2024-05-26", data: 213 },
  { date: "2024-05-27", data: 420 },
  { date: "2024-05-28", data: 233 },
  { date: "2024-05-29", data: 78 },
  { date: "2024-05-30", data: 340 },
  { date: "2024-05-31", data: 178 },
  { date: "2024-06-01", data: 178 },
  { date: "2024-06-02", data: 470 },
  { date: "2024-06-03", data: 103 },
  { date: "2024-06-04", data: 439 },
  { date: "2024-06-05", data: 88 },
  { date: "2024-06-06", data: 294 },
  { date: "2024-06-07", data: 323 },
  { date: "2024-06-08", data: 385 },
  { date: "2024-06-09", data: 438 },
  { date: "2024-06-10", data: 155 },
  { date: "2024-06-11", data: 92 },
  { date: "2024-06-12", data: 492 },
  { date: "2024-06-13", data: 81 },
  { date: "2024-06-14", data: 426 },
  { date: "2024-06-15", data: 307 },
  { date: "2024-06-16", data: 371 },
  { date: "2024-06-17", data: 475 },
  { date: "2024-06-18", data: 107 },
  { date: "2024-06-19", data: 341 },
  { date: "2024-06-20", data: 408 },
  { date: "2024-06-21", data: 169 },
  { date: "2024-06-22", data: 317 },
  { date: "2024-06-23", data: 480 },
  { date: "2024-06-24", data: 132 },
  { date: "2024-06-25", data: 141 },
  { date: "2024-06-26", data: 434 },
  { date: "2024-06-27", data: 448 },
  { date: "2024-06-28", data: 149 },
  { date: "2024-06-29", data: 103 },
  { date: "2024-06-30", data: 446 },
]