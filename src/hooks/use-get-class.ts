import { IClassResponse, IGroupClass } from "@/lib/types/Types";

export const useGetSubjects = async (uid: string) => {
  try {
    
    const res = await fetch(`http://ip-51-79-152-83.raznar-net.my.id:10059/class/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: IClassResponse = await res.json();

    if (data.success && data.code === 200) {
      return data.data.groupClass as IGroupClass[];
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching subjects:`, error);
  }
};
