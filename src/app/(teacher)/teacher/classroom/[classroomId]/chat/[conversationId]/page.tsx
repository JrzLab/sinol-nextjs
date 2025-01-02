import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IMessage, IStudent } from "@/lib/types/Types";
import ChatRoom from "@/components/chat/teacher/chat-room";
import { studentStaticData, subjectStaticData } from "@/lib/staticData";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import MobileChatRoom from "@/components/chat/teacher/mobile-chat-room";
import BubbleChat from "@/components/chat/bubble-chat";
import { sortStudentsByLastMessage } from "@/lib/functions";

const ConversationBox = async ({ params }: { params: { conversationId: string } }) => {
  const { conversationId } = await params;
  const sortedData = studentStaticData.filter((student) => student.id === parseInt(conversationId));
  const getStudentData = studentStaticData.find((student) => student.id === parseInt(conversationId)) as IStudent;
  const conversations = sortedData.find((student) => student.id === parseInt(conversationId));
  const messages = conversations?.messages as IMessage[];
  const sortedMessages = sortStudentsByLastMessage(messages, "latest") as IMessage[];
  return (
    <>
      {/* MOBILE VIEW */}
      <div className="relative md:hidden">
        <MobileChatRoom>
          {sortedMessages.map((message: IMessage, index) => {
            return (
              <div key={index}>
                <BubbleChat time={message.time} chatRoomType={"teacher"} userType={message.userType} message={message.content} />
              </div>
            );
          })}
        </MobileChatRoom>
      </div>
      {/* DESKTOP VIEW */}
      <div className="hidden flex-col gap-0 md:flex">
        <div>
          <CardHeader className="flex flex-row items-center justify-end p-2">
            <Button variant="ghost" size="default">
              <LogOut />
            </Button>
          </CardHeader>
          <Separator orientation="horizontal" />
        </div>
        <div>
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
        </div>
        <div>
          <ChatRoom>
            {sortedMessages.map((message: IMessage, index) => {
              return (
                <div key={index}>
                  <BubbleChat time={message.time} chatRoomType={"teacher"} userType={message.userType} message={message.content} />
                </div>
              );
            })}
          </ChatRoom>
        </div>
        <div className="">
          <Separator orientation="horizontal" />
          <CardFooter className="flex flex-col space-y-2 py-5">
            <Textarea placeholder="Tulis Pesan Kamu Disini" className="resize-y" />
            <Button variant="default" className="w-full justify-items-end hover:bg-secondary" size="default">
              Kirim
            </Button>
          </CardFooter>
        </div>
      </div>
    </>
  );
};

export default ConversationBox;
