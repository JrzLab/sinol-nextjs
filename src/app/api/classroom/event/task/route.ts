import { ITaskResponse } from "@/lib/types/Types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid, email } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ message: "Bad request: Missing required fields" }, { status: 400 });
    }
    const response = await fetch(`${process.env.BACKEND_URL}/class/task/${uid}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ITaskResponse = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
  }
}
