"use client";

// import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, X } from "lucide-react";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT VALIDATION SCHEMA
import { createEventFormSchema } from "@/lib/form-validation-schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { format } from "date-fns";
import { createEventByUidClassUser } from "@/app/actions/api-actions";
const CreateEventPopUp = ({ status, classUid }: { status: () => void; classUid: string }) => {
  // interface IFile {
  //   id: number;
  //   name: string;
  //   ext: string;
  // }

  const [isOpen, setIsOpen] = useState(true);
  // const [file, setFile] = useState<IFile[]>([]);

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };
  const createEventForm = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      eventName: "",
      eventDescription: "",
      eventScore: 0, //Tidak Dinilai
      eventDueDate: new Date(),
    },
  });
  const submitHandler = async (values: z.infer<typeof createEventFormSchema>) => {
    createEventFormSchema.parse(values);
    try {
      const reqBody = {
        title: values.eventName,
        description: values.eventDescription,
        maxScore: values.eventScore,
        dueDate: values.eventDueDate.toISOString(),
        uid: classUid,
      };
      console.log(reqBody);

      const data = await createEventByUidClassUser(classUid, reqBody.title, reqBody.description, reqBody.dueDate, reqBody.maxScore);
      if (data?.success && data?.code === 200) {
        console.log("Tugas berhasil dibuat");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50 px-4">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-lg font-bold">Buat Tugas</h1>
                  <p className="text-sm">Buat tugas baru untuk siswa Anda dengan mudah.</p>
                </div>
                <Button onClick={togglePopUp} variant={"default"} className="hover:bg-secondary">
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <Form {...createEventForm}>
                <form className="flex w-full flex-col gap-6 pt-4">
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={createEventForm.control}
                      name="eventName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="eventName">Nama Tugas</FormLabel>
                          <FormControl>
                            <Input id="eventName" type="text" placeholder="Masukan Nama Tugas" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Nama Tugas.</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={createEventForm.control}
                      name="eventDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="eventDescription">Deskripsi Tugas</FormLabel>
                          <FormControl>
                            <Textarea id="eventDescription" placeholder="Masukan Deskripsi Tugas" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Deskripsi Tugas.</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={createEventForm.control}
                      name="eventScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="eventScore">Nilai Tugas</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              id="eventScore"
                              placeholder="Masukan Nilai Tugas"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Nilai Tugas.</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={createEventForm.control}
                      name="eventDueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tanggal Pengumpulan</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn("w-[160px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                >
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  {field.value ? format(field.value, "dd MMMM yyyy") : <span>Pilih Tanggal</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                            </PopoverContent>
                          </Popover>
                          <FormDescription className="text-xs"></FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" onClick={createEventForm.handleSubmit(submitHandler)} className="hover:bg-secondary" variant={"default"}>
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

export default CreateEventPopUp;
