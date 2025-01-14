"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { eventStaticData } from "@/lib/staticData";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EventCard from "@/components/subject/event-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getClassByUidClassUser } from "@/app/actions/api-actions";
import StudentChat from "@/components/chat/student/student-chat";
import BubbleChat from "@/components/chat/bubble-chat";
import { useAuth } from "@/hooks/context/AuthProvider";
import { ChatHistoryResponse, ChatMessage, IGroupClass } from "@/lib/types/Types";

const ClassroomPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();
  const roomId = useRef<number>(0);
  const [dataClass, setDataClass] = useState<IGroupClass>();
  const [messageData, setMessageData] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uidClassUser) {
        const data = await getClassByUidClassUser(user.uidClassUser);
        const dataClas = data!.find((data) => data.uid == slug);
        setDataClass(dataClas);
      }
    };

    fetchData();
  }, [user, setDataClass, slug]);

  const events = eventStaticData
    .filter((data) => data.subjectId == parseInt(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const buttonChatHandler = async () => {
    if (!messageData.length) {
      const data = await fetch(`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}/websocket/chat/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailUser1: dataClass?.ownerData.email, emailUser2: user?.email }),
      });
      const response = (await data.json()) as ChatHistoryResponse;
      roomId.current = response.data.id;
      setMessageData(response.data.messages);
    }
  };

  const addChatHandler = async (message: ChatMessage) => {
    setMessageData((prev) => [...prev, message]);
  };

  return (
    <>
      {dataClass && dataClass?.ownerData.email !== user?.email ? (
        <div className="relative">
          <StudentChat
            classDataWs={{ idRoom: roomId.current, emailUser: user?.email ?? '', teacherData: dataClass?.ownerData || {} }}
            buttonGetChat={buttonChatHandler}
            addChatHandler={addChatHandler}
          >
            {messageData &&
              messageData.map((data, index) => (
                <BubbleChat key={index} position={data.sender.email === dataClass.ownerData.email ? "receiver" : "sender"} chatRoomType={"student"}>
                  {data.content}
                </BubbleChat>
              ))}
          </StudentChat>
        </div>
      ) : null}
      <Card className="text-foreground">
        <CardHeader>
          <h1 className="font-bold">{dataClass?.className}</h1>
          <p>{dataClass?.description}</p>
          {true ? (
            <div className="flex gap-2 pt-8">
              <Link href={`/classroom/${dataClass?.uid}/join`}>
                <Button>Ubah Kelas</Button>
              </Link>
              <Button variant={"outline"}>Lihat </Button>
            </div>
          ) : null}
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className="w-full pt-6">
            <h1 className="font-bold">Teacher</h1>
            <p>{dataClass?.ownerData.name}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Tugas</h1>
            <p>{dataClass?.day}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            {/* <Button onClick={() => setOpenEvent(!openEvent)}>Buat Tugas</Button>
            {openEvent ? <CreateEventPopUp status={() => setOpenEvent(!openEvent)} /> : null} */}
          </div>
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

export default ClassroomPage;
