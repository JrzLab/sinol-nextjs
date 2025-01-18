"use client";

import { MessageCircleQuestion } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";

const OpenTeacherChatButton = ({ classroomId }: { classroomId: string }) => {
  const router = useRouter();
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push(`/teacher/${classroomId}/chat`)}
              className="bg-green-400 hover:bg-green-300"
              size={"icon"}
              variant={"outline"}
            >
              <MessageCircleQuestion />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#FFFDF6] text-foreground">
            <p>Buka Diskusi</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

const OpenStudentChatButton = () => {};

export { OpenTeacherChatButton, OpenStudentChatButton };
