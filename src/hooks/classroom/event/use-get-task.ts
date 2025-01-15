import { ITaskResponse } from "@/lib/types/Types";

export const UseGetTask = async (uid: string, email: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/event/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, email }),
    });
    const data: ITaskResponse = await res.json();
    if (data.success && data.code === 200) {
      return data as ITaskResponse
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching task:`, error);
  }
};
