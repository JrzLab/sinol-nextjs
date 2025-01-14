import { IRequestCreateEvent, IResponseCreateEvent } from "@/lib/types/Types";

export const UseDeleteEvent = async ({ uid }: { uid: string }) => {
  try {
    const requestBody = { uid };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/event/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IResponseCreateEvent = await res.json();

    if (res.ok && data.success && data.code === 200) {
      console.log("Class deleted successfully:", data.data);
      return data;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while deleting a class:", error);
    return null;
  }
};
