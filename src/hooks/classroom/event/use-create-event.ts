import { IRequestCreateEvent, IResponseCreateEvent } from "@/lib/types/Types";

export const UseCreateEvent = async ({
  title,
  dueDate,
  maxScore,
  description,
  uid,
}: {
  title: string;
  dueDate: string;
  maxScore: number;
  description: string;
  uid: string;
}) => {
  try {
    const requestBody = { title, dueDate, maxScore, description, uid } as IRequestCreateEvent;

    console.log("reere", requestBody);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/${uid}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IResponseCreateEvent = await res.json();
    console.log(data);

    if (res.ok && data.success && data.code === 200) {
      console.log("Class created successfully:", data.data);
      return data;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while creating a class:", error);
    return null;
  }
};
