"use client";

import { Icon } from "@iconify/react";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getSubjectDataEachDay, truncateText } from "@/lib/functions";
import { IGroupClass, IEvent } from "@/lib/types/Types";
import GeneralAlert from "../popup/general-alert";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { useAuth } from "@/hooks/context/AuthProvider";
import { getEventByUidClassUser } from "@/app/actions/api-actions";

interface Day {
  day: string;
  data: IGroupClass[];
}

const SubjectCard = ({ format, data }: { format?: boolean; data?: IGroupClass[] }): React.ReactNode => {
  const { user } = useAuth();
  
  const [subjects, setSubjects] = useState<IGroupClass[]>([]);
  const [subjectDataByDay, setSubjectDataByDay] = useState<Day[]>([]);
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmationPopup, setConfirmationPopup] = useState<boolean>();
  const hasFetched = useRef(false);

  console.log(eventsData)

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.uidClassUser) return;

      try {
        setLoading(true);
        if (hasFetched.current) return;

        const listedData = getSubjectDataEachDay({ subjects: data as IGroupClass[] });

        const subjectUids = data?.map((item) => item.uid) || [];

        if (subjectUids.length > 0) {
          const allEvents = await Promise.all(
            subjectUids.map((uid) => user?.uidClassUser ? getEventByUidClassUser(user.uidClassUser, uid) : Promise.resolve(null))
          );

          const resolvedSubjects = (data || []).map((subject, index) => ({
            ...subject,
            events: allEvents[index],
          }));

          if (format) {
            setSubjectDataByDay(listedData);
          } else {
            setSubjects(resolvedSubjects as IGroupClass[]);
          }

          setEventsData(resolvedSubjects.flatMap((subject) => subject.events || []));
        }
      } catch (error) {
        console.error("Error fetching subjects or events:", error);
      } finally {
        hasFetched.current = true;
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user?.uidClassUser, format, data]);

  const outConfirmation = (status: boolean) => {
    if (status) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Icon icon="tabler:loader" style={{ fontSize: "48px" }} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      {format ? (
        subjectDataByDay &&
        subjectDataByDay.map((data, index) => (
          <div className="grid gap-4" key={index + data.day}>
            <h1 className="mt-6">{data.day}</h1>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {data.data.map((subject, index) => (
                <Card key={index - Math.random()} className="flex flex-col justify-between text-foreground">
                  <CardHeader>
                    <div className="flex flex-row items-start justify-between">
                      <div className="flex flex-col">
                        <Link href={`/classroom/${subject.uid}`} className="text-xl font-bold hover:underline">
                          {subject.className}
                        </Link>
                        <p className="text-sm text-foreground">{subject.ownerData.name}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <div>
                    <CardContent>
                      <p>{truncateText(subject.description, 100)}</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-light">{subject.className} Notifikasi</p>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {subjects &&
            subjects.map((subject, index) => (
              <Card key={index - Math.random()} className="flex flex-col justify-between text-foreground">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Link href={`/classroom/${subject.uid}`} className="text-xl font-bold hover:underline">
                        {subject.className}
                      </Link>
                      <p className="text-sm">{subject.ownerData.name}</p>
                    </div>
                  </div>
                </CardHeader>
                <div>
                  <CardContent>
                    <p>{truncateText(subject.description, 100)}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm font-light">{subject.day} Notifikasi</p>
                  </CardFooter>
                </div>
              </Card>
            ))}
        </div>
      )}
      {confirmationPopup ? (
        <GeneralAlert open title="Apakah Anda Yakin?" description="Tindakan ini tidak dapat diurungkan">
          <AlertDialogCancel onClick={() => outConfirmation(false)}>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => outConfirmation(true)}>Keluar</AlertDialogAction>
        </GeneralAlert>
      ) : null}
    </>
  );
};

export default SubjectCard;
