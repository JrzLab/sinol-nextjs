"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IHistoryMessage, IMessage } from "@/lib/types/Types";
import ChatRoom from "@/components/chat/teacher/chat-room";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import MobileChatRoom from "@/components/chat/teacher/mobile-chat-room";
import BubbleChat from "@/components/chat/bubble-chat";
import { useAuth } from "@/hooks/context/AuthProvider";

const ConversationBox = () => {
  const { user } = useAuth();
  const conversationId = useParams().conversationId as string;
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
      const dataFetch = await fetch(
        `${wsUrl?.includes("localhost") ? wsUrl.replace("3001", "3002") : wsUrl?.replace("10073", "10059")}/websocket/chat/admin/history-chat/${conversationId}`,
        {
          method: "GET",
        },
      );
      const dataJson: IHistoryMessage = await dataFetch.json();
      setMessages(dataJson.data.historyData);
    };

    fetchData();
  }, [conversationId, setMessages]);

  const getStudentData = {
    name: messages.find((message) => message.userEmail !== user?.email)?.user,
    email: messages.find((message) => message.userEmail !== user?.email)?.userEmail,
    imageUrl: messages.find((message) => message.userEmail !== user?.email)?.imageUrl,
  };

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="relative md:hidden">
        <MobileChatRoom>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <BubbleChat position={message.userEmail === user?.email ? "sender" : "receiver"} chatRoomType={"student"}>
                  {message.content}
                </BubbleChat>
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
              <AvatarImage src={getStudentData.imageUrl} alt="@shadcn" />
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
            {messages.map((message, index) => {
              return (
                <div key={index}>
                  <BubbleChat position={message.userEmail === user?.email ? "sender" : "receiver"} chatRoomType={"teacher"}>
                    {message.content}
                  </BubbleChat>
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
