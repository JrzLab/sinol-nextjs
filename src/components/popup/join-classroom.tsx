"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT VALIDATION SCHEMA
import { joinClassroomFormSchema } from "@/lib/form-validation-schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { joinClassByUidClassUser } from "@/app/actions/api-actions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const JoinClassroom = ({ isOpen, status }: { isOpen: boolean; status: () => void }) => {
  const uidUser = Cookies.get("uidClassUser");
  const router = useRouter();
  const joinClassroomForm = useForm<z.infer<typeof joinClassroomFormSchema>>({
    resolver: zodResolver(joinClassroomFormSchema),
    defaultValues: {
      classroomCode: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof joinClassroomFormSchema>) => {
    joinClassroomFormSchema.parse(values);
    try {
      const data = await joinClassByUidClassUser({
        uidClass: values.classroomCode,
        uidClassUser: uidUser!,
      });
      if (data?.success && data?.code === 200) {
        router.push(`/classroom/`);
        status();
      } else {
        console.log("error kocak");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50 px-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between gap-1">
                <div>
                  <h1 className="text-lg font-bold">Bergabung Ke Kelas</h1>
                  <p className="text-sm">Siap belajar? Masukkan kode kelas untuk bergabung.</p>
                </div>
                <Button onClick={() => status()} variant={"default"} className="hover:bg-secondary">
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <Form {...joinClassroomForm}>
                <form className="flex w-full flex-col gap-6 pt-4">
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={joinClassroomForm.control}
                      name="classroomCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomCode">Kode Kelas</FormLabel>
                          <FormControl>
                            <Input id="classroomCode" type="text" placeholder="Masukan Kode Kelas" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Kode Kelas.</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full hover:bg-secondary"
                    onClick={joinClassroomForm.handleSubmit(submitHandler)}
                    variant={"default"}
                  >
                    Gabung Kelas
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default JoinClassroom;
