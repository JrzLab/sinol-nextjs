import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import SubjectCard from "@/components/subject/subject-card";
import AttendanceChart from "@/components/chart/attendance-chart";
import { subjectStaticData } from "@/lib/staticData";

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
          <h1 className="text-xl font-bold">Halo Alif Mahendra</h1>
          <p className="-mt-1">hari yang indah untuk mengerjakan tugasmu, hehe</p>
        </CardHeader>
        <CardFooter className="mt-4">
          <Button>Check Schedule</Button>
        </CardFooter>
      </Card>
      <div className="grid auto-rows-min gap-4 lg:grid-cols-4 grid-cols-2">
        {cardData.map((data) => (
          <Card className="flex flex-col justify-between" key={data.title}>
            <CardHeader>
              <h1 className=" font-bold">{data.title}</h1>
              <p className="">{data.description}</p>
            </CardHeader>
            <CardFooter>
              <h1 className="text-2xl font-bold">{data.total}</h1>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div>
        <AttendanceChart />
      </div>
      <div className="ml-1">
        <h1 className="text-xl font-bold">Today Subject</h1>
        <span className="text-sm">Senin 23 Januari 2024</span>
      </div>
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3 md:grid-cols-2">
        {/* <SubjectCard id={data.} title={data.} teacher={data.} description={data.} notifications={data.} event={data.} person={data.} day={data.} limit={3}/> */}
      </div>
    </div>
  );
}
