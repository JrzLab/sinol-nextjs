import { IClassResponse, IGroupClass } from "@/lib/types/Types";

interface ICreateClassProps {
  email: string;
  uid: string;
  className: string;
  description: string;
  day: string;
}

export const useCreateClass = async ({ email, uid, className, description, day }: ICreateClassProps) => {
  try {
    const requestBody = {
      email,
      uid,
      className,
      description,
      day,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IClassResponse = await res.json();

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
