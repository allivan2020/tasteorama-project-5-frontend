import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";

  const res = await fetch(`${BACKEND_URL}/users/me`, {
    headers: {
      Cookie: cookie,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}