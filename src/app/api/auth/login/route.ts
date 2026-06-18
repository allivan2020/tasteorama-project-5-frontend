import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: Request) {
  const body = await req.json();

  const res = await axios.post(`${BACKEND_URL}/auth/login`, body, {
    withCredentials: true,
  });

  const response = NextResponse.json(res.data);

  const setCookie = res.headers["set-cookie"];

  if (setCookie) {
    for (const cookie of setCookie) {
      response.headers.append("set-cookie", cookie);
    }
  }

  return response;
}