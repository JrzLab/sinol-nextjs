import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
interface IGeneralAlert {
  open: boolean;
  handler?: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const GeneralAlert = ({ open, title, description, children }: IGeneralAlert) => {
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {children}
            {/* <AlertDialogCancel onClick={() => handler()}>{}</AlertDialogCancel>
            <AlertDialogAction onClick={() => handler()}>Hapus</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GeneralAlert;
