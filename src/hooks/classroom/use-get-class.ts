import { IClassResponse, IGroupClass } from "@/lib/types/Types";

export const UseGetSubjects = async (uid: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: IClassResponse = await res.json();

    if (data.success && data.code === 200) {
      return data.data.groupClass;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching subjects:`, error);
  }
};
