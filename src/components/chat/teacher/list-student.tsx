"use client";

import { useState } from "react";
import InputSearch from "@/components/search/input-search";
import SearchResult from "@/components/search/search-result";
import { CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IStudent } from "@/lib/types/Types";

const ListStudent = ({ students, classroomId }: { students: IStudent[]; classroomId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-4">
        <InputSearch onSearch={(e) => handleSearch(e)} />
      </CardContent>
      <Separator orientation="horizontal" />
      <ScrollArea scrollHideDelay={500}>
        <CardContent className="flex h-screen flex-col space-y-2 p-4">
          <SearchResult classroomId={classroomId} students={students} query={searchQuery} />
          <ScrollBar orientation="vertical" />
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ListStudent;
