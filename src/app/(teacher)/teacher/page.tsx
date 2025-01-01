import ClassroomSchedule from "@/components/table/classroom-schedule";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getGreeting } from "@/lib/functions";
import { chartStaticData1, subjectStaticData } from "@/lib/staticData";
import Link from "next/link";
import React from "react";

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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((doc) => (
          <Card key={doc.title}>
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
      <div>{/* <ActivityChart/> */}</div>
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
