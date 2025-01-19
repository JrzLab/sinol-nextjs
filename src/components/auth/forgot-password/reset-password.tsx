"use client";
//IMPORT REACT/NEXTJS DEPENDENCIES
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// IMPORT TYPES
import { IResetPassword } from "@/lib/types/Types";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

//IMPORT VALIDATION SCHEMA
import { signUpFormSchema } from "@/lib/form-validation-schema";

//IMPORT ICONS
import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prev: boolean) => !prev);
  const query = useSearchParams();
  const router = useRouter();
  const emailUser = query.get("userId");

  const resetPasswordForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: emailUser ? emailUser : "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);
    signUpFormSchema.parse(values);
    const tokenResetPassword = query.get("profile");

    toast.promise(fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: btoa(values.confirmPassword),
        token: tokenResetPassword,
      }),
    }), {
      loading: "Proccessing change password...",
      success: async (response) => {
        const typedResponse = (await response.json()) as IResetPassword;
        if (typedResponse.success && typedResponse.code === 200) {
          router.push("/");
          return typedResponse.message;
        }
        throw new Error(typedResponse.message);
      },
      error: (err) => {
        console.log(err)
        return err.message;
      },
      finally: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Suspense>
        <Form {...resetPasswordForm}>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a href="#" className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">Acme Inc.</span>
                </a>
                <h1 className="text-xl font-bold">Ubah Kata Sandi</h1>
                <div className="text-center text-sm">Masukan email dan kata sandi baru</div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={resetPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="contoh@gmail.com" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">Masukan alamat email yang valid.</FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input id="password" placeholder="Masukan Kata Sandi Baru" type={showPassword ? "text" : "password"} {...field} />
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
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="confirmPassword">Konfirmasi Kata Sandi</FormLabel>
                        <FormControl>
                          <Input placeholder="Konfirmasi Kata Sandi Baru" id="confirmPassword" type="password" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={loading}
                  type="submit"
                  variant="default"
                  className="w-full hover:bg-accent"
                  onClick={resetPasswordForm.handleSubmit(submitHandler)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Suspense>
    </>
  );
};

export default ResetPassword;
