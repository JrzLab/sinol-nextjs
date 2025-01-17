import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
              Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus kelas Anda secara permanen.
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
