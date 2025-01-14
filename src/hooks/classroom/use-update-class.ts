import { IClassResponse, IRequestEditClass } from "@/lib/types/Types";

export const UseUpdateClass = async ({ className, description, uid, email, day }: IRequestEditClass) => {
  try {
    const requestBody = { className, description, uid, email, day };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classroom/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: IClassResponse = await res.json();

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
