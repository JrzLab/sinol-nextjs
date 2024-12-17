import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import SubjectCard from "@/components/subject/subject-card";
import AttendanceChart from "@/components/chart/attendance-chart";

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
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="flex w-full flex-col rounded-xl">
        <CardHeader>
          <h1 className="text-2xl font-bold">Halo Alif Mahendra</h1>
          <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
        </CardHeader>
        <CardFooter>
          <Button>Check Schedule</Button>
        </CardFooter>
      </Card>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {cardData.map((data) => (
          <Card className="flex flex-row justify-between" key={data.title}>
            <CardHeader>
              <h1 className="text-xl font-bold">{data.title}</h1>
              <p className="text-sm">{data.description}</p>
            </CardHeader>
            <CardHeader>
              <h1 className="text-5xl font-bold">{data.total}</h1>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="ml-1">
        <h1 className="text-xl font-bold">Attendance Persentage</h1>
        <span className="text-sm">Attendance Percentage Each Month</span>
      </div>
      <div>
        <AttendanceChart />
      </div>
      <div className="ml-1">
        <h1 className="text-xl font-bold">Today Subject</h1>
        <span className="text-sm">Senin 23 Januari 2024</span>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <SubjectCard />
      </div>
    </div>
  );
}
