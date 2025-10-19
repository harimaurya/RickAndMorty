import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const userInfo = request.cookies.get("user")?.value;
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const isRegistered =
    parsedUserInfo && parsedUserInfo.username && parsedUserInfo.jobTitle;

  // If not registered and not already on /register/*
  if (!isRegistered && !url.pathname.startsWith("/register")) {
    url.pathname = "/register";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/characters", "/characters/:path*", "/"],
};
