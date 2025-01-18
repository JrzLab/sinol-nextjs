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
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const CreateEventPopUp = ({ status, classUid }: { status: () => void; classUid: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePopUp = () => {
    status();
    setIsOpen(!isOpen);
  };
  const createEventForm = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      eventName: "",
      eventDescription: "",
      eventScore: 0,
      eventDueDate: new Date(),
    },
  });
  const submitHandler = async (values: z.infer<typeof createEventFormSchema>) => {
    setLoading(true);
    createEventFormSchema.parse(values);
    try {
      const reqBody = {
        title: values.eventName,
        description: values.eventDescription,
        maxScore: values.eventScore,
        dueDate: values.eventDueDate.toISOString(),
        uid: classUid,
      };
      toast.promise(createEventByUidClassUser(classUid, reqBody.title, reqBody.description, reqBody.dueDate, reqBody.maxScore), {
        loading: "Creating Event...",
        success: async (response) => {
          if (response?.code === 200 && response.success) {
            return response?.message;
          }
          throw new Error(response?.message);
        },
        error: (err) => {
          return err.message;
        },
        finally() {
          setLoading(false);
          status();
          window.location.reload();
        },
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      console.log(date.toISOString());
    }
  }
  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = createEventForm.getValues("eventDueDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    createEventForm.setValue("eventDueDate", newDate);
  }
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
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col">
                            <FormLabel>Tanggal Pengumpulan</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value ? format(field.value, "MM/dd/yyyy HH:mm") : <span>MM/DD/YYYY HH:mm</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <div className="sm:flex">
                                  <Calendar mode="single" selected={field.value} onSelect={handleDateSelect} initialFocus />
                                  <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                                    <ScrollArea className="w-64 sm:w-auto">
                                      <div className="flex p-2 sm:flex-col">
                                        {Array.from({ length: 24 }, (_, i) => i)
                                          .reverse()
                                          .map((hour) => (
                                            <Button
                                              key={hour}
                                              size="icon"
                                              variant={field.value && field.value.getHours() === hour ? "default" : "ghost"}
                                              className="aspect-square shrink-0 sm:w-full"
                                              onClick={() => handleTimeChange("hour", hour.toString())}
                                            >
                                              {hour}
                                            </Button>
                                          ))}
                                      </div>
                                      <ScrollBar orientation="horizontal" className="sm:hidden" />
                                    </ScrollArea>
                                    <ScrollArea className="w-64 sm:w-auto">
                                      <div className="flex p-2 sm:flex-col">
                                        {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                          <Button
                                            key={minute}
                                            size="icon"
                                            variant={field.value && field.value.getMinutes() === minute ? "default" : "ghost"}
                                            className="aspect-square shrink-0 sm:w-full"
                                            onClick={() => handleTimeChange("minute", minute.toString())}
                                          >
                                            {minute.toString().padStart(2, "0")}
                                          </Button>
                                        ))}
                                      </div>
                                      <ScrollBar orientation="horizontal" className="sm:hidden" />
                                    </ScrollArea>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <FormDescription className="text-xs"></FormDescription>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <Button
                    disabled={loading}
                    type="submit"
                    onClick={createEventForm.handleSubmit(submitHandler)}
                    className="hover:bg-secondary"
                    variant={"default"}
                  >
                    Buat Tugas
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
