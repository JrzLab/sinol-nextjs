import { IResponseViewUsers } from "@/lib/types/Types";

export const UseGetUsersClass = async (uid: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/${uid}/view-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: IResponseViewUsers = await res.json();
    if (data.success && data.code === 200) {
      return data.data;
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching subjects:`, error);
  }
};
