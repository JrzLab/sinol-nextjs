import { useGetSubjects } from "@/hooks/use-get-class"

const getClassByUidClassUser = async (uid: string) => { 
  const data = await useGetSubjects(uid);
  return data;
}

export {
  getClassByUidClassUser
}