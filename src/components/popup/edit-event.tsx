//IMPORT REACT/NEXT JS
import { format } from "date-fns";

//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

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
