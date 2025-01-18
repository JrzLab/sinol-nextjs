"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getDate } from "@/lib/functions";
import Link from "next/link";
import { IEvent, IGroupClass } from "@/lib/types/Types";
import { truncateText } from "@/lib/functions";
import EventDetail from "../popup/event-detail";
import { Badge } from "../ui/badge";

const EventCard = ({ subjectData, eventData, role }: { subjectData: IGroupClass; eventData: IEvent; role: "teacher" | "student" }) => {
  return (
    <div>
      {role === "teacher" ? (
        <Card className="text-foreground">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-bold">{truncateText(eventData.title, 20)}</CardTitle>
              {eventData.status === "OPEN" ? (
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Tersedia</Badge>
              ) : (
                <Badge variant={"destructive"} className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Kadaluarsa
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{eventData.description}</p>
          </CardContent>
          <hr />
          <CardFooter className="row-span-2 flex flex-row justify-between pt-5">
            <span className="flex flex-col justify-start text-xs">
              <strong>Deadline : </strong>
              {getDate({ children: eventData.dueDateAt })} WIB
            </span>
            <div className="flex justify-end">
              <EventDetail event={eventData} subject={subjectData} role={"teacher"} />
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-foreground">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-bold">{truncateText(eventData.title, 20)}</CardTitle>
              {eventData.status === "OPEN" ? (
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Tersedia</Badge>
              ) : (
                <Badge variant={"destructive"} className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Kadaluarsa
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{eventData.description}</p>
          </CardContent>
          <hr />
          <CardFooter className="row-span-2 flex flex-row justify-between pt-5">
            <span className="flex justify-start text-xs">
              <strong>Deadline : </strong>
              {getDate({ children: eventData.dueDateAt })} WIB
            </span>
            <div className="flex justify-end">
              <EventDetail event={eventData} subject={subjectData} role={"student"} />
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EventCard;
