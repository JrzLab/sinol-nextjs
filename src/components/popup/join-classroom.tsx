"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT VALIDATION SCHEMA
import { joinClassroomFormSchema } from "@/lib/form-validation-schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const JoinClassroom = ({ status }: { status: () => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };

  const joinClassroomForm = useForm<z.infer<typeof joinClassroomFormSchema>>({
    resolver: zodResolver(joinClassroomFormSchema),
    defaultValues: {
      classroomCode: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof joinClassroomFormSchema>) => {
    joinClassroomFormSchema.parse(values);
    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ code: classroomCode }),
    // }).then(res => res.json()).then(res => res.status == 200 ?
    //   router.push(`/classroom/${res.data.id}`) :
    //   toast({
    //     title: "Failed to join classroom",
    //     description: "Kode kelas tidak valid",
    //   })
    // )
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
                <Button onClick={togglePopUp} variant={"default"} className="hover:bg-secondary">
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
