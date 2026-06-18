import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";

const BACKEND_URL = process.env.BACKEND_URL!;

type User = {
  id: string;
  username: string;
  email: string;
};

export async function GET() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  const res: AxiosResponse<User> = await axios.get(
    `${BACKEND_URL}/users/me`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return NextResponse.json(res.data);
}