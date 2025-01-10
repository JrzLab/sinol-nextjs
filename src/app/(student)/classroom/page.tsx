"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import FindSubject from "@/components/popup/find-subject";
import CreateClassroom from "@/components/popup/create-classroom";
import SubjectCard from "@/components/subject/subject-card";
import { subjectStaticData } from "@/lib/staticData";
import { useAuth } from "@/hooks/context/AuthProvider";
import Image from "next/image";
import EducationNotFound from "../../../../public/education-404.svg";

const StudentClassroom = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  const modeNoData = false;

  return (
    <>
      {modeNoData ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 space-y-2 p-4 pt-0">
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <Image src={EducationNotFound} alt="not found" className="h-48 w-48 opacity-50" />
            <h2 className="text-2xl font-semibold text-gray-600">Classroom Not Found</h2>
            <p className="text-gray-500">You haven't joined any classroom yet.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4 space-y-2 p-4 pt-0">
          <Card className="flex w-full flex-col rounded-xl text-foreground">
            <CardHeader>
              <h1 className="text-2xl font-bold">{loading ? "loading data..." : `Halo ${user?.username}`}</h1>
              <p className="mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => togglePopUp()} variant={"default"} className="hover:bg-secondary">
                Cari Jadwal
              </Button>
            </CardFooter>
          </Card>
          <div className="ml-1 space-y-2">
            <SubjectCard format data={subjectStaticData} />
          </div>
          {isOpen ? <FindSubject status={() => togglePopUp()}></FindSubject> : null}
        </div>
      )}
    </>
  );
};

export default StudentClassroom;
