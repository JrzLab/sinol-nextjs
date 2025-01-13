import { IClassResponse } from "@/lib/types/Types";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ success: false, message: "Slug is required." }, { status: 400 });
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    console.error("BACKEND_URL is not defined in environment variables.");
    return NextResponse.json({ success: false, message: "Internal server error. Missing backend URL." }, { status: 500 });
  }

  try {
    const response = await fetch(`${backendUrl}/class/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Backend returned an error: ${response.status}`);
      return NextResponse.json({ success: false, message: `Failed to fetch data. Status: ${response.status}` }, { status: response.status });
    }

    const data = (await response.json()) as IClassResponse;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error while fetching data from backend:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
