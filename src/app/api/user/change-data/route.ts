import { IResponseChangeData } from "@/lib/types/Types";
import { NextRequest, NextResponse } from "next/server";
import { ISignInResponse } from "@/lib/types/Types";

export async function POST(req: NextRequest) {
  try {
    const { email, password, newEmail, firstName, lastName } = await req.json();
    
    if (!email || !password) {
      throw new Error("Email current & password is required");
    }
    
    const decodedPassword = Buffer.from(password, "base64").toString("utf-8");

    const validationUser = await fetch(`${process.env.BACKEND_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: decodedPassword,
      }),
    });

    const validationData: ISignInResponse = await validationUser.json();

    if (!validationUser.ok || !validationData.success) {
      return NextResponse.json(validationData, { status: validationData.code });
    }

    const payload = {
      email,
      firstName,
      lastName,
      emailChange: newEmail,
    };

    const response = await fetch(`${process.env.BACKEND_URL}/user/change-data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: IResponseChangeData = await response.json();
    
    if (!response.ok || !data.success) {
        return NextResponse.json(data, { status: data.code });
    }

    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    }, { status: 500 });
  }
}