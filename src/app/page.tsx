"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyStatePages } from "@/components/empety/empety";
import SubjectCard from "@/components/subject/subject-card";
import Link from "next/link";
import { getToday } from "@/lib/functions";
import { getClassByUidClassUser, getEventByUidClassUser } from "./actions/api-actions";
import { IGroupClass, IEvent } from "@/lib/types/Types";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/context/AuthProvider";

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [subjectData, setSubjectData] = useState<IGroupClass[] | undefined>(undefined);
  const [eventData, setEventData] = useState<IEvent[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [cardData, setCardData] = useState([
    {
      title: "Jadwal Pelajaran",
      description: "Total Jadwal Pelajaran yang Anda Dapatkan",
      total: 0,
    },
    {
      title: "Tugas",
      description: "Tugas yang tersedia",
      total: 0,
    },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user?.uidClassUser) {
        const subjectData = await getClassByUidClassUser(user?.uidClassUser);
        const eventData = subjectData && subjectData.length > 0 ? await getEventByUidClassUser(user?.uidClassUser, subjectData[0].uid) : [];

        setSubjectData(subjectData);
        setEventData(eventData);

        setCardData([
          {
            title: "Jadwal Pelajaran",
            description: "Total Jadwal Pelajaran yang Anda Dapatkan",
            total: subjectData ? subjectData.length : 0,
          },
          {
            title: "Tugas",
            description: "Tugas yang tersedia",
            total: eventData ? eventData.length : 0,
          },
        ]);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, [user?.uidClassUser, user?.email]);
  
  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 width={50} height={50} className="animate-spin" />
      </div>
    );
  }
  
  const modeNoData: boolean = !subjectData || subjectData.length === 0 || !user;

  if (loading || modeNoData || !eventData || !subjectData || subjectData.length === 0) {
    return <EmptyStatePages />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <Card className="flex w-full flex-col rounded-xl">
        <CardHeader>
          <h1 className="text-xl font-bold">{`Halo ${user?.username}`}</h1>
          <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
        </CardHeader>
        <CardFooter>
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
