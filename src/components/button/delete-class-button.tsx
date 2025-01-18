"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import DeleteClassroomAlert from "../popup/delete-classroom-alert";

const DeleteClassButton = ({ open }: { open: boolean }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"destructive"}>
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#FFFDF6] text-foreground">
            <p>Keluar Kelas</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {<DeleteClassroomAlert open={openDelete} dialogHandler={() => setOpenDelete(false)} />}
    </>
  );
};

export default DeleteClassButton;
