"use client";

//IMPORT REACT & NEXTJS HOOK
import { useState } from "react";

//IMPORT SHADCN COMPONENTS
import { CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

//IMPORT COMPONENTS
import UserChatCard from "./user-chat-card";

//IMPORT TYPES
import { IStudent, IConversation, IMessage } from "@/lib/types/Types";
import InputSearch from "@/components/search/input-search";

//IMPORT FUNCTIONS
import { sortStudentsByLastMessage } from "@/lib/functions";

interface ListStudentProps {
  students: IStudent[];
  classroomId: string;
}

const ListStudent = ({ students, classroomId }: ListStudentProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sortedData = students.map((student) => {
    const sortedMessages = sortStudentsByLastMessage(student.messages, "latest") as IMessage[];
    const lastMessageTime = sortedMessages.length > 0 ? sortedMessages[0].time : "No message";
    return {
      ...student,
      messages: sortedMessages.length > 0 ? sortedMessages[0].content : "No message",
      lastMessageTime,
    } as IConversation;
  });

  const searchResult = sortedData.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-4">
        <InputSearch onSearch={(e) => handleSearch(e)} />
      </CardContent>
      <Separator orientation="horizontal" />
      <ScrollArea scrollHideDelay={500} className="h-screen">
        <CardContent className="flex flex-col space-y-2 p-4">
          {searchResult.length > 0 ? (
            <>
              {searchResult.map((student) => (
                <UserChatCard key={student.id} classroomId={classroomId} student={student} />
              ))}
            </>
          ) : (
            <>
              <CardDescription className="text-center">Pencarian Tidak Ditemukan</CardDescription>
            </>
          )}
          <ScrollBar orientation="vertical" />
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ListStudent;
