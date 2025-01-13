import { UseGetSubjects } from "@/hooks/classroom/use-get-class";
import { IClassRoomCreate } from "../api/classroom/create/route";
import { UseCreateClass } from "@/hooks/classroom/use-create-class";
import { UseGetUser } from "@/hooks/user/use-get-user";

const getClassByUidClassUser = async (uid: string) => {
  const data = await UseGetSubjects(uid);
  return data;
};

const createClassByUidClassUser = async ({ email, uid, className, description, day }: IClassRoomCreate) => {
  const data = await UseCreateClass({ email, uid, className, description, day });
  return data;
};

const getUserData = async () => {
  const data = await UseGetUser("fatihattala666@gmail.com");
  return data;
};
export { getClassByUidClassUser, createClassByUidClassUser, getUserData };
