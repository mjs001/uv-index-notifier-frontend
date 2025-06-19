import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  "use server"
  const locationData = request.cookies.get("locationData")?.value;
  console.log("locationData", locationData)
  if (!locationData && request.nextUrl.pathname === "/location") {
    const url = request.nextUrl.clone();
    url.pathname = "/"
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/location"]
}
