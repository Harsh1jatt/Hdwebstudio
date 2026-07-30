import { NextResponse } from "next/server";
import { COOKIE_NAME } from "./lib/jwt";

const PUBLIC_ROUTES = [
  "/admin/login",
  "/admin/setup",
];

const PUBLIC_API_ROUTES = [
  "/api/admin/login",
  "/api/admin/setup",
  "/api/admin/logout",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Login aur setup pages ko allow karo
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Login aur setup APIs ko allow karo
  if (PUBLIC_API_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Admin pages protect karo
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    // Cookie nahi hai to login page
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    // IMPORTANT:
    // Yahan verifyToken() mat lagana.
    // jsonwebtoken Edge Runtime mein kaam nahi karta.

    return NextResponse.next();
  }

  // Admin APIs protect karo
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};