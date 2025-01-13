"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
// import { chartStaticData1 } from "@/lib/staticData";
import { getToday } from "@/lib/functions";
import { useAuth } from "@/hooks/context/AuthProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SubjectCard from "@/components/subject/subject-card";
import CreateClassroom from "@/components/popup/create-classroom";
import JoinClassroom from "@/components/popup/join-classroom";
import Link from "next/link";
import { EmptyStatePages } from "@/components/empety/empety";


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

const Page: React.FC = () => {
  const { user, loading } = useAuth();
  const [popUpCreate, setPopUpCreate] = useState<boolean>(false);
  const [popUpJoin, setPopUpJoin] = useState<boolean>(false);

  const handleTogglePopUp = (): void => {
    setPopUpCreate(!popUpCreate);
  };

  const handleTogglePopUpJoin = (): void => {
    setPopUpJoin(!popUpJoin);
  };

  const modeNoData: boolean = true;

  return (
    <>
      {modeNoData ? (
        <>
          <EmptyStatePages
            loading={loading}
            user={user}
            onCreateClass={handleTogglePopUp}
            onJoinClass={handleTogglePopUpJoin}
          />
          {popUpCreate && <CreateClassroom status={handleTogglePopUp} />}
          {popUpJoin && <JoinClassroom status={handleTogglePopUpJoin} />}
        </>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-4 pt-0">

            <Card className="flex w-full flex-col rounded-xl">
              <CardHeader>
                <h1 className="text-xl font-bold">
                  {loading ? "loading data..." : `Halo ${user?.username}`}
                </h1>
                <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
              </CardHeader>
              <CardFooter className="mt-4">
                <Button className="hover:bg-secondary" variant={"default"}>
                  <Link href="/classroom">Lihat Jadwal</Link>
                </Button>
              </CardFooter>
            </Card>

            <div className="grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-4">
              {cardData.map((data) => (
                <Card
                  className="flex flex-col justify-between text-foreground"
                  key={data.title}>
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

            <div>
              <SubjectCard today />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
