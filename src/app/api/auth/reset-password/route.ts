import { NextRequest, NextResponse } from "next/server";
import { IResetPassword } from "@/lib/types/Types";

export async function POST(req: NextRequest) {
  try {
    const { email, password, token } = await req.json();
    
    const decodedPassword = Buffer.from(password, "base64").toString("utf-8");

    const response = await fetch(`${process.env.BACKEND_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: decodedPassword,
        token,
      }),
    });

    const data: IResetPassword = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(data, { status: data.code });
    }

    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.",
    }, { status: 500 });
  }
}
