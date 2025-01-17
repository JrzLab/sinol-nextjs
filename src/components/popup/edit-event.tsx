//IMPORT REACT/NEXT JS
import { format } from "date-fns";

//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT CLASSROOM FORM SCHEMA
import { createEventFormSchema } from "@/lib/form-validation-schema";

//IMPORT INTERFACE
import { IEvent } from "@/lib/types/Types";

//IMPORT LUCIDE ICON
import { CalendarIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { editEventByUidClassUser } from "@/app/actions/api-actions";
import { toast } from "sonner";

interface IEditEventDetail {
  open: boolean;
  eventData: IEvent;
  dialogHandler: () => void;
  eventId: number;
}

const EditEventDetail = ({ eventId, open, eventData, dialogHandler }: IEditEventDetail) => {
  const editEventForm = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      eventName: eventData.title,
      eventDescription: eventData.description,
      eventDueDate: new Date(eventData.dueDateAt),
      eventScore: eventData.maxScore,
    },
  });

  const submitHandler = async (values: z.infer<typeof createEventFormSchema>) => {
    try {
      const reqBody = {
        title: values.eventName,
        description: values.eventDescription,
        maxScore: values.eventScore,
        dueDate: values.eventDueDate.toISOString(),
        id: eventId.toString(),
      };
      toast.promise(editEventByUidClassUser(reqBody.id, reqBody.title, reqBody.description, reqBody.dueDate, reqBody.maxScore), {
        loading: "Mengubah tugas...",
        success: async (response) => {
          if (response?.code === 200 && response?.success) {
            return response.message;
          }
          throw new Error(response?.message);
        },
        error: (err) => {
          return err.message;
        },
        finally: () => {
          window.location.reload();
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      console.log(date.toISOString());
    }
  }
  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = editEventForm.getValues("eventDueDate") || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    editEventForm.setValue("eventDueDate", newDate);
  }
  return (
    <>
      <Dialog onOpenChange={() => dialogHandler()} open={open}>
        <Form {...editEventForm}>
          <form action="">
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Ubah Detail Tugas</DialogTitle>
                <DialogDescription className="text-sm">Buat perubahan pada tugas Anda di sini. Klik simpan setelah Anda selesai.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-rows-2 gap-1 py-4">
                <FormField
                  control={editEventForm.control}
                  name="eventName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="eventName">Nama Tugas</FormLabel>
                        <FormControl>
                          <Input
                            id="eventName"
                            type="text"
                            value={field.value}
                            onChange={(e) => editEventForm.setValue("eventName", e.target.value)}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">Ubah nama tugas.</FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={editEventForm.control}
                  name="eventDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="eventDescription">Deskripsi Tugas</FormLabel>
                      <br />
                      <FormControl>
                        <Textarea
                          id="eventDescription"
                          value={field.value}
                          onChange={(e) => editEventForm.setValue("eventDescription", e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>Ubah deskripsi tugas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editEventForm.control}
                  name="eventScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="eventScore">Maksimal Nilai Tugas</FormLabel>
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
                <FormField
                  control={editEventForm.control}
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
              <DialogFooter>
                <Button type="submit" onClick={editEventForm.handleSubmit(submitHandler)}>
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

export default EditEventDetail;
