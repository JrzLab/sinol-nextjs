import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
interface IDeleteClassroomAlert {
  open: boolean;
  dialogHandler: () => void;
}

const EditClassroomDetail = ({ open, dialogHandler }: IDeleteClassroomAlert) => {
  return (
    <>
      <Dialog onOpenChange={() => dialogHandler()} open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">s</div>
          </div>
          <DialogFooter>
            <Button onClick={() => dialogHandler()}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditClassroomDetail;
