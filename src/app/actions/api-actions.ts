import { IClassResponse, IGroupClass } from "@/lib/types/Types";

const getSubjects = async (uid: string) => {
  try {
    if (!uid || typeof uid !== "string") {
      console.error("Invalid UID:", uid);
      return [];
    }

    const res = await fetch(`/api/classroom/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await res.json()) as IClassResponse;

    if (data.success && data.code === 200) {
      return data.data.groupClass as IGroupClass[];
    } else {
      console.warn(`API responded with an error. Code: ${data.code}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching subjects:`, error);
  }
};

export { getSubjects };
