import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const locationData = request.cookies.get("locationData")?.value;
    if (!locationData && request.nextUrl.pathname === "/location") {
      const url = request.nextUrl.clone();
      url.pathname = "/"
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Fallback to allow the request to proceed
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/location"]
}
