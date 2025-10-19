import { Profile } from "@/types/profile";
import { cookies } from "next/headers";

/**
 * Retrieves the 'user' value from browser cookies
 * @returns {Profile | null} The user cookie value or null if not found
 */
export const getUserFromCookies = async (): Promise<Profile | null> => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  if (userCookie) {
    return JSON.parse(userCookie.value);
  }
  return null;
};
