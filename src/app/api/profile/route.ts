import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function GET() {
  const cookieHeader = cookies().toString();

  const res = await axios.get(`${BACKEND_URL}/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return NextResponse.json(res.data);
}