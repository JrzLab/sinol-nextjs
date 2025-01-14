import z from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email({ message: "Mohon masukkan email yang benar." }),
    password: z.string().min(8, { message: "Kata sandi harus terdiri dari minimal 8 karakter." }),
    confirmPassword: z.string().min(8, { message: "Konfirmasi kata sandi harus sesuai kata sandi." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi harus sama dengan kata sandi.",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.string().nonempty({ message: "Email wajib diisi." }).email({ message: "Format email tidak valid." }),
  password: z.string().nonempty({ message: "Password wajib diisi." }),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().nonempty({ message: "Email wajib diisi." }).email({ message: "Format email tidak valid." }),
});

export const classroomFormSchema = z.object({
  classroomName: z.string().nonempty({ message: "Nama jadwal wajib diisi." }),
  date: z.date({ required_error: "Tanggal wajib diisi." }),
  time: z.date({ required_error: "Waktu wajib diisi." }),
});

export const createClassroomFormSchema = z.object({
  classroomName: z
    .string()
    .nonempty({ message: "Nama kelas wajib diisi." })
    .refine((value) => value.split(/\s/).filter((word) => word.length > 0).length <= 20, { message: "Nama kelas maksimal 20 kata." }),
  description: z.string().nonempty({ message: "Deskripsi kelas wajib diisi." }).max(255, { message: "Deskripsi kelas maksimal 255 karakter." }),
  classroomDay: z
    .string()
    .nonempty({ message: "Hari kelas wajib diisi." })
    .refine((value) => ["1", "2", "3", "4", "5", "6", "7"].includes(value), { message: "Hari kelas tidak valid." }),
});

export const editClassroomFormSchema = z.object({
  classroomName: z
    .string()
    .nonempty({ message: "Nama kelas wajib diisi." })
    .refine((value) => value.split(/\s/).filter((word) => word.length > 0).length <= 20, { message: "Nama kelas maksimal 20 kata." }),
  description: z.string().nonempty({ message: "Deskripsi kelas wajib diisi." }).max(255, { message: "Deskripsi kelas maksimal 255 karakter." }),
  classroomDay: z
    .string()
    .nonempty({ message: "Hari kelas wajib diisi." })
    .refine((value) => ["1", "2", "3", "4", "5", "6", "7"].includes(value), { message: "Hari kelas tidak valid." }),
});

export const joinClassroomFormSchema = z.object({
  classroomCode: z
    .string()
    .nonempty({ message: "Kode kelas wajib diisi." })
    .max(8, { message: "Kode kelas maksimal 8 karakter." })
    .min(8, { message: "Kode kelas minimal 8 karakter." }),
});

export const changeDataFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().nonempty({ message: "Kata sandi wajib diisi." }).min(8, { message: "Kata sandi minimal 8 karakter." }),
});

export const createEventFormSchema = z.object({
  eventName: z.string().nonempty({ message: "Nama tugas wajib diisi." }),
  eventDescription: z.string().nonempty({ message: "Deskripsi tugas wajib diisi." }),
  eventScore: z.number().min(0, { message: "Nilai tugas minimal 0." }).max(100, { message: "Nilai tugas maksimal 100." }),
  eventDueDate: z.date({ required_error: "Tanggal wajib diisi." }),
});
