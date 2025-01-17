"use client";
//IMPORT REACT/NEXTJS DEPENDENCIES
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

//IMPORT TYPES
import { IRequestResetPass } from "@/lib/types/Types";

//IMPORT ACTION
import { handleRequestResetPassword } from "@/app/actions/auth-actions";

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
import { forgotPasswordFormSchema } from "@/lib/form-validation-schema";

//IMPORT ICONS
import { GalleryVerticalEnd } from "lucide-react";
import ResetPassword from "./reset-password";

const ForgotPasswordForm = () => {
  const query = useSearchParams();
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  // const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [isValidating, setIsValidating] = useState<boolean>(true);

  //VALIDATION URL QUERY
  useEffect(() => {
    setShowResetPassword(false);
    const tokenResetPassword = query.get("profile");
    const userEmail = query.get("userId");
    if (tokenResetPassword && userEmail) {
      setShowResetPassword(true);
    } else {
      setShowResetPassword(false);
    }
  }, [query]);

  //VALIDATION URL QUERY
  // useEffect(() => {
  //   const tokenResetPassword = query.get("profile");
  //   const userEmail = query.get("userId");

  //   if (tokenResetPassword && userEmail) {
  //     handleVerifTokenResetPass(tokenResetPassword, userEmail)
  //       .then((response) => {
  //         if (response.success) {
  //           setShowResetPassword(true);
  //         } else {
  //           setShowResetPassword(false);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Terjadi kesalahan:", err.message);
  //       })
  //       .finally(() => {
  //         setIsValidating(false);
  //       });
  //   } else {
  //     setIsValidating(false);
  //   }
  // }, [query]);

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    setLoading(true);
    forgotPasswordFormSchema.parse(values);

    const formData = new FormData();
    formData.append("email", values.email);

    toast.promise(handleRequestResetPassword(formData), {
      loading: "Meminta Perubahan Kata Sandi...",
      success: (response) => {
        const typedResponse = response as IRequestResetPass;
        if (typeof response === "object" && response !== null && "success" in response && "message" in response) {
          if (typedResponse.success) {
            return "Berhasil mengirimkan email perubahan kata sandi, silahkan cek email anda";
          }
        }
        throw new Error(typedResponse.message);
      },
      error: (err) => {
        if (err.message === "User not found") {
          return "Email Ini Tidak Ditemukan";
        }
      },
      finally: () => {
        setLoading(false);
      },
    });
  };

  // if (isValidating) return null;

  return (
    <>
      {showResetPassword ? (
        <ResetPassword />
      ) : (
        <Suspense>
          <Form {...forgotPasswordForm}>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                  <a href="#" className="flex flex-col items-center gap-2 font-medium">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Acme Inc.</span>
                  </a>
                  <h1 className="text-xl font-bold">Lupa Kata Sandi</h1>
                  <div className="text-center text-sm">Masukan alamat email kamu untuk konfirmasi email</div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={forgotPasswordForm.control}
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
                  </div>
                  <Button
                    disabled={loading}
                    type="submit"
                    variant={"default"}
                    className="w-full hover:bg-accent"
                    onClick={forgotPasswordForm.handleSubmit(submitHandler)}
                  >
                    Kirim
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </Suspense>
      )}
    </>
  );
};

export default ForgotPasswordForm;
