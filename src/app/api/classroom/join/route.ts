import { NextResponse, NextRequest } from "next/server";

export interface IJoinRequestProps {
  uidClass: string;
  uidClassUser: string;
}

export async function POST(req: NextRequest) {
  try {
    const { uidClass, uidClassUser }: IJoinRequestProps = await req.json();
    if (!uidClass || !uidClassUser) {
      return NextResponse.json({ message: "Bad request: Missing required fields" }, { status: 400 });
    }
    const response = await fetch(`${process.env.BACKEND_URL}/class/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uidClass, uidClassUser }),
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
