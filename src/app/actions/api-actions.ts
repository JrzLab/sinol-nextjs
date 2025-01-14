import { UseGetSubjects } from "@/hooks/classroom/use-get-class";
import { IClassRoomCreate } from "../api/classroom/create/route";
import { UseCreateClass } from "@/hooks/classroom/use-create-class";
import { UseGetUser } from "@/hooks/user/use-get-user";
import { IJoinRequestProps, UseJoinClass } from "@/hooks/classroom/use-join-class";
import { IEvent, IResponseJoinClass } from "@/lib/types/Types";
import { UseGetEvent } from "@/hooks/classroom/event/use-get-event";

const getClassByUidClassUser = async (uid: string) => {
  const data = await UseGetSubjects(uid);
  return data;
};

const createClassByUidClassUser = async ({ email, uid, className, description, day }: IClassRoomCreate) => {
  const data = await UseCreateClass({ email, uid, className, description, day });
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
  const subjectData = await UseGetSubjects(uid);
  const eventData = subjectData?.find((data) => data.uid == classUid);
  console.log(eventData);

  const data = await UseGetEvent("fe612ce0");
  return data?.data as IEvent[];
};

export { getClassByUidClassUser, createClassByUidClassUser, getUserData, joinClassByUidClassUser, getEventByUidClassUser };
