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
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // 2. Protect Admin Dashboard Pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const redirectRes = NextResponse.redirect(loginUrl);
      redirectRes.headers.set("X-Robots-Tag", "noindex, nofollow");
      return redirectRes;
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // 3. Protect Admin API Routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const unauthorizedRes = NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
      unauthorizedRes.headers.set("X-Robots-Tag", "noindex, nofollow");
      return unauthorizedRes;
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
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

