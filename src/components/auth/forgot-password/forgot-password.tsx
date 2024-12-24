"use client";
//IMPORT REACT/NEXTJS DEPENDENCIES
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//IMPORT VALIDATION SCHEMA
import { forgotPasswordFormSchema } from "@/lib/definitions";

//IMPORT ICONS
import { GalleryVerticalEnd } from "lucide-react";
import ResetPassword from "./reset-password";

const ForgotPasswordForm = () => {
  const query = useSearchParams();
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

  //VALIDATION URL QUERY
  useEffect(() => {
    const resetPassword = query.get("key");
    if (resetPassword === "iniadalahcontohlinkresetpassword") {
      setShowResetPassword(true);
    } else {
      setShowResetPassword(false);
    }
  }, [query]);

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  //SUBMIT HANDLER FOR VALIDATION FORM
  const submitHandler = (values: z.infer<typeof forgotPasswordFormSchema>) => {
    try {
      forgotPasswordFormSchema.parse(values);
      console.log({ message: "Form is valid", value: values });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {showResetPassword ? (
        <ResetPassword />
      ) : (
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
                          <Input id="email" type="email" placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">Masukan alamat email yang valid.</FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" onClick={forgotPasswordForm.handleSubmit(submitHandler)}>
                  Kirim
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
