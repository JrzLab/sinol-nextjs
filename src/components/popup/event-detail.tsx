"use client";

import { IEvent, IGroupClass } from "@/lib/types/Types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import GeneralAlert from "../popup/general-alert";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/context/AuthProvider";
import EditEventDetail from "./edit-event";
import { deleteEventByUidClassUser } from "@/app/actions/api-actions";

const EventDetail = ({ event, subject }: { event: IEvent; subject: IGroupClass }) => {
  const { user } = useAuth();
  const [isOutOpen, setIsOutOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const deleteHandler = async () => {
    await deleteEventByUidClassUser(event.id.toString()).then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover:bg-secondary" variant={"default"}>
            Detail
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Detail Tugas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log(event)}>Lihat Tugas</DropdownMenuItem>
          {subject && subject.ownerData.email === user?.email ? (
            <>
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>Edit Tugas</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOutOpen(true)}>Hapus Tugas</DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      <GeneralAlert open={isOutOpen} title="Apakah Anda Yakin?" description="Tindakan ini tidak dapat diurungkan">
        <AlertDialogCancel onClick={() => setIsOutOpen(false)}>Batal</AlertDialogCancel>
        <AlertDialogAction onClick={() => deleteHandler()}>Hapus</AlertDialogAction>
      </GeneralAlert>
      <EditEventDetail eventId={event.id} open={isEditOpen} eventData={event} dialogHandler={() => setIsEditOpen(false)} />
    </>
  );
};

export default EventDetail;
