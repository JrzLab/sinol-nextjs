"use client";
import React from "react";
import { Card, CardHeader } from "../ui/card";
import { getDate } from "@/lib/functions";
import Link from "next/link";
import { IEvent, IGroupClass } from "@/lib/types/Types";
import { truncateText } from "@/lib/functions";
import EventDetail from "../popup/event-detail";
import { Badge } from "../ui/badge";

const EventCard = ({ subjectData, eventData }: { subjectData: IGroupClass; eventData: IEvent }) => {
  return (
    <div>
      <Card className="text-foreground">
        <CardHeader>
          <div className="flex justify-between">
            <Link href={`/classroom/${subjectData.uid}/${eventData.id}`} className="text-lg font-bold hover:underline">
              {truncateText(eventData.title, 20)}
            </Link>
            {eventData.status === "OPEN" ? (
              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Tersedia</Badge>
            ) : (
              <Badge variant={"destructive"} className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                Kadaluarsa
              </Badge>
            )}
          </div>
          <p className="text-sm">{eventData.description}</p>
          <div className="flex w-full justify-end pt-6">
            <EventDetail event={eventData} subject={subjectData} />
          </div>
        </CardHeader>
        <hr />
        <CardHeader className="flex flex-col items-end">
          <span className="text-xs">Deadline: {getDate({ children: eventData.dueDateAt })} WIB</span>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EventCard;
