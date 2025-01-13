"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import FindSubject from "../popup/find-subject";
import { Card, CardHeader, CardFooter } from "../ui/card";
import { useAuth } from "@/hooks/context/AuthProvider";
import { IGroupClass } from "@/lib/types/Types";

const SearchSubjectButton = ({ subjectData }: { subjectData: IGroupClass[] }) => {
  const { loading, user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Card className="flex w-full flex-col rounded-xl text-foreground">
        <CardHeader>
          <h1 className="text-2xl font-bold">{loading ? "loading data..." : `Halo ${user?.username}`}</h1>
          <p className="mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => setIsOpen(true)} variant={"default"} className="hover:bg-secondary">
            Cari Jadwal
          </Button>
        </CardFooter>
      </Card>
      {isOpen && <FindSubject status={() => setIsOpen(false)} subjectData={subjectData} />}
    </>
  );
};

export default SearchSubjectButton;
