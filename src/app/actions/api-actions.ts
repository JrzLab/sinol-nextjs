import { UseGetSubjects } from "@/hooks/classroom/use-get-class";
import { IClassRoomCreate } from "../api/classroom/create/route";
import { UseCreateClass } from "@/hooks/classroom/use-create-class";
import { UseGetUser } from "@/hooks/user/use-get-user";
import { IJoinRequestProps, UseJoinClass } from "@/hooks/classroom/use-join-class";
import { IEvent, IRequestClassroomLeave, IRequestEditClass, IResponseJoinClass, IViewsUser } from "@/lib/types/Types";
import { UseGetEvent } from "@/hooks/classroom/event/use-get-event";
import { UseCreateEvent } from "@/hooks/classroom/event/use-create-event";
import { UseEditEvent } from "@/hooks/classroom/event/use-edit-event";
import { UseDeleteEvent } from "@/hooks/classroom/event/use-delete-event";
import { UseUpdateClass } from "@/hooks/classroom/use-update-class";
import { UseGetUsersClass } from "@/hooks/classroom/use-get-users-class";
import { UseLeaveClass } from "@/hooks/classroom/use-leave-class";

const getClassByUidClassUser = async (uid: string) => {
  const data = await UseGetSubjects(uid);
  return data;
};

const createClassByUidClassUser = async ({ email, uid, className, description, day }: IClassRoomCreate) => {
  const data = await UseCreateClass({ email, uid, className, description, day });
  return data;
};

const leaveClassByUidClassUser = async (uidClass: string, uidClassUser: string) => {
  const data = await UseLeaveClass({ uidClass, uidClassUser });
  return data;
};

const editEventByUidClassUser = async (id: string, title: string, description: string, dueDate: string, maxScore: number) => {
  const data = await UseEditEvent({ id, title, description, dueDate, maxScore });
  return data;
};

const getUserData = async (email: string) => {
  const data = await UseGetUser(email);
  return data;
};

const joinClassByUidClassUser = async ({ uidClass, uidClassUser }: IJoinRequestProps) => {
  const data = await UseJoinClass({ uidClass, uidClassUser });
  return data as IResponseJoinClass;
};

const getEventByUidClassUser = async (uid: string, classUid: string) => {
  const data = await UseGetEvent(uid, classUid);
  if (data?.code === 200 && data?.success === true) {
    return data.data as IEvent[];
  }
};

const createEventByUidClassUser = async (uid: string, title: string, description: string, dueDate: string, maxScore: number) => {
  const data = await UseCreateEvent({ uid, title, description, dueDate, maxScore });
  return data;
};

const deleteEventByUidClassUser = async (uid: string) => {
  const data = await UseDeleteEvent({ uid });
  return data;
};

const updateClassByUidClassUser = async (uid: string, className: string, description: string, email: string, day: string) => {
  const data = await UseUpdateClass({ uid, className, description, email, day });
  return data;
};

const getUsersClassByUidClass = async (uid: string) => {
  const data = await UseGetUsersClass(uid);
  return data as IViewsUser[];
};

export {
  leaveClassByUidClassUser,
  getUsersClassByUidClass,
  updateClassByUidClassUser,
  deleteEventByUidClassUser,
  getClassByUidClassUser,
  createClassByUidClassUser,
  getUserData,
  joinClassByUidClassUser,
  getEventByUidClassUser,
  createEventByUidClassUser,
  editEventByUidClassUser,
};
