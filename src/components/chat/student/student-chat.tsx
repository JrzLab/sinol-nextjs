"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { ChevronUp, ChevronDown, Send } from "lucide-react";
import React, { useState } from "react";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { ChatMessage, IGroupClassOwner } from "@/lib/types/Types";
import { UseWebSocketChat } from "@/hooks/websocket/use-websocket-chat";
import { getSocket } from "@/lib/socket";

interface IClassDataWS {
  idRoom: number;
  emailUser: string;
  teacherData: IGroupClassOwner;
}

const StudentChat = ({
  classDataWs,
  buttonGetChat,
  children,
}: {
  classDataWs: IClassDataWS;
  buttonGetChat: () => void;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChatHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const message = (new FormData(form)).get("text") as string;

    UseWebSocketChat(classDataWs.teacherData.email, classDataWs.emailUser, message, classDataWs.idRoom);
  
  };

  return (
    <>
      <div className="relative">
        <div
          className={`fixed bottom-0 right-0 h-[500px] w-full transition-all duration-700 md:w-[350px] lg:right-10 lg:w-[350px] ${
            isOpen ? "z-50 translate-y-0" : "z-10 translate-y-[443px]"
          }`}
        >
          <Card className="h-full w-full rounded-b-none text-foreground">
            <CardHeader
              className="flex flex-row items-center px-2 py-2"
              onClick={() => {
                buttonGetChat();
                openChatHandler();
              }}
            >
              <div className="flex flex-row items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${classDataWs.teacherData?.imageUrl}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <h1 className="text-black">{classDataWs.teacherData?.name}</h1>
                  {/* <div className="inline-flex items-center">
                    <div className={`mr-1 h-2 w-2 rounded-full ${status == "online" ? "bg-green-700" : "bg-gray-500"}`} />
                    <span className="text-xs">{toPascalCase(status)}</span>
                  </div> */}
                </div>
              </div>
              <div className="ml-auto">{isOpen ? <ChevronDown /> : <ChevronUp />}</div>
            </CardHeader>
            <Separator />
            <ScrollArea scrollHideDelay={800} className="h-3/4">
              <CardContent className="flex flex-col space-y-3 px-4 pt-4">{children}</CardContent>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <Separator />
            <form onSubmit={handleInputChat}>
              <CardFooter className="flex flex-row gap-2 px-4 pt-3">
                <Input type="text" name="text" className="w-full" placeholder="Ketik Pesan" />
                <Button type="submit" size="default" variant="default" className="hover:bg-secondary">
                  <Send />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentChat;
