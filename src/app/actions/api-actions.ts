import { useGetClass } from "@/hooks/classroom/use-get-class";
import { IClassRoomCreate } from "../api/classroom/create/route";
import { useCreateClass } from "@/hooks/classroom/use-create-class";
import { useGetUser } from "@/hooks/user/use-get-user";

const getClassByUidClassUser = async (uid: string) => {
  const data = await useGetClass(uid);
  return data;
};

const createClassByUidClassUser = async ({ email, uid, className, description, day }: IClassRoomCreate) => {
  const data = await useCreateClass({ email, uid, className, description, day });
  return data;
};

const getUserData = async () => {
  const data = await useGetUser("fatihattala666@gmail.com");
  return data;
};
export { getClassByUidClassUser, createClassByUidClassUser, getUserData };
