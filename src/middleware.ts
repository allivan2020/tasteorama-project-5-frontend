import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const isPrivateRoute =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/add-recipe");

  if (isPrivateRoute && !accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/add-recipe/:path*"],
};
