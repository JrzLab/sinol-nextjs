"use client"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import SubjectCard from "@/components/subject/subject-card";
import AttendanceChart from "@/components/chart/attendance-chart";
import { chartStaticData1, subjectStaticData } from "@/lib/staticData";
import { getToday } from "@/lib/functions";
import Link from "next/link";
import { useAuth } from "@/hooks/context/AuthProvider";

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

export default function Page() {
  const { user, loading } = useAuth();
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <Card className="flex w-full flex-col rounded-xl">
        <CardHeader>
          <h1 className="text-xl font-bold">Halo {loading ? 'loading data...' : user?.username}</h1>
          <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
        </CardHeader>
        <CardFooter className="mt-4">
          <Button>
            <Link href="/classroom">Check Schedule</Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-4">
        {cardData.map((data) => (
          <Card className="flex flex-col justify-between" key={data.title}>
            <CardHeader>
              <h1 className="font-bold">{data.title}</h1>
              <p className="">{data.description}</p>
            </CardHeader>
            <CardFooter>
              <h1 className="text-2xl font-bold">{data.total}</h1>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div>
        <AttendanceChart data={chartStaticData1} />
      </div>
      <div className="ml-1">
        <h1 className="text-xl font-bold">Today Subject</h1>
        <span className="text-sm">{getToday()}</span>
      </div>
      <div>
        <SubjectCard today data={subjectStaticData}></SubjectCard>
      </div>
    </div>
  );
}
