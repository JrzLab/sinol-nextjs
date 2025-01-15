import { IRequestEditClass} from "@/lib/types/Types";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { uid, className, description, email, day }: IRequestEditClass = await req.json();
    if (!uid || !className || !description || !email || !day) {
      return NextResponse.json({ message: "Bad request: Missing required fields" }, { status: 400 });
    }
    const response = await fetch(`${process.env.BACKEND_URL}/class/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, className, description, email, day }),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
  }
}
