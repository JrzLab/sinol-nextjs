import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IStudent } from "@/lib/types/Types";
import ChatRoom from "@/components/chat/teacher/chat-room";
import { studentStaticData } from "@/lib/staticData";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ConversationBox = async ({ params }: { params: { conversationId: string } }) => {
  const { conversationId } = await params;
  const sortedData = studentStaticData.filter((student) => student.id === parseInt(conversationId));
  const getStudentData = studentStaticData.find((student) => student.id === parseInt(conversationId)) as IStudent;
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-end py-5">
        <Button variant="ghost" size="default">
          <LogOut />
        </Button>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardHeader className="flex flex-row items-center justify-start py-[13px]">
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <CardTitle>{getStudentData.name}</CardTitle>
          <CardDescription>{getStudentData.email}</CardDescription>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <ScrollArea scrollHideDelay={800} className="h-full">
        <ChatRoom conversationId={conversationId} students={sortedData} />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </>
  );
};

export default ConversationBox;
