"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyStatePages } from "@/components/empety/empety";
import SubjectCard from "@/components/subject/subject-card";
import Link from "next/link";
import { getToday } from "@/lib/functions";
import { getClassByUidClassUser, getEventByUidClassUser, getUserData } from "./actions/api-actions";
import { IUserDataProps, IGroupClass, IEvent } from "@/lib/types/Types";
import { Loader2 } from "lucide-react";

const DashboardPage: React.FC = () => {
  const [subjectData, setSubjectData] = useState<IGroupClass[] | undefined>(undefined);
  const [eventData, setEventData] = useState<IEvent[] | undefined>(undefined);
  const [userData, setUserData] = useState<IUserDataProps | undefined>(undefined);
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
    const uidCookies = Cookies.get("uidClassUser");
    const userEmail = Cookies.get("userId");
    const fetchDashboardData = async () => {
      if (uidCookies && userEmail) {
        const subjectData = await getClassByUidClassUser(uidCookies);
        const eventData = subjectData ? await getEventByUidClassUser(uidCookies, subjectData[0].uid) : undefined;
        const userData = await getUserData(userEmail);

        setSubjectData(subjectData);
        setUserData(userData);
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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 width={50} height={50} className="animate-spin" />
      </div>
    );
  }

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
