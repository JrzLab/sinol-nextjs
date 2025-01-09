import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const response = await fetch(`${process.env.BACKEND_URL}/class/${params.slug}`);
    const data = await response.json();
    return NextResponse.json(data);
}