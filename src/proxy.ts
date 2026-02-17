import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isDashboard = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";

  if (isDashboard && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
