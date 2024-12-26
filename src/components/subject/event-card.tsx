import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { getDate } from "@/lib/functions";
import { Button } from "../ui/button";
import Link from "next/link";

interface Data {
  title: string;
  subjectId: number;
  id: number;
  description: string;
  date: string;
}

const EventCard = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div>
      <Card>
        <CardHeader className="items-start">
          <Link href={`/classroom/${data.subjectId}/${data.eventId}`} className="font-bold">
            {data.title}
          </Link>
          <p>{data.description}</p>
          <div className="flex w-full justify-end pt-6">
            <Button className="">detail</Button>
          </div>
        </CardHeader>
        <hr />
        <CardHeader className="flex flex-col items-end">
          <span className="text-xs">{getDate({ children: data.date })}</span>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EventCard;
