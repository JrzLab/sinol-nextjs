import { NextRequest, NextResponse } from "next/server";
import { ISignUpResponse } from "@/lib/types/Types";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const firstName = typeof email === "string" ? email.split("@")[0] : "";

    const response = await fetch(`${process.env.BACKEND_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
      }),
    });

    const data: ISignUpResponse = await response.json();

    if (!response.ok || !data.success) {
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
