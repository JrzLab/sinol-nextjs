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
