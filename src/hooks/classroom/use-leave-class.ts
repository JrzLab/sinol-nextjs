import { IRequestClassroomLeave, IResponseClassroomLeave } from "@/lib/types/Types";

export const UseLeaveClass = async ({ uidClass, uidClassUser }: IRequestClassroomLeave) => {
  try {
    const requestBody = { uidClass, uidClassUser };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IResponseClassroomLeave = await res.json();

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
