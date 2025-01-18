//IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "../ui/card";

//IMPORT VALIDATION DEPEDENCIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//IMPORT CLASSROOM FORM SCHEMA
import { editClassroomFormSchema } from "@/lib/form-validation-schema";

//IMPORT INTERFACE
import { IGroupClass } from "@/lib/types/Types";

//IMPORT LUCIDE ICON
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { updateClassByUidClassUser } from "@/app/actions/api-actions";

interface IEditClassroomAlert {
  open: boolean;
  data: IGroupClass;
  dialogHandler: () => void;
}

const EditClassroomDetail = ({ open, data, dialogHandler }: IEditClassroomAlert) => {
  const editClassroomForm = useForm<z.infer<typeof editClassroomFormSchema>>({
    resolver: zodResolver(editClassroomFormSchema),
    defaultValues: {
      classroomName: data?.className,
      description: data?.description,
      classroomDay: data?.day.toString(),
    },
  });

  const submitHandler = (values: z.infer<typeof editClassroomFormSchema>) => {
    try {
      let classroomDay;
      switch (values.classroomDay) {
        case "Senin":
          classroomDay = "1";
          break;
        case "Selasa":
          classroomDay = "2";
          break;
        case "Rabu":
          classroomDay = "3";
          break;
        case "Kamis":
          classroomDay = "4";
          break;
        case "Jumat":
          classroomDay = "5";
          break;
        case "Sabtu":
          classroomDay = "6";
          break;
        case "Minggu":
          classroomDay = "7";
          break;
      }
      toast.promise(updateClassByUidClassUser(data.uid, values.classroomName, values.description, data?.ownerData.email, classroomDay!), {
        loading: "Mengubah Kelas...",
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
      {open && (
        <div className="fixed left-0 top-0 z-40 flex h-screen w-full items-center justify-center bg-foreground/50 px-6">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <div className="flex justify-between gap-1">
                <div>
                  <h1 className="text-lg font-bold">Ubah Detail Kelas</h1>
                  <p className="text-sm">Ubah detail kelas yang telah dibuat</p>
                </div>
                <Button onClick={() => dialogHandler()} variant={"default"} className="hover:bg-secondary">
                  <X />
                </Button>
              </div>
            </CardHeader>
            <hr />
            <CardContent>
              <Form {...editClassroomForm}>
                <form className="flex w-full flex-col gap-6 pt-4">
                  <div className="flex w-full flex-col gap-2">
                    <FormField
                      control={editClassroomForm.control}
                      name="classroomName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomName">Nama Kelas</FormLabel>
                          <FormControl>
                            <Input
                              id="classroomName"
                              type="text"
                              placeholder="Masukan Nama Kelas"
                              value={field.value}
                              onChange={(e) => editClassroomForm.setValue("classroomName", e.target.value)}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Nama Kelas.</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editClassroomForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomDescription">Deskripsi Kelas</FormLabel>
                          <FormControl>
                            <Input
                              id="classroomDescription"
                              type="text"
                              placeholder="Masukan Deskripsi"
                              value={field.value}
                              onChange={(e) => editClassroomForm.setValue("description", e.target.value)}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">Masukan Deskripsi Kelas</FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editClassroomForm.control}
                      name="classroomDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="classroomDay">Jadwal Kelas</FormLabel>
                          <br />
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline">{field.value !== undefined ? field.value : "Pilih Jadwal Kelas"}</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56" align={"start"}>
                                <DropdownMenuLabel>Pilih Jadwal Kelas</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={field.value} onValueChange={(e) => field.onChange(e)}>
                                  <DropdownMenuRadioItem value="Senin">Senin</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Selasa">Selasa</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Rabu">Rabu</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Kamis">Kamis</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Jumat">Jumat</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Sabtu">Sabtu</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Minggu">Minggu</DropdownMenuRadioItem>
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
                    onClick={editClassroomForm.handleSubmit(submitHandler)}
                    variant={"default"}
                  >
                    Ubah Detail Kelas
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

export default EditClassroomDetail;
