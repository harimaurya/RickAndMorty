import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { customRender, mockFetch } from "@/test/utils/mock-helpers";
import { MockUserContextProvider } from "@/store/MockUserContext";

describe("ProfileForm", () => {
  // Define the specific mock user data you expect to be pre-filled
  const USERNAME = "testUser";
  const JOBTITLE = "Software Developer";

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

    fireEvent.change(usernameInput, {
      target: { value: USERNAME },
    });
    fireEvent.change(jobtitleInput, {
      target: { value: JOBTITLE },
    });

    expect(usernameInput).toHaveValue(USERNAME);
    expect(jobtitleInput).toHaveValue(JOBTITLE);

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

  test("should render form with pre-filled values", () => {
    customRender(<ProfileForm isRegister={false} />, MockUserContextProvider, {
      username: USERNAME,
      jobTitle: JOBTITLE,
    });

    const usernameInput = screen.getByLabelText(/username/i);
    const jobtitleInput = screen.getByLabelText(/job title/i);

    expect(usernameInput).toHaveValue(USERNAME);
    expect(jobtitleInput).toHaveValue(JOBTITLE);
  });

  test("should render form with empty pre-filled values", () => {
    vi.resetAllMocks();
    customRender(<ProfileForm isRegister={false} />, MockUserContextProvider, {
      username: "",
      jobTitle: "",
    });

    const usernameInput = screen.getByLabelText(/username/i);
    const jobtitleInput = screen.getByLabelText(/job title/i);

    expect(usernameInput).toHaveValue("");
    expect(jobtitleInput).toHaveValue("");
  });
});
