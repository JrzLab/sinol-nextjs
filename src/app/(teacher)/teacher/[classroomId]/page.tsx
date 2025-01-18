"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/subject/event-card";
import { Button } from "@/components/ui/button";
import { getClassByUidClassUser, getEventByUidClassUser } from "@/app/actions/api-actions";
import { useAuth } from "@/hooks/context/AuthProvider";
import { IEvent, IGroupClass } from "@/lib/types/Types";
import CreateEventPopUp from "@/components/popup/create-event";
import EditClassroomDetail from "@/components/popup/edit-classroom-detail";
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
        if (dataClas === undefined) {
          router.push("/teacher");
          return;
        }
        setDataClass(dataClas);

        if (dataClas?.uid) {
          const getEventData = await getEventByUidClassUser(user.uidClassUser, dataClas.uid);
          setDataEvent(getEventData || []);
        }
      }
    };

    fetchData();
  }, [user, slug, router]);

  return (
    <>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold md:text-xl">Tugas Kelas</h1>
              <p className="hidden md:block md:text-sm">Daftar tugas yang ada pada kelas {dataClass?.className}</p>
            </div>
            {dataClass && dataClass?.ownerData.email !== user?.email ? null : <Button onClick={() => setOpenEvent(!openEvent)}>Buat Tugas</Button>}
            {openEvent && dataClass?.uid ? <CreateEventPopUp classUid={dataClass.uid} status={() => setOpenEvent(!openEvent)} /> : null}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dataEvent?.map((event) => <EventCard key={event.id} eventData={event} subjectData={dataClass!} role="teacher" />)}
          </div>
        </div>
      </div>
      {openEdit && <EditClassroomDetail data={dataClass!} dialogHandler={() => setOpenEdit(!openEdit)} open={openEdit} />}
    </>
  );
};

export default TeacherClassroom;
