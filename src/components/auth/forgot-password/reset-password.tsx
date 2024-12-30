"use client";
//IMPORT REACT/NEXTJS DEPENDENCIES
import { useState } from "react";
import { useSearchParams } from "next/navigation";

// IMPORT TYPES
import { IResetPassword } from "@/lib/types/Types";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT ACTION
import { handleResetPassword } from "@/app/actions";

//IMPORT SHADCN COMPONENTS
import SignUpForm from "../sign-up/signup-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//IMPORT VALIDATION SCHEMA
import { signUpFormSchema } from "@/lib/form-validation-schema";

//IMPORT ICONS
import { Eye, EyeOff, GalleryVerticalEnd, Loader2 } from "lucide-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const togglePassword = () => setShowPassword((prev: boolean) => !prev);
  const query = useSearchParams();

  const resetPasswordForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      signUpFormSchema.parse(values);
      const tokenResetPassword = query.get("profile");
    
      const response = await handleResetPassword(values.email, values.confirmPassword, tokenResetPassword);
      if (typeof response === "object" && response !== null && "success" in response && "message" in response) {
        const typedResponse = response as IResetPassword;
        if (typedResponse.success) {
          setServerMessage(typedResponse.message);
        } else {
          setServerMessage(typedResponse.message || "An unknown error occurred");
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
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
              {serverMessage && <p className="text-sm text-red-500">{serverMessage}</p>}
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
                        <Input id="email" type="email" placeholder="example@gmail.com" {...field} />
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
                          <Input id="password" type={showPassword ? "text" : "password"} {...field} />
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
                        <Input id="confirmPassword" type="password" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" onClick={resetPasswordForm.handleSubmit(submitHandler)}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submit</>  : <>Submit</>}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ResetPassword;
