import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import ClassroomSchedule from "@/components/table/classroom-schedule";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { subjectStaticData } from "@/lib/staticData";
import React from "react";
import { cookies } from "next/headers";

const TeacherPage = async () => {
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser");
  const getSubjectData = await getClassByUidClassUser(uidCookies?.value!);

  const cardData = [
    {
      title: "Jadwal Pelajaran",
      description: "Total jadwal pelajaran yang anda kelola",
      total: 20,
    },
    {
      title: "Tugas",
      description: "Tugas yang Sudah Dikirim",
      total: 20,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
        {cardData.map((doc) => (
          <Card key={doc.title} className="flex flex-col text-foreground">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="grid">
                <CardTitle className="font-bold">{doc.title}</CardTitle>
                <CardDescription>
                  <p className="text-sm">{doc.description}</p>
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <b className="text-2xl">{doc.total}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mx-auto w-full text-foreground">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold tracking-tight">Jadwal</CardTitle>
          <CardDescription>Temukan informasi jadwal terbaru Anda di sini dengan mudah dan cepat!</CardDescription>
        </CardHeader>
        <CardContent>
          <ClassroomSchedule subjectData={getSubjectData!} />
        </CardContent>
      </Card>
    </>
  );
};

export default TeacherPage;
