"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { subjectStaticData } from "@/lib/staticData";

interface Course {
  id: number;
  title: string;
  teacher: string;
  description: string;
  notifications: number;
  event: number;
  person: number;
  day: number;
}

interface Day {
    day: number | string;
    data: Course[];
  }

const SubjectCard = ({data, format}: {data: Course[], format?: boolean}) => {  

  const [ subjectData, setSubjectData ] = useState<Course[]>([])
  const [ subjectDataByDay, setSubjectDataByDay ] = useState<Day[]>([])

  const getSubjectDataEachDay = () => {
    const list = Array.from(new Set(subjectStaticData.map(item => item.day)))
      .sort((a, b) => a - b)
      .map(day => ({
        day: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][day - 1],
        data: subjectStaticData.filter(item => item.day === day)
      }))
    return setSubjectDataByDay(list)
  }
  useEffect(() => {
    format ? getSubjectDataEachDay() : setSubjectData(data)
  }, [])

  return (
    <>
    {format ? 
      subjectDataByDay.map((data) => (
        <div className="grid gap-4" key={data.day}>
        <h1 className="mt-6">{data.day}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {data.data.map((subject) => (
            <Card className="flex flex-col justify-between" key={subject.id}>
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <Link href={`/classroom/${subject.id}`} className="text-xl font-bold hover:underline">{subject.title}</Link>
                    <p className="text-sm">{subject.teacher}</p>
                  </div>
                  <Button className="ml-3">
                    <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
                  </Button>
                </div>
              </CardHeader>
              <div>
                <CardContent>
                  <p>{subject.description}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm font-light">{subject.notifications} Notifications</p>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
      ))
      : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
      {subjectData.map((subject) => (
        <Card className="flex flex-col justify-between" key={subject.id}>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <Link href={`/teacher/classroom/${subject.id}`} className="text-xl font-bold hover:underline">{subject.title}</Link>
                <p className="text-sm">{subject.teacher}</p>
              </div>
              <Button className="ml-3">
                <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
              </Button>
            </div>
          </CardHeader>
          <div>
            <CardContent>
              <p>{subject.description}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm font-light">{subject.notifications} Notifications</p>
            </CardFooter>
          </div>
        </Card>
      ))}
      </div>   
    )}
    </> 
  );
};

export default SubjectCard;
