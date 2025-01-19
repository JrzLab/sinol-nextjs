"use client";

import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChatHistoryData, ChatMessage } from "@/lib/types/Types";
import ChatRoom from "@/components/chat/teacher/chat-room";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import MobileChatRoom from "@/components/chat/teacher/mobile-chat-room";
import BubbleChat from "@/components/chat/bubble-chat";
import { useAuth } from "@/hooks/context/AuthProvider";
import { UseWebSocketChat } from "@/hooks/websocket/use-websocket-chat";
import { getSocket } from "@/lib/socket";

const ConversationBox = () => {
  const { user } = useAuth();
  const isListenerAdded = useRef(false);
  const conversationId = useParams().conversationId as string;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [dataReciver, setDataReciver] = useState<{ name: string; email: string; imageUrl: string }>();

  useEffect(() => {
    if (!isListenerAdded.current) {
      getSocket()?.on("updateMessageClient", (data: ChatMessage) => {
        setMessages((prev) => [...prev, data]);
      });
      isListenerAdded.current = true;
    }
  }, [isListenerAdded]);

  useEffect(() => {
    const fetchData = async () => {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
      const dataFetch = await fetch(`${wsUrl?.includes("localhost") ? wsUrl.replace("3001", "3002") : wsUrl?.replace("10073", "10059")}/websocket/chat/admin/history-chat/${conversationId}`,
        {
          method: "GET",
        },
      );
      const dataJson: { code: number; success: boolean; message: string; data: { historyData: ChatHistoryData[] } } = await dataFetch.json();
      setDataReciver({
        name: `${dataJson.data.historyData[0].userB.firstName}${dataJson.data.historyData[0].userB.lastName ? ` ${dataJson.data.historyData[0].userB.firstName}` : ""}`,
        email: dataJson.data.historyData[0].userB.email,
        imageUrl: `${wsUrl?.includes("localhost") ? wsUrl.replace("3001", "3002") : wsUrl?.replace("10073", "10059")}${dataJson.data.historyData[0].userB.imageUrl}`, 
      });
      setMessages(dataJson.data.historyData[0].messages);
    };

    fetchData();
  }, [conversationId, setMessages, setDataReciver]);

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = new FormData(e.currentTarget).get("message") as string;

    if (dataReciver?.email && user?.email) {
      UseWebSocketChat(dataReciver.email, user.email, message, Number(conversationId));
    }
  };

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="relative md:hidden">
        <MobileChatRoom email={dataReciver?.email} username={dataReciver?.name} image={dataReciver?.imageUrl}>
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <BubbleChat position={message.sender.email === user?.email ? "sender" : "receiver"} chatRoomType={"student"}>
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
          {dataReciver && (
            <CardHeader className="flex flex-row items-center justify-start py-[13px]">
              <Avatar className="mr-2">
                <AvatarImage src={dataReciver!.imageUrl} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <CardTitle>{dataReciver!.name}</CardTitle>
                <CardDescription>{dataReciver!.email}</CardDescription>
              </div>
            </CardHeader>
          )}
          <Separator orientation="horizontal" />
        </div>
        <div>
          <ChatRoom>
            {messages.map((message, index) => {
              return (
                <div key={index}>
                  <BubbleChat position={message.sender.email === user?.email ? "sender" : "receiver"} chatRoomType={"teacher"}>
                    {message.content}
                  </BubbleChat>
                </div>
              );
            })}
          </ChatRoom>
        </div>
        <div className="">
          <Separator orientation="horizontal" />
          <form onSubmit={handleSubmitMessage}>
            <CardFooter className="flex flex-col space-y-2 py-5">
              <Textarea id="message" name="message" placeholder="Tulis Pesan Kamu Disini" className="resize-y" />
              <Button type="submit" variant="default" className="w-full justify-items-end hover:bg-secondary" size="default">
                Kirim
              </Button>
            </CardFooter>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConversationBox;
