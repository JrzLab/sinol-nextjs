"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { subjectStaticData } from "@/lib/staticData";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "../ui/popover";
import { Bell, PanelLeftOpen, SquareUser } from "lucide-react";
import OutConfirmation from "../popup/out-confirmation";
import { getSubjectDataEachDay } from "@/lib/functions";
import { ISubject } from "@/lib/types/Types";
import DataTable from "../table/data-table";

interface Day {
  day: number | string;
  data: ISubject[];
}

const SubjectCard = ({ data, format, today }: { data: ISubject[]; format?: boolean; today?: boolean }) => {
  const [subjectData, setSubjectData] = useState<ISubject[]>([]);
  const [subjectDataByDay, setSubjectDataByDay] = useState<Day[]>([]);
  const [confirmationPopup, setConfirmationPopup] = useState<boolean>();
  const [itemDelete, setItemDelete] = useState<number>();

  const getSubjectDataToday = () => {
    const today = new Date().getDay();
    console.log(today);
    const list: ISubject[] = [];
    data.forEach((item) => {
      if (item.day == today) {
        list.push(item);
      }
    });
    return setSubjectData(list);
  };

  const togglePopUp = () => {
    setConfirmationPopup(!confirmationPopup);
  };

  const Confirmation = (id: number) => {
    setItemDelete(id);
    setConfirmationPopup(!confirmationPopup);
  };

  useEffect(() => {
    setSubjectDataByDay(getSubjectDataEachDay({ subjects: data }));
    format ? getSubjectDataEachDay({ subjects: data }) : today ? getSubjectDataToday() : setSubjectData(data);
  }, []);

  return (
    <>
      {format ? (
        subjectDataByDay.map((data) => (
          <div className="grid gap-4" key={data.day}>
            <h1 className="mt-6">{data.day}</h1>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {data.data.map((subject) => (
                <Popover key={subject.id}>
                  <Card className="flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-col">
                          <Link href={`/classroom/${subject.id}`} className="text-xl font-bold hover:underline">
                            {subject.title}
                          </Link>
                          <p className="text-sm">{subject.teacher}</p>
                        </div>
                        <PopoverTrigger className="mt-2 rounded-md bg-primary px-3 py-2 text-white">
                          <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
                        </PopoverTrigger>
                      </div>
                    </CardHeader>
                    <div>
                      <CardContent>
                        <p>{subject.description}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm font-light">{subject.notifications} Notifications</p>
                      </CardFooter>
                    </div>
                  </Card>
                  <PopoverContent className="grid w-auto justify-items-start gap-2">
                    <Button className="flex w-full justify-start gap-2" variant={"ghost"} onClick={() => Confirmation(subject.id)}>
                      <PanelLeftOpen /> keluar kelas{" "}
                    </Button>
                    <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                      <Bell /> Cek event terbaru{" "}
                    </Button>
                    <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                      <SquareUser /> Hubungi Dosen{" "}
                    </Button>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {subjectData.map((subject) => (
            <Popover key={subject.id}>
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Link href={`/classroom/${subject.id}`} className="text-xl font-bold hover:underline">
                        {subject.title}
                      </Link>
                      <p className="text-sm">{subject.teacher}</p>
                    </div>
                    <PopoverTrigger className="mt-2 rounded-md bg-primary px-3 py-2 text-white">
                      <Icon icon="tabler:dots" style={{ width: "24px", height: "24px" }} />
                    </PopoverTrigger>
                  </div>
                </CardHeader>
                <div>
                  <CardContent>
                    <p>{subject.description}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm font-light">{subject.notifications} Notifications</p>
                  </CardFooter>
                </div>
              </Card>
              <PopoverContent className="grid w-auto justify-items-start gap-2">
                <Button className="flex w-full justify-start gap-2" variant={"ghost"} onClick={() => Confirmation(subject.id)}>
                  <PanelLeftOpen /> keluar kelas{" "}
                </Button>
                <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                  <Bell /> Cek event terbaru{" "}
                </Button>
                <Button className="flex w-full justify-start gap-2" variant={"ghost"}>
                  <SquareUser /> Hubungi Dosen{" "}
                </Button>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
      {confirmationPopup ? itemDelete ? <OutConfirmation toggle={togglePopUp} id={itemDelete}></OutConfirmation> : null : null}
    </>
  );
};

export default SubjectCard;
