import React from "react";
import { Card, CardHeader } from "../ui/card";
import { getDate } from "@/lib/functions";
import { Button } from "../ui/button";
import Link from "next/link";
import { IEvent, IGroupClass } from "@/lib/types/Types";

const EventCard = ({ subjectData, eventData }: { subjectData: IGroupClass; eventData: IEvent }) => {
  return (
    <div>
      <Card className="text-foreground">
        <CardHeader className="items-start">
          <Link href={`/classroom/${subjectData.uid}/${eventData.id}`} className="font-bold">
            {eventData.title}
          </Link>
          <p>{eventData.description}</p>
          <div className="flex w-full justify-end pt-6">
            <Button className="hover:bg-secondary" variant={"default"}>
              Detail
            </Button>
          </div>
        </CardHeader>
        <hr />
        <CardHeader className="flex flex-col items-end">
          <span className="text-xs">{getDate({ children: eventData.dueDateAt })}</span>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EventCard;
