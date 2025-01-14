"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EventCard from "@/components/subject/event-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import StudentChat from "@/components/chat/student/student-chat";
import BubbleChat from "@/components/chat/bubble-chat";
import { useAuth } from "@/hooks/context/AuthProvider";
import { ChatHistoryResponse, ChatMessage, IEvent, IGroupClass } from "@/lib/types/Types";
import CreateEventPopUp from "@/components/popup/create-event";
import { getSocket } from "@/lib/socket";

const ClassroomPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const slug = params.slug as string;
  const roomId = useRef<number>(0);
  const [dataClass, setDataClass] = useState<IGroupClass>();
  const [dataEvent, setDataEvent] = useState<IEvent[]>();
  const [messageData, setMessageData] = useState<ChatMessage[]>([]);
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [listenerAdded, setListenerAdded] = useState<boolean>(false);

  useEffect(() => {
    if (!listenerAdded) {
      getSocket()?.on("updateMessageClient", (data: ChatMessage) => {
        setMessageData((prev) => [...prev, data]);
      });
      setListenerAdded(true);
    }
  }, [listenerAdded]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uidClassUser) {
        const data = await getClassByUidClassUser(user.uidClassUser);
        const dataClas = data!.find((data) => data.uid == slug);
        setDataClass(dataClas);
        return dataClas;
      }
    };
    fetchData().then(async (data) => {
      if (user?.uidClassUser && data?.uid) {
        const getEventData = await getEventByUidClassUser(user.uidClassUser, data.uid);
        if (getEventData !== null) {
          setDataEvent(getEventData);
        } else {
          setDataEvent([]);
        }
      }
    });
  }, [user, setDataClass, slug, setDataEvent]);

  const buttonChatHandler = async () => {
    if (!messageData.length) {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
      const data = await fetch(
        `${wsUrl?.includes("localhost") ? wsUrl.replace("3001", "3000") : wsUrl?.replace("10073", "10059")}/websocket/chat/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailUser1: dataClass?.ownerData.email, emailUser2: user?.email }),
        },
      );
      const response = (await data.json()) as ChatHistoryResponse;
      console.log(response);
      roomId.current = response.data.id;
      setMessageData(response.data.messages);
    }
  };

  const getEventLength = dataEvent?.length;
  return (
    <>
      {dataClass && dataClass?.ownerData.email !== user?.email ? (
        <div className="relative">
          <StudentChat
            classDataWs={{ idRoom: roomId.current, emailUser: user?.email ?? "", teacherData: dataClass?.ownerData || {} }}
            buttonGetChat={buttonChatHandler}
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
              <Button variant={"outline"}>Lihat</Button>
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
            <p>{getEventLength}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            {dataClass && dataClass?.ownerData.email !== user?.email ? null : <Button onClick={() => setOpenEvent(!openEvent)}>Buat Tugas</Button>}
            {openEvent && dataClass?.uid ? <CreateEventPopUp classUid={dataClass.uid} status={() => setOpenEvent(!openEvent)} /> : null}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dataEvent?.map((event) => <EventCard key={event.id} eventData={event} subjectData={dataClass!} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassroomPage;
