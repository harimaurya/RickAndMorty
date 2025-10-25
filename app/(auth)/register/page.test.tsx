import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "./page";

// Mock next/navigation -> useRouter
const mockRouter = { replace: vi.fn() };
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("Register Page", () => {
  test("should renders the logo image with expected attributes", () => {
    render(<RegisterPage />);
    const logo = screen.getByRole("img", { name: /Rick and Morty/i });
    expect(logo.getAttribute("width")).toBe("100");
    expect(logo.getAttribute("height")).toBe("100");
  });

  test("should renders for register page and shows heading", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Rick and Morty Universe" })
    ).toBeDefined();
  });
});
