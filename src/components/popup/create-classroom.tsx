"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT VALIDATION SCHEMA
import { createClassroomFormSchema } from "@/lib/form-validation-schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { createClassByUidClassUser } from "@/app/actions/api-actions";
import { useAuth } from "@/hooks/context/AuthProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CreateClassroom = ({ status }: { status: () => void }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };

  const createClassroomForm = useForm<z.infer<typeof createClassroomFormSchema>>({
    resolver: zodResolver(createClassroomFormSchema),
    defaultValues: {
      classroomName: "",
      description: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof createClassroomFormSchema>) => {
    createClassroomFormSchema.parse(values);
    try {
      const data = await createClassByUidClassUser({
        email: user?.email || "",
        uid: user?.uidClassUser || "",
        className: values.classroomName,
        description: values.description,
        day: values.classroomDay,
      });
      if (data?.success && data?.code === 200) {
        router.push(`/classroom/`);
        toast({
          title: "Kelas berhasil dibuat",
          description: "Kelas berhasil dibuat",
        });
      }
    } catch (error) {
      console.log(error);
    }
    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(classroomData),
    // }).then(res => res.json()).then(res => res.status == 200 ?
    //   router.push(`/classroom/${res.data.id}`) :
    //   toast({
    //     title: "Failed to create classroom",
    //     description: "gagal membuat kelas baru",
    //   })
    // )
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50 px-6">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <div className="flex justify-between gap-1">
                <div>
                  <h1 className="text-lg font-bold">Buat Kelas</h1>
                  <p className="text-sm">Mulai petualangan belajarmu dengan membuat kelas baru. Mudah dan cepat!</p>
                </div>
                <Button onClick={togglePopUp} variant={"default"} className="hover:bg-secondary">
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <Form {...createClassroomForm}>
                <form className="flex w-full flex-col gap-6 pt-4">
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={createClassroomForm.control}
                      name="classroomName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomName">Nama Kelas</FormLabel>
                          <FormControl>
                            <Input id="classroomName" type="text" placeholder="Masukan Nama Kelas" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Nama Kelas.</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createClassroomForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomDescription">Deskripsi Kelas</FormLabel>
                          <FormControl>
                            <Textarea id="classroomDescription" placeholder="Masukan Deskripsi Kelas" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Deskripsi Kelas</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createClassroomForm.control}
                      name="classroomDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomDay">Jadwal Kelas</FormLabel>
                          <br />
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline">Pilih Jadwal Kelas</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56" align={"start"}>
                                <DropdownMenuLabel>Pilih Jadwal Kelas</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={field.value} onValueChange={(e) => field.onChange(e)}>
                                  <DropdownMenuRadioItem value="1">Senin</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="2">Selasa</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="3">Rabu</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="4">Kamis</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="5">Jum'at</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="6">Sabtu</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="7">Minggu</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                          <FormDescription className="text-xs">Pilih Jadwal Kelas</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full hover:bg-secondary"
                    onClick={createClassroomForm.handleSubmit(submitHandler)}
                    variant={"default"}
                  >
                    Buat Kelas
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

export default CreateClassroom;
