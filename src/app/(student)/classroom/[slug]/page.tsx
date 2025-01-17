"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EventCard from "@/components/subject/event-card";
import { Button } from "@/components/ui/button";
import { getClassByUidClassUser, getEventByUidClassUser, leaveClassByUidClassUser } from "@/app/actions/api-actions";
import StudentChat from "@/components/chat/student/student-chat";
import BubbleChat from "@/components/chat/bubble-chat";
import { useAuth } from "@/hooks/context/AuthProvider";
import { ChatHistoryResponse, ChatMessage, IEvent, IGroupClass } from "@/lib/types/Types";
import CreateEventPopUp from "@/components/popup/create-event";
import { getSocket } from "@/lib/socket";
import EditClassroomDetail from "@/components/popup/edit-classroom-detail";
import { Loader2, LogOut, MessageCircleQuestion } from "lucide-react";
import GeneralAlert from "@/components/popup/general-alert";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { getDayByNumber } from "@/lib/functions";
import { useRouter } from "next/navigation";

const ClassroomPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const params = useParams();
  const slug = params.slug as string;
  const roomId = useRef<number>(0);
  const isListenerAdded = useRef<boolean>(false);
  const [dataClass, setDataClass] = useState<IGroupClass>();
  const [dataEvent, setDataEvent] = useState<IEvent[]>();
  const [messageData, setMessageData] = useState<ChatMessage[]>([]);
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLeaveAlertOpen, setIsLeaveAlertOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!isListenerAdded.current) {
      getSocket()?.on("updateMessageClient", (data: ChatMessage) => {
        setMessageData((prev) => [...prev, data]);
      });
      isListenerAdded.current = true;
    }
  }, [isListenerAdded]);

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
        `${wsUrl?.includes("localhost") ? wsUrl.replace("3001", "3002") : wsUrl?.replace("10073", "10059")}/websocket/chat/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailUser1: dataClass?.ownerData.email, emailUser2: user?.email }),
        },
      );
      const response = (await data.json()) as ChatHistoryResponse;
      roomId.current = response.data.id;
      setMessageData(response.data.messages);
    }
  };

  const leaveClassHandler = async () => {
    if (!dataClass?.uid || !user?.uidClassUser) {
      return;
    }
    try {
      if (!dataClass?.uid || !user?.uidClassUser) {
        toast.error("Failed to leave class. Missing class or user information.");
        return;
      }
      toast.promise(leaveClassByUidClassUser(dataClass.uid, user.uidClassUser), {
        loading: "Keluar Kelas...",
        success: async (response) => {
          if (response?.code === 200 && response?.success) {
            return response.message;
          }
          throw new Error(response?.message);
        },
        error: (err) => {
          return err.message;
        },
        finally: () => {
          setIsLeaveAlertOpen(!isLeaveAlertOpen);
          setLoading(false);
          window.location.href = "/classroom";
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const copyClassCode = () => {
    if (!dataClass?.uid) {
      toast.error("Kode kelas tidak tersedia.");
      return;
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(dataClass.uid)
        .then(() => {
          toast.success("Kode kelas berhasil disalin!");
        })
        .catch(() => {
          toast.error("Gagal menyalin kode kelas. Coba lagi nanti.");
        });
    } else {
      fallbackCopyText(dataClass.uid);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textarea = document.createElement("textarea");
    try {
      textarea.value = text;

      document.body.appendChild(textarea);
      textarea.select();

      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Kode kelas berhasil disalin!");
        })
        .catch(() => {
          toast.error("Gagal menyalin kode kelas.");
        });
    } catch {
      toast.error("Gagal menyalin kode kelas.");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const getEventLength = dataEvent?.length;

  if (loading || !dataClass || !dataEvent) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 width={50} height={50} className="animate-spin" />;
      </div>
    );
  }

  return (
    <>
      {dataClass && dataClass?.ownerData.email !== user?.email ? (
        <div className="relative">
          <StudentChat
            isOpen={isChatOpen}
            setIsOpen={setIsChatOpen}
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
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold">{dataClass?.className}</h1>
              <p className="mt-4">{dataClass?.description}</p>
            </div>
            <div className="flex flex-row gap-2">
              {dataClass?.ownerData.email !== user?.email ? (
                <Button size={"icon"} variant={"outline"} onClick={() => setIsChatOpen(!isChatOpen)}>
                  <MessageCircleQuestion />
                </Button>
              ) : null}
              <Button variant={"outline"} onClick={copyClassCode}>
                Salin Kode Kelas
              </Button>
              <Button size={"icon"} variant={"outline"} onClick={() => setIsLeaveAlertOpen(true)}>
                <LogOut />
              </Button>
            </div>
          </div>
          {true ? (
            <div className="flex gap-2 pt-8">
              {dataClass?.ownerData.email === user?.email ? (
                <>
                  <Button onClick={() => setOpenEdit(true)} variant={"default"} className="hover:bg-secondary">
                    Ubah Kelas
                  </Button>
                  <Button variant={"outline"} onClick={() => router.push(`/teacher/${dataClass.uid}`)}>
                    Lihat Anggota
                  </Button>
                </>
              ) : null}
            </div>
          ) : null}
        </CardHeader>
        <hr />
        <CardFooter className="grid grid-cols-2 md:grid-cols-4">
          <div className="w-full pt-6">
            <h1 className="font-bold">Pengajar</h1>
            <p>{dataClass?.ownerData.name}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Tugas</h1>
            <p>{getEventLength}</p>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-bold">Kode Kelas</h1>
            <p>{dataClass.uid}</p>
          </div>
          {!!dataClass?.day && (
            <div className="w-full pt-6">
              <h1 className="font-bold">Jadwal</h1>
              <p>{getDayByNumber(dataClass.day)}</p>
            </div>
          )}
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
      <GeneralAlert open={isLeaveAlertOpen} title="Apakah Anda Yakin?" description="Tindakan keluar kelas ini tidak dapat diurungkan atau diulang.">
        <AlertDialogCancel onClick={() => setIsLeaveAlertOpen(false)}>Batal</AlertDialogCancel>
        <AlertDialogAction onClick={() => leaveClassHandler()}>Keluar</AlertDialogAction>
      </GeneralAlert>
    </>
  );
};

export default ClassroomPage;
