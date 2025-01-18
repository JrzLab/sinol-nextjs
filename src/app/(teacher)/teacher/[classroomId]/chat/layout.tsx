"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import ListStudent from "@/components/chat/teacher/list-student";
import { useAuth } from "@/hooks/context/AuthProvider";
import { IGroupClass, IStudent, IStudentResponse } from "@/lib/types/Types";
import { useEffect, useState } from "react";
import { getClassByUidClassUser } from "@/app/actions/api-actions";

const ConversationLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const classroomId = useParams().classroomId as string;
  const [dataClass, setDataClass] = useState<IGroupClass>();
  const [userMessage, setUserMessage] = useState<IStudent[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uidClassUser) {
        const data = await getClassByUidClassUser(user.uidClassUser);
        const dataClas = data!.find((data) => data.uid == classroomId);
        setDataClass(dataClas);
      }
    };

    fetchData();
  }, [user, setDataClass, classroomId]);

  useEffect(() => {
    const fetchData = async () => {
      if (dataClass) {
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
        const dataFetch = await fetch(
          `${wsUrl?.includes("localhost") ? wsUrl.replace("3001", "3002") : wsUrl?.replace("10073", "10059")}/websocket/chat/admin/history`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailUser1: dataClass?.ownerData.email, groupClassUid: classroomId }),
          },
        );
        const dataJson: IStudentResponse = await dataFetch.json();
        setUserMessage(dataJson.data.messageData);
      }
    };

    fetchData();
  }, [dataClass, classroomId, setUserMessage]);

  return (
    <>
      <Card className="w-full pb-3 text-foreground min-[1920px]:h-[700px]">
        <div className="block md:hidden">
          <ListStudent classroomId={classroomId} students={userMessage!} />
          {children}
        </div>
        <div className="hidden md:block">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40} minSize={30}>
              <Separator orientation="horizontal" />
              <ListStudent classroomId={classroomId} students={userMessage!} />
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden md:flex" />
            <ResizablePanel defaultSize={60} minSize={40} className="hidden md:block">
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Card>
    </>
  );
};

export default ConversationLayout;
