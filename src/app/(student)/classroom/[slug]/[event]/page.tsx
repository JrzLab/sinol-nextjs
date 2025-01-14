"use client";

import { Icon } from "@iconify/react"; 
import { useParams } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { getEventByUidClassUser, getClassByUidClassUser } from "@/app/actions/api-actions";
import { notFound } from "next/navigation";
import { IGroupClass, IResponseTaskUpload, IEvent } from "@/lib/types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import FileUploadDialog from "@/components/subject/event-submit";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadAssignment } from "@/app/actions/auth-actions";
import { toast } from "sonner";
import { useAuth } from "@/hooks/context/AuthProvider";
import { formatDate } from "@/lib/functions";

const Event = () => {
  const { slug, event } = useParams() as { slug: string; event: string };
  const { user } = useAuth();
  const [dataEvent, setDataEvent] = useState<IEvent | null>(null);
  const [userData, setUserData] = useState<IGroupClass | undefined>(undefined);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await getEventByUidClassUser(event, slug);
      const classData = await getClassByUidClassUser(user?.uidClassUser!);

      const filteredEvent = eventData?.find((data) => data.id === parseInt(event));
      const filteredData = classData?.find((data) => data.uid === slug);

      if (!filteredData) {
        notFound();
      } else {
        setDataEvent(filteredEvent!);
        setUserData(filteredData);
      }
    };
    fetchData();
  }, [slug, event]);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    toast.promise(uploadAssignment(user?.email!, event, file), {
      loading: "Uploading assignment...",
      success: async (response) => {
        const typedResponse = response as IResponseTaskUpload;
        if (typedResponse.success && typedResponse.code === 200) {
          return typedResponse.message;
        } else {
          throw new Error(typedResponse.message);
        }
      },
      error: (error) => {
        console.error("Error uploading assignment:", error);
        throw error;
      },
      finally() {
        setLoading(false);
      },
    });
    setDialogOpen(false);
  };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-[80vh]">
          <Icon icon="tabler:loader" style={{ fontSize: "48px" }} className="animate-spin" />
        </div>
      );
    }

  if (!dataEvent) return null;

  return (
    <div className="flex w-full flex-col gap-2 text-sm">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{dataEvent.title}</h1>
            <p>{dataEvent.status === "OPEN" ? <span className="rounded-md bg-green-200 p-2">Tersedia</span> : "Tidak tersedia"}</p>
          </div>
          <p>{dataEvent.description}</p>
          <p className="mt-2">Max Nilai: <span className="bg-green-200 rounded-md text-sm px-3 p-1">{dataEvent.maxScore}</span></p>
          <p className="mt-2">Deadline: <span className="bg-green-200 rounded-md text-sm px-3 p-1">{formatDate(dataEvent.dueDateAt)}</span></p>
        </CardHeader>
        <hr />
        <CardHeader className="flex-row items-end gap-2">
          <Avatar className="flex items-center">
            <AvatarImage
              width={50}
              height={50}
              className="rounded-lg"
              src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${userData?.ownerData.imageUrl}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <h1>{userData?.ownerData.name}</h1>
            <p>{userData?.ownerData.email}</p>
          </div>
        </CardHeader>
      </Card>
      <Button disabled={loading} variant={"default"} className="mt-10 hover:bg-accent" onClick={() => setDialogOpen(true)}>
        Submit Assignment
      </Button>
      <FileUploadDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} onUpload={handleFileUpload} />
    </div>
  );
};

export default Event;
