import React from "react";
import { Card, CardHeader } from "../ui/card";
import { getDate } from "@/lib/functions";
import { Button } from "../ui/button";
import Link from "next/link";
import { IEvent, IGroupClass } from "@/lib/types/Types";
import { truncateText } from "@/lib/functions";

const EventCard = ({ subjectData, eventData }: { subjectData: IGroupClass; eventData: IEvent }) => {
  return (
    <div>
      <Card className="text-foreground">
        <CardHeader>
          <div className="flex justify-between">
            <Link href={`/classroom/${subjectData.uid}/${eventData.id}`} className="hover:underline font-bold">
              {truncateText(eventData.title, 20)}
            </Link>
            <p>
              {eventData.status === "OPEN" ? (
                <span className="rounded-md text-xs bg-green-200 p-2">Tersedia</span>
              ) : (
                <span className="rounded-md text-xs bg-red-200 p-2">Tidak Tersedia</span>
              )}
            </p>
          </div>
          <p>{eventData.description}</p>
          <div className="flex w-full items-center justify-end pt-6">
            <Button className="hover:bg-secondary" variant={"default"}>
              Detail
            </Button>
          </div>
        </CardHeader>
        <hr />
        <CardHeader className="flex flex-col items-end">
          <span className="text-xs">Deadline: {getDate({ children: eventData.dueDateAt })}</span>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EventCard;
