import { UseGetSubjects } from "@/hooks/use-get-class"

const getClassByUidClassUser = async (uid: string) => { 
  const data = await UseGetSubjects(uid);
  return data;
}

export {
  getClassByUidClassUser
}