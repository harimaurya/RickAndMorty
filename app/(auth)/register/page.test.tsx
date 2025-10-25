import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MockProfileForm from "@/components/shared/ProfileForm/ProfileForm.mock";

// Mock Profile Form component
vi.mock("@/components/shared/ProfileForm/ProfileForm", () => ({
  __esModule: true,
  default: MockProfileForm,
}));

import RegisterPage from "./page";
import { mockRouter } from "@/test/utils/mock-helpers";

describe("Register Page", () => {
  test("should renders the logo image with expected attributes", () => {
    render(<RegisterPage />);
    const logo = screen.getByRole("img", { name: /Rick and Morty/i });
    expect(logo.getAttribute("alt")).toBe("Rick and Morty");
    expect(logo.getAttribute("width")).toBe("100");
    expect(logo.getAttribute("height")).toBe("100");
  });

  test("should renders for register page and shows heading", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Rick and Morty Universe" })
    ).toBeDefined();
  });

  test("should passes isRegister=true  to ProfileForm", () => {
    render(<RegisterPage />);
    const isRegisterEl = screen.getByTestId("is-register");
    expect(isRegisterEl.textContent).toBe("true");
  });

  test("should onSuccess navigates to /information via router.replace", () => {
    render(<RegisterPage />);
    const submit = screen.getByTestId("submit");
    submit.click();
    expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    expect(mockRouter.replace).toHaveBeenCalledWith("/information");
  });
});
