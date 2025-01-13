import ClassroomSchedule from "@/components/table/classroom-schedule";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { subjectStaticData } from "@/lib/staticData";
import Link from "next/link";
import React from "react";

const TeacherPage = () => {
  const cardData = [
    {
      title: "Jadwal Pelajaran",
      description: "Total Jadwal Pelajaran yang Anda Dapatkan",
      total: 20,
    },
    {
      title: "Absensi",
      description: "Absensi yang Sudah Dikirim",
      total: 20,
    },
    {
      title: "Tugas",
      description: "Tugas yang Sudah Dikirim",
      total: 20,
    },
    {
      title: "Tabel Peringkat",
      description: "Peringkat Semua Pengguna",
      total: 20,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((doc) => (
          <Card key={doc.title} className="flex flex-col text-foreground">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="grid">
                <Link href={doc.title} className="font-bold hover:underline">
                  {doc.title}
                </Link>
                <p className="text-sm">{doc.description}</p>
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <b className="text-2xl">{doc.total}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div>{/* <ActivityChart/> */}</div>
      <Card className="mx-auto w-full text-foreground">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold tracking-tight">Jadwal</CardTitle>
          <CardDescription>Temukan informasi jadwal terbaru Anda di sini dengan mudah dan cepat!</CardDescription>
        </CardHeader>
        <CardContent>
          <ClassroomSchedule tableData={subjectStaticData} />
        </CardContent>
      </Card>
    </>
  );
};

export default TeacherPage;
