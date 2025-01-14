import { IRequestEditEvent, IResponseEditEvent } from "@/lib/types/Types";

export const UseEditEvent = async ({
  title,
  dueDate,
  maxScore,
  description,
  id,
}: {
  title: string;
  dueDate: string;
  maxScore: number;
  description: string;
  id: string;
}) => {
  try {
    const requestBody = { title, dueDate, maxScore, description, id } as IRequestEditEvent;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IResponseEditEvent = await res.json();

    if (res.ok && data.success && data.code === 200) {
      console.log("Class edited successfully:", data.data);
      return data;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while editing a class:", error);
    return null;
  }
};
