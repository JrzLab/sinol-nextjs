import { IUserDataProps, IUserProps } from "@/lib/types/Types";

export const UseGetUser = async (userEmail: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: IUserProps = await res.json();

    if (data.success && data.code === 200) {
      return data.data as IUserDataProps;
    } else {
      console.warn(`API responded with an error.`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching user data:`, error);
  }
};
