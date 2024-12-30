"use client";
//IMPORT REACT/NEXTJS DEPENDENCIES
import { useState } from "react";
import Link from "next/link";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT SHADCN COMPONENT
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//IMPORT VALIDATION SCHEMA
import { signInFormSchema } from "@/lib/form-validation-schema";

//IMPORT ICONS
import { Eye, EyeOff } from "lucide-react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword((prev: boolean) => !prev);
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //SUBMIT HANDLER FOR VALIDATION FORM
  const submitHandler = (values: z.infer<typeof signInFormSchema>) => {
    try {
      signInFormSchema.parse(values);
      console.log({ message: "Form is valid", value: values });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Form {...signInForm}>
        <form className="p-6 md:p-8">
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
                        <Input id="password" type={showPassword ? "text" : "password"} {...field} />
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
                <Button type="submit" className="w-full" onClick={signInForm.handleSubmit(submitHandler)}>
                  Masuk
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-xs text-muted-foreground">Atau masuk dengan</span>
                </div>
                <div className="grid grid-cols-1">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs">Masuk dengan Google</span>
                  </Button>
                </div>
              </div>
              <div className="text-center text-xs">
                Belum memiliki akun Sinau Online? <br />
                <a href="/auth/signup" className="underline underline-offset-4">
                  Daftar Sekarang
                </a>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export default SignInForm;
