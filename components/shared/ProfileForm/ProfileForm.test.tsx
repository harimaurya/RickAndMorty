import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { mockFetch } from "@/test/utils/mock-helpers";

describe("ProfileForm", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
  });

  test("should render form fields correctly", () => {
    render(<ProfileForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const jobtitleInput = screen.getByLabelText(/job title/i);

    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("required");
    expect(jobtitleInput).toBeInTheDocument();
    expect(jobtitleInput).toHaveAttribute("required");
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
  });

  test("should submit form with valid data", async () => {
    render(<ProfileForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const jobtitleInput = screen.getByLabelText(/job title/i);
    const newUserName = "Rick Sanchez";
    const newJobTitle = "Interdimensional Cable Guy";

    fireEvent.change(usernameInput, {
      target: { value: newUserName },
    });
    fireEvent.change(jobtitleInput, {
      target: { value: newJobTitle },
    });

    expect(usernameInput).toHaveValue(newUserName);
    expect(jobtitleInput).toHaveValue(newJobTitle);

    fireEvent.submit(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  test("should render Let's go! button correctly", () => {
    render(<ProfileForm isRegister={true} />);
    expect(
      screen.getByRole("button", { name: /let's go!/i })
    ).toBeInTheDocument();
  });
});
