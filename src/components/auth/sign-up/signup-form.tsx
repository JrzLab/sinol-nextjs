"use client";
import SignInWithGoogleButton from "@/components/auth/button/sign-in";
import { useRouter } from "next/navigation";

//IMPORT ACTION
import { signUpCredentials } from "@/app/actions/auth-actions";

//IMPORT TYPES
import { ISignUpResponse } from "@/lib/types/Types";

//IMPORT REACT DEPENDENCIES
import { useState } from "react";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { set } from "zod";

//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

//IMPORT VALIDATION SCHEMA
import { signUpFormSchema } from "@/lib/form-validation-schema";

//IMPORT ICONS
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";;

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prev: boolean) => !prev);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);
    try {
      signUpFormSchema.parse(values);

      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.confirmPassword);

      toast.promise(signUpCredentials(formData), {
        loading: "Creating account...",
        success: (response) => {
          const typedResponse = response as ISignUpResponse;
          if (typeof response === "object" && response !== null && "success" in response && "code" in response && "message" in response) {
            if (typedResponse.success && typedResponse.code === 201) {
              setTimeout(() => {
                router.push("/auth/sign-in");
              }, 1000);
              return typedResponse.message;
            }
          }
          throw new Error(typedResponse.message);
        },
        error: (err) => err.message || "Terjadi kesalahan saat mendaftar.",
      });
    } catch (err) {
      console.error("Kesalahan saat submit:", err);
      toast.error("Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Form {...signUpForm}>
        <form className="flex flex-col gap-6" method="post">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Buat akun Sinau Online</h1>
            <p className="text-balance text-sm text-muted-foreground">Masukkan email Anda di bawah untuk membuat akun baru</p>
          </div>
          <div className="grid gap-2">
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">Masukan alamat email yang valid.</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Masukan Password Anda" id="password" type={showPassword ? "text" : "password"} {...field} />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <button type="button" onClick={togglePassword} className="p-1">
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">Kata sandi minimal 8 karakter.</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Konfirmasi Kata Sandi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukan Konfirmasi Password Anda" id="confirmPassword" type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="mt-2 grid gap-2">
              <Button disabled={loading} type="submit"  className="w-full" onClick={signUpForm.handleSubmit(submitHandler)}>
                Daftar
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-xs text-muted-foreground">Atau daftar akun dengan</span>
              </div>
              <SignInWithGoogleButton type="sign-up" />
            </div>
          </div>
          <div className="text-center text-xs">
            Sudah punya akun Sinau Online?{" "}
            <Link href="/auth/sign-in" className="underline underline-offset-4">
              Masuk Sekarang
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
