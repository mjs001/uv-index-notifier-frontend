import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const success = request.cookies.get("success")?.value;
  if (success !== "true" && request.nextUrl.pathname === "/location") {
    const url = request.nextUrl.clone();
    url.pathname = "/"
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/location"]
}
