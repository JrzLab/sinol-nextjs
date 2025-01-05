"use client";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { eventStaticData, subjectStaticData } from "@/lib/staticData";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import EventCard from "@/components/subject/event-card";
import StudentChat from "@/components/chat/student/student-chat";
import { ISubject } from "@/lib/types/Types";
import BubbleChat from "@/components/chat/bubble-chat";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateEventPopUp from "@/components/popup/create-event";

const page = () => {

  const [ isOwner, setIsOwner ] = useState<Boolean>(true);
  const [ openEvent, setOpenEvent ] = useState<Boolean>(true);

  const query = usePathname().split("/")[2];
  const data = subjectStaticData.filter((data) => data.id == parseInt(query))[0] as ISubject;

  const events = eventStaticData
    .filter((data) => data.subjectId == parseInt(query))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      
      <Card>
        <CardHeader>
          <h1 className="font-bold">{data.title}</h1>
          <p>{data.description}</p>
          {isOwner ? (
            <div className="pt-8 flex gap-2">
              <Link href={`/classroom/${data.id}/join`}>
                <Button>edit kelas</Button>
              </Link>
              <Button variant={"outline"}>lihat member</Button>
            </div>
          ) : null}
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className="w-full pt-6">
            <h1 className="font-bold">Teacher</h1>
            <p>{data.teacher}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Event</h1>
            <p>{data.event}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="justify-end flex">
            <Button onClick={() => setOpenEvent(!openEvent)}>buat event</Button>
            { openEvent ? <CreateEventPopUp status={() => setOpenEvent(!openEvent)} /> : null }
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.eventId} data={event} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative hidden">
        <StudentChat status="online" data={data}>
          <BubbleChat time="" chatRoomType={"student"} userType="student" message="Hello, teacher!" />
          <BubbleChat time="" chatRoomType={"student"} userType="teacher" message="Hello, student!" />
          <BubbleChat time="" chatRoomType={"student"} userType="student" message="How are you?" />
          <BubbleChat time="" chatRoomType={"student"} userType="teacher" message="I'm fine, thank you!" />
        </StudentChat>
      </div>
    </>
  );
};

export default page;
