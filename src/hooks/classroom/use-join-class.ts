import { IResponseJoinClass } from "@/lib/types/Types";

export interface IJoinRequestProps {
  uidClass: string;
  uidClassUser: string;
}

export const UseJoinClass = async ({ uidClass, uidClassUser }: IJoinRequestProps) => {
  try {
    const requestBody = {
      uidClass,
      uidClassUser,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IResponseJoinClass = await res.json();
    console.log(data);

    if (res.ok && data.success && data.code === 200) {
      console.log("Class joined successfully:", data.data);
      return data;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while joining a class:", error);
    return null;
  }
};
