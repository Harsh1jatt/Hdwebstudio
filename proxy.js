import { NextResponse } from "next/server";

const COOKIE_NAME = "hd_admin_token";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Allow public admin auth endpoints
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/setup"
  ) {
    return NextResponse.next();
  }

  // 2. Protect Admin Dashboard Pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Protect Admin API Routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.svg, logo.png, images, uploads (static assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|images|uploads|projects|og).*)",
  ],
};
