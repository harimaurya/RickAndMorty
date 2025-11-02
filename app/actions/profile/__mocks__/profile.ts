import { vi } from "vitest";
import { FormState } from "../profile";

export const saveProfileAction = vi.fn(
  async (prevState: FormState, formData: FormData) => {
    const username = formData.get("username") as string;
    const jobTitle = formData.get("jobtitle") as string;

    if (!username || !jobTitle) {
      return {
        success: false,
        message: "Username and Job Title are required.",
      };
    }

    return { success: true, message: "Profile updated successfully!" };
  }
);
