import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

export async function POST(req: Request) {
  const body = await req.json();

 const res = await fetch(`${BACKEND_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const response = NextResponse.json(await res.json());

// ❗ ПРОПУСТИТИ COOKIE З BACKEND
const setCookie = res.headers.get("set-cookie");

if (setCookie) {
  response.headers.set("set-cookie", setCookie);
}

return response;
}