"use client";

import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";

const OpenClassUsersButton = ({ classroomId }: { classroomId: string }) => {
  const router = useRouter();
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push(`/teacher/${classroomId}/users`)}
              className="bg-green-400 hover:bg-green-300"
              size={"icon"}
              variant={"outline"}
            >
              <Users />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#FFFDF6] text-foreground">
            <p>Lihat Pelajar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default OpenClassUsersButton;
