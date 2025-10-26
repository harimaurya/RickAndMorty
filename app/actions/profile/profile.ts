"use server";

import { COOKIE_OPTIONS } from "@/constants/appConfig";
import { cookies } from "next/headers";

export interface FormState {
  success: boolean;
  message: string;
}

export async function saveProfileAction(
  prevState: FormState,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const jobTitle = formData.get("jobtitle") as string;

  if (!username || !jobTitle) {
    return { success: false, message: "Username and Job Title are required." };
  }

  try {
    const cookieStore = await cookies();
    const maxAge = 60 * 10; // 10 minutes in seconds
    cookieStore.set("user", JSON.stringify({ username, jobTitle }), {
      ...COOKIE_OPTIONS,
      maxAge,
    });

    return { success: true, message: "Profile updated successfully!" };
  } catch {
    return { success: false, message: "An unexpected error occurred." };
  }
}
