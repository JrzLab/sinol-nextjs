import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
interface IDeleteClassroomAlert {
  open: boolean;
  dialogHandler: () => void;
}

const DeleteClassroomAlert = ({ open, dialogHandler }: IDeleteClassroomAlert) => {
  return (
    <>
      <AlertDialog onOpenChange={() => dialogHandler()} open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus jadwal Anda secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => dialogHandler()}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={() => dialogHandler()}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteClassroomAlert;
