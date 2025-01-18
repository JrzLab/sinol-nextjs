"use client";

import { SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import EditClassroomDetail from "../popup/edit-classroom-detail";
import { useState } from "react";
import { IGroupClass } from "@/lib/types/Types";

const EditClassButton = ({ classData }: { classData: IGroupClass }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"icon"} variant={"default"} className="hover:bg-secondary" onClick={() => setOpenEdit(true)}>
              <SquarePen />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#FFFDF6] text-foreground">
            <p>Ubah Detail Kelas</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {<EditClassroomDetail open={openEdit} data={classData} dialogHandler={() => setOpenEdit(false)} />}
    </>
  );
};

export default EditClassButton;
