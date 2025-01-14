import React from "react";
import { Card, CardHeader } from "../ui/card";
import { getDate } from "@/lib/functions";
import { Button } from "../ui/button";
import Link from "next/link";

interface EventContent {
  subtitle: string;
  text: string;
  file: string;
  path: string;
}

interface Event {
  subjectId: number; // Foreign key
  eventId: number; // Primary key
  title: string;
  date: string; // Format: "YYYY/MM/DD HH:mm:ss"
  description: string;
  content: EventContent[];
}

const EventCard = ({ data }: { data: Event }) => {
  return (
    <div>
      <Card className="text-foreground">
        <CardHeader className="items-start">
          <Link href={`/classroom/${data.subjectId}/tugas/${data.eventId}`} className="font-bold">
            {data.title}
          </Link>
          <p>{data.description}</p>
          <div className="flex w-full justify-end pt-6">
            <Button className="hover:bg-secondary" variant={"default"}>
              Detail
            </Button>
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
