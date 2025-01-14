"use client";

import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { getEventByUidClassUser, getUserData } from "@/app/actions/api-actions";
import { notFound } from "next/navigation";
import { IUserDataProps } from "@/lib/types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import FileUploadDialog from "@/components/subject/event-submit";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadAssignment } from "@/app/actions/auth-actions";
import { toast } from "sonner";
import { IResponseTaskUpload } from "@/lib/types/Types";

const Event = () => {
  const { slug, event } = useParams() as { slug: string; event: string };
  const [dataEvent, setDataEvent] = useState<any | null>(null);
  const [userData, setUserData] = useState<IUserDataProps | undefined>(undefined);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = Cookies.get("userId");
      const eventData = await getEventByUidClassUser(event, slug);
      const user = userEmail ? await getUserData(userEmail) : undefined;
      const filteredData = eventData?.find((data) => data.id === parseInt(event));

      if (!filteredData) {
        notFound();
      } else {
        setDataEvent(filteredData);
        setUserData(user);
      }
    };

    fetchData();
  }, [slug, event]);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    toast.promise(uploadAssignment(userData?.email!, event, file), {
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

  if (!dataEvent) return null;

  return (
    <div className="flex w-full flex-col gap-2 text-sm">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">{dataEvent.title}</h1>
          <p>{dataEvent.description}</p>
        </CardHeader>
        <hr />
        <CardHeader className="flex-row items-end gap-2">
          <Avatar className="flex items-center">
            <AvatarImage
              width={50}
              height={50}
              className="rounded-lg"
              src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${userData?.imageUrl}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <h1>
              {userData?.firstName} {userData?.lastName}
            </h1>
            <p>{userData?.email}</p>
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
