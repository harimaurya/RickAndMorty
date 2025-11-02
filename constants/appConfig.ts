export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const API_URL = `${BASE_URL}/api`;

export const COOKIE_OPTIONS = {
  // Set attributes appropriate for your environment. Adjust 'secure' when using HTTPS.
  httpOnly: false, // set to true if you don't want client JS to read the cookie
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
