"use client";
import React, { useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { getDate } from "@/lib/functions";
import { Button } from "../ui/button";
import Link from "next/link";
import { IEvent, IGroupClass } from "@/lib/types/Types";
import EventDetail from "../popup/event-detail";

const EventCard = ({ subjectData, eventData }: { subjectData: IGroupClass; eventData: IEvent }) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  return (
    <div>
      <Card className="text-foreground">
        <CardHeader className="items-start">
          <Link href={`/classroom/${subjectData.uid}/${eventData.id}`} className="font-bold">
            {eventData.title}
          </Link>
          <p>{eventData.description}</p>
          <div className="flex w-full justify-end pt-6">
            <EventDetail event={eventData} subject={subjectData} />
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
