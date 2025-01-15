"use client";

import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { getEventByUidClassUser, getClassByUidClassUser, getTaskUserByUidAndEmail } from "@/app/actions/api-actions";
import { notFound } from "next/navigation";
import { IGroupClass, IResponseTaskUpload, IEvent, ITaskResponse, IFileTask } from "@/lib/types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileUploadDialog from "@/components/subject/event-submit";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadAssignment } from "@/app/actions/auth-actions";
import { toast } from "sonner";
import { useAuth } from "@/hooks/context/AuthProvider";
import { formatDate } from "@/lib/functions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Event = () => {
  const { slug, event } = useParams() as { slug: string; event: string };
  const { user } = useAuth();
  const [dataEvent, setDataEvent] = useState<IEvent | null>(null);
  const [userData, setUserData] = useState<IGroupClass | undefined>(undefined);
  const [taskData, setTaskData] = useState<IFileTask[] | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await getEventByUidClassUser(event, slug);
      if (!user?.uidClassUser) {
        notFound();
        return;
      }
      const classData = await getClassByUidClassUser(user.uidClassUser);
      const taskResponse: ITaskResponse = user?.email
        ? await getTaskUserByUidAndEmail(event, user.email)
        : {
            code: 400,
            success: false,
            message: "User email is not available",
            data: {
              status: "NOT_COLLECTING",
              fileTask: [],
            },
          };

      const filteredEvent = eventData?.find((data) => data.id === parseInt(event));
      const filteredData = classData?.find((data) => data.uid === slug);

      if (!filteredData) {
        notFound();
      } else {
        setDataEvent(filteredEvent!);
        setUserData(filteredData);
        setTaskData(taskResponse?.data?.fileTask || []);
      }
    };
    fetchData();
  }, [slug, event, user?.email, user?.uidClassUser]);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    if (!user?.email) {
      toast.error("User email is not available");
      return;
    }
    toast.promise(uploadAssignment(user.email, event, file), {
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
        return error;
      },
      finally() {
        setLoading(false);
      },
    });
    setDialogOpen(false);
  };

  if (loading || !dataEvent) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Icon icon="tabler:loader" style={{ fontSize: "48px" }} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full p-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">{dataEvent.title}</h2>
              <p className="text-sm text-muted-foreground">Posted by {userData?.ownerData.name}</p>
              <p className="text-sm text-muted-foreground">
                Deadline: <span className="font-medium">{formatDate(dataEvent.dueDateAt)}</span>
              </p>
            </div>
            {dataEvent.status === "OPEN" ? (
              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Tersedia</Badge>
            ) : (
              <Badge variant={"destructive"} className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                Kadaluarsa
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">{dataEvent.description}</p>
          <div>
            {userData?.ownerData.email !== user?.email && (
              <ul className="space-y-2">
                <h3 className="text-lg font-medium">Your Submitted Files</h3>
                {taskData?.length ? (
                  taskData.map((task) => (
                    <li key={task.id} className="flex items-center space-x-2">
                      <Icon icon="heroicons-outline:document-text" className="h-5 w-5" />
                      <a
                        href={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${task.url}`}
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer">
                        {task.fileName.toLowerCase()}
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No files submitted yet.</p>
                )}
              </ul>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_WS_URL?.replace("10073", "10059")}${userData?.ownerData.imageUrl}`}
                alt={userData?.ownerData.name}
              />
              <AvatarFallback>
                {userData?.ownerData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {userData?.ownerData.name} {userData?.ownerData.email === user?.email ? "( Anda )" : ""}
              </p>
              <p className="text-sm text-muted-foreground">{userData?.ownerData.email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {dataEvent.status === "OPEN" ? (
            user?.email === userData?.ownerData.email ? (
              <Link href={`/teacher`} className="w-full rounded-md bg-secondary px-4 py-2 text-center text-white">
                View In Teacher Dashboard
              </Link>
            ) : (
              <Button
                className="w-full hover:bg-accent"
                disabled={loading || (taskData !== null && taskData.length > 0)}
                variant={"default"}
                onClick={() => setDialogOpen(true)}
              >
                <Icon icon="heroicons:cloud-arrow-up-20-solid" className="mr-2 h-4 w-4" />
                {taskData && taskData.length > 0 ? "Assignment Submitted" : "Submit Assignment"}
              </Button>
            )
          ) : (
            <Button className="w-full" disabled>
              <Icon icon="heroicons:cloud-arrow-up-20-solid" className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
          )}
        </CardFooter>
      </Card>
      <FileUploadDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} onUpload={handleFileUpload} />
    </div>
  );
};

export default Event;
