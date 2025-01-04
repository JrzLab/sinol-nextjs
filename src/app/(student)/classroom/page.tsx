"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import SubjectCard from "@/components/subject/subject-card";
import { useState } from "react";
import { subjectStaticData } from "@/lib/staticData";
import FindSubject from "@/components/popup/find-subject";
import { useAuth } from "@/hooks/context/AuthProvider";
import CreateClassroom from "@/components/popup/create-classroom";

const StudentClassroom = () => {
  const { user, loading } = useAuth();
  const [ isOpen, setIsOpen ] = useState<Boolean>(false);
  const [ popUpCreate, setPopUpCreate ] = useState<Boolean>(false);
  

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  const togglePopUpCreate = () => {
    setPopUpCreate(!popUpCreate);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 space-y-2 p-4 pt-0">
        <Card className="flex w-full flex-col rounded-xl">
          <CardHeader className="mb-4">
            <h1 className="text-2xl font-bold">Halo {loading ? 'loading data...' : user?.username}</h1>
            <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
          </CardHeader>
          <CardFooter className="mt-4 gap-2">
            <Button onClick={() => togglePopUp()}>cari mata pelajaran</Button>
            <Button variant={'outline'} onClick={() => togglePopUpCreate()}>new class</Button>
            {isOpen ? <FindSubject status={() => togglePopUp()}></FindSubject> : null}
            {popUpCreate ? <CreateClassroom status={() => togglePopUpCreate()}></CreateClassroom> : null}
          </CardFooter>
        </Card>
        <div className="ml-1 space-y-2">
          <SubjectCard format data={subjectStaticData} />
        </div>
      </div>
    </>
  );
};

export default StudentClassroom;
