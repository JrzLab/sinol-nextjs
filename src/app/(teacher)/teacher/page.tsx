import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getGreeting } from "@/lib/functions";
import { subjectStaticData } from "@/lib/staticData";
import Link from "next/link";
import React from "react";
import ClassroomSchedule from "@/components/table/classroom-schedule";

const TeacherPage = () => {
  const cardData = [
    {
      title: "Total Subject",
      description: "Total Subject You Get",
      total: 20,
    },
    {
      title: "Attendance",
      description: "Submitted Attendance",
      total: 20,
    },
    {
      title: "Assignment",
      description: "Submitted Assignment",
      total: 20,
    },
    {
      title: "Rank Table",
      description: "Rank Of All User",
      total: 20,
    },
  ];
  const greeting = getGreeting();
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <Card className="flex w-full flex-col rounded-xl">
          <CardHeader>
            <h1 className="text-xl font-bold">{greeting}, Fatih Attala Sastya Putra</h1>
            <p className="-mt-1">rerer</p>
          </CardHeader>
        </Card>
        <div className="grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-4">
          {cardData.map((doc) => (
            <Card key={doc.title} className="flex flex-col items-start">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="grid">
                  <Link href={doc.title} className="font-bold hover:underline">
                    {doc.title}
                  </Link>
                  <p>{doc.description}</p>
                </div>
              </CardHeader>
              <CardFooter>
                <b className="text-2xl">{doc.total}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Card className="mx-auto w-full">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold tracking-tight">Jadwal</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Temukan informasi jadwal terbaru Anda di sini dengan mudah dan cepat!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClassroomSchedule tableData={subjectStaticData} />
        </CardContent>
      </Card>
    </>
  );
};

export default TeacherPage;
