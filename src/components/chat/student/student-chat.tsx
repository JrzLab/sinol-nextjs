"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { ChevronUp, ChevronDown, Send } from "lucide-react";
import React, { useState } from "react";
import { toPascalCase } from "@/lib/functions";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { ISubject } from "@/lib/types/Types";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Button } from "../../ui/button";

const StudentChat = ({ status, data, children }: { status: string; data: ISubject; children: React.ReactNode }) => {
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
              <div className="flex flex-row items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <h1 className="text-black">{data.teacher}</h1>
                  <div className="inline-flex items-center">
                    <div className={`mr-1 h-2 w-2 rounded-full ${status == "online" ? "bg-green-700" : "bg-gray-500"}`} />
                    <span className="text-xs">{toPascalCase(status)}</span>
                  </div>
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
              <Button size="default" variant="default" className="hover:bg-secondary">
                <Send />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentChat;
