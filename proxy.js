import { NextResponse } from "next/server";

const COOKIE_NAME = "hd_admin_token";
const CANONICAL_HOST = "hdwebstudios.in";

export function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const forwardedProto = request.headers.get("x-forwarded-proto");

  // 1. Canonical Domain Redirection (301 Permanent Redirect)
  // Redirect www.hdwebstudios.in -> hdwebstudios.in in production
  if (
    host.toLowerCase() === `www.${CANONICAL_HOST}` ||
    (host.toLowerCase().includes(CANONICAL_HOST) && host.toLowerCase().startsWith("www."))
  ) {
    const canonicalUrl = new URL(`https://${CANONICAL_HOST}${pathname}${search}`);
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // 2. HTTPS Redirection in production if forwarded proto is http
  if (forwardedProto === "http" && host.includes(CANONICAL_HOST)) {
    const httpsUrl = new URL(`https://${CANONICAL_HOST}${pathname}${search}`);
    return NextResponse.redirect(httpsUrl, 301);
  }

  // 3. Allow public admin auth endpoints
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/setup"
  ) {
    return NextResponse.next();
  }

  // 4. Protect Admin Pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 5. Protect Admin API Routes
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
     * - favicon.ico, logo.svg, images, uploads (static assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|images|uploads|projects|og).*)",
  ],
};
