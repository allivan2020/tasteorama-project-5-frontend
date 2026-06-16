import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

function getToken(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  return cookie.match(/accessToken=([^;]+)/)?.[1];
}

export async function GET(req: Request) {
  const token = getToken(req);
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();

  const res = await fetch(`${BACKEND_URL}/recipes${query ? `?${query}` : ''}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Backend error', status: res.status },
      { status: res.status }
    );
  }

  const data = await res.json().catch(() => null);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const token = getToken(req);
  const body = await req.json();

  const res = await fetch(`${BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Backend error', status: res.status },
      { status: res.status }
    );
  }

  const data = await res.json().catch(() => null);

  return NextResponse.json(data);
}
