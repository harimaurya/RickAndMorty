import { describe, it, expect, vi, beforeEach, test } from "vitest";

import { getUserFromCookies } from "./session";
import { cookies } from "next/headers";
import { Profile } from "@/types/profile";

describe("getUserFromCookies", () => {
  const mockCookies = cookies as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Should returns null when no user cookie is found", async () => {
    mockCookies.mockReturnValue({
      get: vi.fn().mockReturnValue(undefined),
    });

    const result = await getUserFromCookies();

    expect(result).toBeNull();
    expect(mockCookies).toHaveBeenCalledTimes(1);
  });

  test("Should returns the parsed user profile when user cookie is found", async () => {
    const profile: Profile = {
      username: "testuser",
      jobTitle: "Developer",
    };

    mockCookies.mockReturnValue({
      get: vi.fn().mockReturnValue({
        value: JSON.stringify(profile),
      }),
    });

    const result = await getUserFromCookies();

    expect(result).toEqual(profile);
    expect(mockCookies).toHaveBeenCalledTimes(1);
  });
});
