"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { subjectStaticData } from "@/lib/staticData";
import Link from "next/link";



const SubjectCard = ({limit, format}: {limit?: number, format?: boolean}) => {

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

  const [ subjectData, setSubjectData ] = useState<Course[]>([])
  const [ dayData, setDayData ] = useState<Day[]>([])

  const getSubjectData = (limit: number) => {
    const list = []
    for(let i = 1; i <= limit; i++) {
      list.push(subjectStaticData[i - 1])
    }
    return setSubjectData(list)
  }

  const getSubjectDataEachDay = () => {
    const list = Array.from(new Set(subjectStaticData.map(item => item.day)))
      .sort((a, b) => a - b)
      .map(day => ({
        day: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][day - 1],
        data: subjectStaticData.filter(item => item.day === day)
      }))
    return setDayData(list)
  }

  useEffect(() => {
    limit ? getSubjectData(limit) : setSubjectData(subjectStaticData)
    format ? getSubjectDataEachDay() : setSubjectData(subjectStaticData)
  }, [])

  return (
    <>
      {format ? 
      dayData.map((data) => (
        <div className="flex flex-col gap-4 mt-6gt" key={data.day}>
          <h1 className="font-bold">{data.day}</h1>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {data.data.map((doc) => (
            <Card className="flex flex-col justify-between" key={doc.id}>
            <CardHeader>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <Link href={`/teacher/classroom/${doc.id}`} className="text-xl font-bold hover:underline">{doc.title}</Link>
                  <p className="text-sm">{doc.teacher}</p>
                </div>
                <Button className="ml-3">
                  <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
                </Button>
              </div>
            </CardHeader>
            <div>
              <CardContent>
                <p>{doc.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm font-light">1 Notifications</p>
              </CardFooter>
            </div>
          </Card>
          ))}
          </div>
        </div>
      )) : 
      subjectData.map((data) => (
        <Card className="flex flex-col justify-between" key={data.id}>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <Link href={`/teacher/classroom/${data.id}`} className="text-xl font-bold hover:underline">{data.title}</Link>
                <p className="text-sm">{data.teacher}</p>
              </div>
              <Button className="ml-3">
                <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
              </Button>
            </div>
          </CardHeader>
          <div>
            <CardContent>
              <p>{data.description}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm font-light">1 Notifications</p>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
};

export default SubjectCard;
