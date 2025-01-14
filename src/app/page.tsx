import React from "react";
import { cookies } from "next/headers";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyStatePages } from "@/components/empety/empety";
import SubjectCard from "@/components/subject/subject-card";
import Link from "next/link";
import { getToday } from "@/lib/functions";
import { getClassByUidClassUser, getUserData } from "./actions/api-actions";
import { IUserDataProps } from "@/lib/types/Types";

const cardData = [
  {
    title: "Jadwal Pelajaran",
    description: "Total Jadwal Pelajaran yang Anda Dapatkan",
    total: 20,
  },
  {
    title: "Tugas",
    description: "Tugas yang Sudah Dikirim",
    total: 20,
  },
];

async function fetchDashboardData() {
  const cookie = await cookies();
  const uidCookies = cookie.get("uidClassUser");
  const userEmail = cookie.get("userId");
  const subjectData = uidCookies ? await getClassByUidClassUser(uidCookies.value) : null;
  const userData: IUserDataProps | undefined = userEmail ? await getUserData(userEmail.value) : undefined;
  return { subjectData, userData };
}

const DashboardPage: React.FC = async () => {
  const { subjectData, userData } = await fetchDashboardData();
  const modeNoData: boolean = !subjectData || subjectData.length === 0 || !userData;
  if (modeNoData) {
    return <EmptyStatePages />;
  }
  
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <Card className="flex w-full flex-col rounded-xl">
        <CardHeader>
          <h1 className="text-xl font-bold">{`Halo ${userData?.firstName} ${userData?.lastName || ""}`}</h1>
          <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
        </CardHeader>
        <CardFooter className="mt-4">
          <Button className="hover:bg-secondary" variant={"default"}>
            <Link href="/classroom">Lihat Jadwal</Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-2">
        {cardData.map((data) => (
          <Card className="flex flex-col justify-between text-foreground" key={data.title}>
            <CardHeader>
              <h1 className="font-bold">{data.title}</h1>
              <p className="text-sm">{data.description}</p>
            </CardHeader>
            <CardFooter>
              <h1 className="text-2xl font-bold">{data.total}</h1>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="ml-1">
        <h1 className="text-xl font-bold">Jadwal Hari Ini</h1>
        <span className="text-sm">{getToday()}</span>
      </div>
      <div>{subjectData && subjectData.length > 0 ? <SubjectCard format={false} data={subjectData} /> : <EmptyStatePages />}</div>
    </div>
  );
};

export default DashboardPage;
