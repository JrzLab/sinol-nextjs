"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "../ui/popover";
import { Bell, PanelLeftOpen, SquareUser } from "lucide-react";
import OutConfirmation from "../popup/out-confirmation";
import { getSubjectDataEachDay, truncateText } from "@/lib/functions";
import { IClassResponse, IGroupClass, ISubject, IUserData } from "@/lib/types/Types";
import DataTable from "../table/data-table";
import GeneralAlert from "../popup/general-alert";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { getClassByUidClassUser } from "@/app/actions/api-actions";
import { useAuth } from "@/hooks/context/AuthProvider";

interface Day {
  day: string;
  data: IGroupClass[];
}

const SubjectCard = ({ format, data }: { format?: boolean; data?: IGroupClass[] }): React.ReactNode => {
  const { user } = useAuth();

  const [subjects, setSubjects] = useState<IGroupClass[]>([]);
  const [subjectDataByDay, setSubjectDataByDay] = useState<Day[]>([]);
  const [confirmationPopup, setConfirmationPopup] = useState<boolean>();
  const [itemDelete, setItemDelete] = useState<number>();
  const hasFetched = useRef(false);

  const togglePopUp = () => {
    setConfirmationPopup(!confirmationPopup);
  };

  const Confirmation = (id: number) => {
    setItemDelete(id);
    setConfirmationPopup(!confirmationPopup);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (hasFetched.current) return;
        const today = new Date().getDay();
        const listedData = getSubjectDataEachDay({ subjects: data as IGroupClass[] });
        const list: IGroupClass[] = [];
        data?.forEach((item) => {
          if (item.day == today) {
            list.push(item);
          }
        });
        format ? setSubjectDataByDay(listedData) : setSubjects(list);
      } catch (error: any) {
        console.error(error);
      } finally {
        hasFetched.current = true;
      }
    };
    fetchSubjects();
  }, [user?.uidClassUser!]);

  const outConfirmation = (status: boolean) => {
    if (status) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(false);
    }
  };

  return (
    <>
      {format ? (
        subjectDataByDay.map((data, index) => (
          <div className="grid gap-4" key={index + data.day}>
            <h1 className="mt-6">{data.day}</h1>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {data.data.map((subject, index) => (
                <Popover key={subject.uid + index}>
                  <Card className="flex flex-col justify-between text-foreground">
                    <CardHeader>
                      <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-col">
                          <Link href={`/classroom/${subject.uid}`} className="text-xl font-bold hover:underline">
                            {subject.className}
                          </Link>
                          <p className="text-sm text-foreground">{subject.ownerData.name}</p>
                        </div>
                        <PopoverTrigger className="mt-2 rounded-md bg-primary px-3 py-2 text-white hover:bg-secondary">
                          <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
                        </PopoverTrigger>
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
                  <PopoverContent className="grid w-auto justify-items-start gap-2 bg-card p-2">
                    <Button className="flex w-full justify-start gap-2" variant={"ghost"} onClick={() => Confirmation(subject.uid)}>
                      <PanelLeftOpen /> Keluar Kelas{" "}
                    </Button>
                    <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                      <Bell /> Lihat Tugas{" "}
                    </Button>
                    <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                      <SquareUser /> Hubungi{" "}
                    </Button>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {subjects?.map((subject, index) => (
            <Popover key={subject.day + index}>
              <Card className="flex flex-col justify-between text-foreground">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Link href={`/classroom/${subject.uid}`} className="text-xl font-bold hover:underline">
                        {subject.className}
                      </Link>
                      <p className="text-sm">{subject.ownerData.name}</p>
                    </div>
                    <PopoverTrigger className="mt-2 rounded-md bg-primary px-3 py-2 text-white hover:bg-secondary">
                      <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
                    </PopoverTrigger>
                  </div>
                </CardHeader>
                <div>
                  <CardContent>
                    <p>{subject.description}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm font-light">{subject.day} Notifikasi</p>
                  </CardFooter>
                </div>
              </Card>
              <PopoverContent className="grid w-auto justify-items-start gap-2 bg-card p-2">
                <Button className="flex w-full justify-start gap-2" variant={"ghost"} onClick={() => Confirmation(subject.uid)}>
                  <PanelLeftOpen /> Keluar Kelas{" "}
                </Button>
                <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                  <Bell /> Lihat Tugas{" "}
                </Button>
                <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                  <SquareUser /> Hubungi{" "}
                </Button>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
      {confirmationPopup ? (
        itemDelete ? (
          <GeneralAlert open title="Apakah Anda Yakin?" description="Tindakan ini tidak dapat diurungkan">
            <AlertDialogCancel onClick={() => outConfirmation(false)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={() => outConfirmation(true)}>Keluar</AlertDialogAction>
          </GeneralAlert>
        ) : null
      ) : null}
    </>
  );
};

export default SubjectCard;
