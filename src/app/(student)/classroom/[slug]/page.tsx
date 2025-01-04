"use client";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { eventStaticData, subjectStaticData } from "@/lib/staticData";
import { usePathname } from "next/navigation";
import React from "react";
import EventCard from "@/components/subject/event-card";
import StudentChat from "@/components/chat/student/student-chat";
import { ISubject } from "@/lib/types/Types";
import BubbleChat from "@/components/chat/bubble-chat";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const query = usePathname().split("/")[2];
  const data = subjectStaticData.filter((data) => data.id == parseInt(query))[0] as ISubject;

  const events = eventStaticData
    .filter((data) => data.subjectId == parseInt(query))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <div className="relative">
        <StudentChat status="online" data={data}>
          <BubbleChat position={"sender"} chatRoomType={"student"}>
            Hi, Selamat pagi, ada yang bisa saya bantu?
          </BubbleChat>
          <BubbleChat position={"receiver"} chatRoomType={"student"}>
            test
          </BubbleChat>
        </StudentChat>
      </div>
      <Card className="text-foreground">
        <CardHeader>
          <h1 className="font-bold">{data.title}</h1>
          <p>{data.description}</p>
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className="w-full pt-6">
            <h1 className="font-bold">Pembuat</h1>
            <p>{data.teacher}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Tugas</h1>
            <p>{data.event}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.eventId} data={event} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
