import { IResponseEvent } from "@/lib/types/Types";

export const UseGetEvent = async (classUid: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/${classUid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: IResponseEvent = await res.json();

    if (data.success && data.code === 200) {
      console.log(data);

      return data;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching subjects:`, error);
  }
};
