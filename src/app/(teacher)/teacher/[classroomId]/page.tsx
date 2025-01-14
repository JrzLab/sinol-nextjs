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
import EditClassroomDetail from "@/components/popup/edit-classroom-detail";
import { LogOut, MessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";


const TeacherClassroom = () => {
  const router = useRouter();
  const { user } = useAuth();
  const params = useParams();
  const slug = params.classroomId as string;
  const [dataClass, setDataClass] = useState<IGroupClass>();
  const [dataEvent, setDataEvent] = useState<IEvent[]>();
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

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

  const getEventLength = dataEvent?.length;
  return (
    <>
      <Card className="text-foreground">
        <CardHeader>
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold">{dataClass?.className}</h1>
              <p>{dataClass?.description}</p>
            </div>
            <div className="flex flex-row gap-2">
              {dataClass?.ownerData.email ===  user?.email ? (
                <Button size={"icon"} variant={"outline"} onClick={() => router.push(`/teacher/${slug}/chat`)}>
                  <MessageCircleQuestion />
                </Button>
              ) : null}
              <Button size={"icon"} variant={"outline"}>
                <LogOut />
              </Button>
            </div>
          </div>
          {true ? (
            <div className="flex gap-2 pt-8">
              {dataClass?.ownerData.email === user?.email ? (
                <Button onClick={() => setOpenEdit(true)} variant={"default"} className="hover:bg-secondary">
                  Ubah Kelas
                </Button>
              ) : null}
              <Button variant={"outline"}>Lihat Anggota</Button>
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
      {openEdit && <EditClassroomDetail data={dataClass!} dialogHandler={() => setOpenEdit(!openEdit)} open={openEdit} />}
    </>
  );
};

export default TeacherClassroom;
