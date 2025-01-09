import { NextResponse, NextRequest } from "next/server";

interface IClassRoomCreate {
  email: string;
  uid: string;
  className: string;
  description: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, uid, className, description }: IClassRoomCreate = await req.json();
    if (!email || !uid || !className || !description) {
      return NextResponse.json({ message: "Bad request: Missing required fields" }, { status: 400 });
    }
    const response = await fetch(`${process.env.BACKEND_URL}/class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        uid,
        className,
        description,
      }),
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
