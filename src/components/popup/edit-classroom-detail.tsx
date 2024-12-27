//IMPORT REACT/NEXT JS
import { format } from "date-fns";

//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { ScrollBar, ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT CLASSROOM FORM SCHEMA
import { classroomFormSchema } from "@/lib/form-validation-schema";

//IMPORT INTERFACE
import { ISubject } from "@/lib/types/Types";

//IMPORT LUCIDE ICON
import { CalendarIcon, Clock } from "lucide-react";

interface IDeleteClassroomAlert {
  open: boolean;
  data: ISubject;
  dialogHandler: () => void;
}

const EditClassroomDetail = ({ open, data, dialogHandler }: IDeleteClassroomAlert) => {
  const getTimes: Date = new Date(data.date);

  const editClassroomForm = useForm<z.infer<typeof classroomFormSchema>>({
    resolver: zodResolver(classroomFormSchema),
    defaultValues: {
      classroomName: data.title,
      date: data.date,
      time: getTimes,
    },
  });

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = editClassroomForm.getValues("date");
    const newDate = new Date(currentDate);

    if (type == "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type == "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }
    editClassroomForm.setValue("time", newDate);
  };

  const submitHandler = (values: z.infer<typeof classroomFormSchema>) => {
    try {
      classroomFormSchema.parse(values);
      console.log({ message: "Form is valid", value: values });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Dialog onOpenChange={() => dialogHandler()} open={open}>
        <Form {...editClassroomForm}>
          <form action="">
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Ubah Detail Jadwal</DialogTitle>
                <DialogDescription className="text-sm">Buat perubahan pada jadwal Anda di sini. Klik simpan setelah Anda selesai.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-rows-2 gap-1 py-4">
                <FormField
                  control={editClassroomForm.control}
                  name="classroomName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="classroomName">Nama Jadwal</FormLabel>
                        <FormControl>
                          <Input
                            id="classroomName"
                            type="text"
                            value={field.value}
                            onChange={(e) => editClassroomForm.setValue("classroomName", e.target.value)}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">Ubah nama jadwal.</FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    );
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={editClassroomForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="date">Tanggal Jadwal</FormLabel>
                        <br />
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                <CalendarIcon />
                                {field.value ? format(field.value, "dd MMMM yyyy") : <span>Pilih tanggal jadwal</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Card className="">
                                <div className="w-64 sm:flex">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      editClassroomForm.setValue("date", date?.getDay() ? date : new Date());
                                    }}
                                    initialFocus
                                  />
                                </div>
                              </Card>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormDescription>Silahkan pilih tanggal jadwal yang baru.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editClassroomForm.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="date">Jam Jadwal</FormLabel>
                        <br />
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                <Clock />
                                {field.value ? format(field.value, "HH:mm") : <span>Pilih tanggal jadwal</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Card className="sm:flex">
                                <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                                  <ScrollArea className="w-64 sm:w-auto">
                                    <div className="flex p-2 sm:flex-col">
                                      {Array.from({ length: 24 }, (_, i) => i)
                                        .reverse()
                                        .map((hour) => {
                                          return (
                                            <Button
                                              key={hour}
                                              size="icon"
                                              variant={"ghost"}
                                              className="aspect-square shrink-0 sm:w-full"
                                              onClick={() => handleTimeChange("hour", hour.toString())}
                                            >
                                              {hour}
                                            </Button>
                                          );
                                        })}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                  </ScrollArea>
                                  <ScrollArea className="w-64 sm:w-auto">
                                    <div className="flex p-2 sm:flex-col">
                                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                        <Button
                                          key={minute}
                                          size="icon"
                                          variant={"ghost"}
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
                              </Card>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormDescription>Silahkan pilih jam jadwal.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={editClassroomForm.handleSubmit(submitHandler)}>
                  Simpan Perubahan
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </>
  );
};

export default EditClassroomDetail;
