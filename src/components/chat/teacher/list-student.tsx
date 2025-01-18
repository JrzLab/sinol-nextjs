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
import { IStudent, IConversation } from "@/lib/types/Types";
import InputSearch from "@/components/search/input-search";

interface ListStudentProps {
  students: IStudent[];
  classroomId: string;
}

const ListStudent = ({ students, classroomId }: ListStudentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  if (!students) return null;

  const sortedData = students.map((student) => {
    return {
      ...student,
      messages: student.messages.content,
      lastMessageTime: student.messages.messageTemp,
    } as IConversation;
  });

  const searchResult = sortedData.filter((student) => student.user.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-4">
        <InputSearch onSearch={(e) => handleSearch(e)} />
      </CardContent>
      <Separator orientation="horizontal" />
      <ScrollArea scrollHideDelay={500} className="h-[460px]">
        <CardContent className="flex flex-col space-y-2 p-4">
          {searchResult && searchResult.length > 0 ? (
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
