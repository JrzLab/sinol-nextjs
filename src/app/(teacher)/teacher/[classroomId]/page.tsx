"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/subject/event-card";
import { Button } from "@/components/ui/button";
import { getClassByUidClassUser, getEventByUidClassUser, getUsersClassByUidClass } from "@/app/actions/api-actions";
import { useAuth } from "@/hooks/context/AuthProvider";
import { IEvent, IGroupClass, IViewsUser } from "@/lib/types/Types";
import CreateEventPopUp from "@/components/popup/create-event";
import EditClassroomDetail from "@/components/popup/edit-classroom-detail";
import { LogOut, MessageCircleQuestion, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TeacherClassroom = () => {
  const router = useRouter();
  const { user } = useAuth();
  const params = useParams();
  const slug = params.classroomId as string;
  const [dataClass, setDataClass] = useState<IGroupClass>();
  const [dataEvent, setDataEvent] = useState<IEvent[]>();
  const [dataClassUsers, setDataClassUsers] = useState<IViewsUser[]>();
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
        const getClassUsers = await getUsersClassByUidClass(data.uid);
        if (getEventData !== null) {
          setDataEvent(getEventData);
          setDataClassUsers(getClassUsers);
        } else {
          setDataEvent([]);
          setDataClassUsers([]);
        }
      }
    });
  }, [user, setDataClass, slug, setDataEvent, setDataClassUsers]);

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
              {dataClass?.ownerData.email === user?.email ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-green-400 hover:bg-green-300"
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => router.push(`/teacher/${slug}/chat`)}
                      >
                        <MessageCircleQuestion />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#FFFDF6] text-foreground">
                      <p>Buka Diskusi</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
              {dataClass?.ownerData.email === user?.email ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={() => setOpenEdit(true)} size={"icon"} variant={"default"} className="hover:bg-secondary">
                        <SquarePen />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#FFFDF6] text-foreground">
                      <p>Ubah Detail Kelas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"icon"} variant={"destructive"}>
                      <LogOut />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#FFFDF6] text-foreground">
                    <p>Keluar Kelas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {true ? (
            <div className="flex gap-2 pt-8">
              <Button variant={"outline"} onClick={() => router.push(`/teacher/${slug}/users`)}>
                Lihat Murid
              </Button>
            </div>
          ) : null}
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-3">
          <div className="w-full pt-6">
            <h1 className="font-bold">Pengajar</h1>
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
