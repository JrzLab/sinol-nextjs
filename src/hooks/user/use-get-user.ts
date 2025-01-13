import { IUserData } from "@/lib/types/Types";

export interface IUserDataProps {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
  imageUrl: string | null;
}

export interface IUserProps {
  code: number;
  success: boolean;
  message: string;
  data: IUserDataProps;
}

export const useGetUser = async (userEmail: string) => {
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
