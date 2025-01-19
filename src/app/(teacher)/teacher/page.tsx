import { getClassByUidClassUser, getEventByUidClassUser, getUserData } from "@/app/actions/api-actions";
import ClassroomSchedule from "@/components/table/classroom-schedule";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeacherPage = async () => {
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser");
  const userEmailCookies = cookie.get("userId");
  const getSubjectData = uidCookies?.value ? await getClassByUidClassUser(uidCookies.value) : null;
  const userData = userEmailCookies?.value ? await getUserData(userEmailCookies.value) : null;
  const getEventData =
    getSubjectData && getSubjectData.length > 0 && uidCookies?.value ? await getEventByUidClassUser(uidCookies.value, getSubjectData[0].uid) : [];

  const filteredSubjectData = uidCookies ? getSubjectData?.filter((doc) => doc.ownerData.email === userEmailCookies?.value) : null;
  if (!filteredSubjectData || filteredSubjectData.length === 0) {
    return (
      <Card className="text-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Jadwal</CardTitle>
          <CardDescription>Temukan informasi jadwal terbaru Anda di sini dengan mudah dan cepat!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Anda belum memiliki jadwal pelajaran. Silahkan membuat jadwal pelajaran terlebih dahulu.</p>
        </CardContent>
      </Card>
    );
  }
  const cardData = [
    {
      title: "Jadwal Pelajaran",
      description: "Total jadwal pelajaran yang anda kelola",
      total: filteredSubjectData?.length,
    },
    {
      title: "Tugas",
      description: "Tugas yang Sudah Dikirim",
      total: getEventData?.length,
    },
  ];

  return (
    <>
      <Card className="mx-auto w-full text-foreground">
        <CardHeader className="flex flex-row items-center justify-start pb-0">
          <Avatar>
            <AvatarImage src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${userData?.imageUrl}`} alt={userData?.imageUrl!} />
            <AvatarFallback>
              {userData?.firstName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {userData?.firstName} {userData?.lastName !== null ? userData?.lastName : ""}
            </CardTitle>
            <CardDescription>
              Selamat datang di halaman mengajar! Di sini Anda dapat mengelola jadwal pelajaran dan tugas dengan mudah.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
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
          <ClassroomSchedule subjectData={filteredSubjectData!} />
        </CardContent>
      </Card>
    </>
  );
};

export default TeacherPage;
