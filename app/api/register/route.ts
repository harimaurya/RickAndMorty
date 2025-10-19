import { Profile } from "@/types/profile";
import { NextRequest, NextResponse } from "next/server";

type Body = Profile;

const COOKIE_OPTIONS = {
  // Set attributes appropriate for your environment. Adjust 'secure' when using HTTPS.
  httpOnly: false, // set to true if you don't want client JS to read the cookie
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();
    const { username, jobTitle } = body;

    if (!username || !jobTitle) {
      return NextResponse.json(
        { message: "username and job title are required" },
        { status: 400 }
      );
    }

    const res = NextResponse.json({ message: "User registered successfully!" });

    // Set cookies with a 30-day expiry
    const maxAge = 60 * 60 * 24 * 30; // seconds
    res.cookies.set("user", JSON.stringify({ username, jobTitle }), {
      ...COOKIE_OPTIONS,
      maxAge,
    });

    return res;
  } catch {
    return NextResponse.json({ message: "invalid json" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const user = req.cookies.get("user")?.value ?? null;
  const data = user ? JSON.parse(user) : null;

  return NextResponse.json({ ...data });
}
