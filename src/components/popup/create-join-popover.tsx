"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PlusCircle, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import CreateClassroom from "./create-classroom";
import JoinClassroom from "./join-classroom";
import { usePathname } from "next/navigation";

const CreateJoinPopover = () => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const [popUpCreate, setPopUpCreate] = useState<boolean>(false);
  const [popUpJoin, setPopUpJoin] = useState<boolean>(false);
  return (
    <>
      {isMainPage && (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="mr-2 hover:bg-secondary" variant={"outline"} size={"icon"}>
              <PlusCircle />
            </Button>
          </PopoverTrigger>
          <PopoverContent align={"end"} className="w-[200px] p-4">
            <Button onClick={() => setPopUpCreate(true)} className="w-full hover:bg-secondary" variant={"default"} size={"default"}>
              <div className="flex items-center gap-2">
                <PlusCircle />
                <span>Buat Kelas</span>
              </div>
            </Button>
            <Button onClick={() => setPopUpJoin(true)} className="mt-2 w-full hover:bg-secondary" variant={"default"} size={"default"}>
              <div className="flex items-center gap-2">
                <UserPlus />
                <span>Gabung Kelas</span>
              </div>
            </Button>
          </PopoverContent>
        </Popover>
      )}
      <CreateClassroom isOpen={popUpCreate} status={() => setPopUpCreate(false)} />
      <JoinClassroom isOpen={popUpJoin} status={() => setPopUpJoin(false)} />
    </>
  );
};

export default CreateJoinPopover;
