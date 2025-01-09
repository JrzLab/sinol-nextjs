"use client";
import SignInWithGoogleButton from "@/components/auth/button/sign-in";

//IMPORT REACT/NEXTJS DEPENDENCIES
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { set } from "zod";

//IMPORT SHADCN COMPONENT
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner'

//IMPORT VALIDATION SCHEMA
import { signInFormSchema } from "@/lib/form-validation-schema";

//IMPORT ICONS
import { Eye, EyeOff, Loader2 } from "lucide-react";

//IMPORT ACTION
import { handleCredentialsSignin } from "@/app/actions/auth-actions";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePassword = () => setShowPassword((prev: boolean) => !prev);
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //SUBMIT HANDLER FOR VALIDATION FORM
  const submitHandler = async (values: z.infer<typeof signInFormSchema>) => {
    setLoading(true);
    setError("");
    signInFormSchema.parse(values);
    toast.promise(handleCredentialsSignin(values), {
      loading: 'Checking credentials...',
      success: (response) => {
        if(response.success) {
          window.location.reload();
          return response.message;
        }
        throw new Error(response.message);
      },
      error: (err) => {
        return err.message;
      },
      finally: () => {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Form {...signInForm}>
        <form className="p-6 text-foreground md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start text-center">
              <h1 className="text-2xl font-bold">Selamat Datang</h1>
              <p className="text-balance text-sm text-muted-foreground">Masuk ke akun Sinau Online anda</p>
            </div>
            <div className="grid gap-3">
              <FormField
                control={signInForm.control}
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
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input id="password" placeholder="Masukan Password Anda" type={showPassword ? "text" : "password"} {...field} />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <button type="button" onClick={togglePassword} className="p-1">
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      <Link href="/auth/forgot-password" className="hover:text-black hover:underline">
                        Lupa kata sandi?
                      </Link>
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="grid gap-3">
                <Button disabled={loading} type="submit" className="w-full hover:bg-secondary" onClick={signInForm.handleSubmit(submitHandler)} variant={"default"}>
                  Masuk
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-card px-2">Atau masuk dengan</span>
                </div>
                <div className="grid grid-cols-1">
                  <SignInWithGoogleButton type="sign-in" />
                </div>
              </div>
              <div className="text-center text-xs">
                Belum memiliki akun Sinau Online? <br />
                <Link href="/auth/sign-up" className="underline underline-offset-4">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export default SignInForm;
