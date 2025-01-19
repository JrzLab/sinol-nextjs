"use client";

import { CardHeader, CardFooter, Card, CardContent } from "@/components/ui/card";
import { ScrollBar } from "@/components/ui/scroll-area";
import { toPascalCase } from "@/lib/functions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MobileChatRoomProps {
  data: { name: string; email: string; imageUrl: string };
  children: React.ReactNode;
}

const MobileChatRoom = ({ data, children }: MobileChatRoomProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChatHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="relative">
        <div
          className={`fixed bottom-0 right-0 h-[500px] w-full transition-all duration-700 md:w-[350px] lg:right-10 lg:w-[350px] ${
            isOpen ? "z-50 translate-y-0" : "z-10 translate-y-[443px]"
          }`}
        >
          <Card className="h-full w-full rounded-b-none">
            <CardHeader className="flex flex-row items-center px-2 py-2" onClick={() => openChatHandler()}>
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${data?.imageUrl}`} alt={data?.imageUrl!} />
                <AvatarFallback>
                  {data?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h1 className="text-black">{data?.name}</h1>
                <div className="inline-flex items-center">
                  <p className="text-xs text-gray-500">{data?.email}</p>
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
            <CardFooter className="flex flex-row gap-2 px-4 pt-3">
              <Input type="text" className="w-full" placeholder="Ketik Pesan" />
              <Button size="default" variant="default">
                <Send />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MobileChatRoom;
