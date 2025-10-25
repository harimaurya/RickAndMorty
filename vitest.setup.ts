// vitest.setup.ts
import { afterEach, expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { ImageProps } from "next/image";

afterEach(() => {
  cleanup();
});

expect.extend(matchers);

// --------------------------------------------------------------------
// 🧩 Global mocks for Next.js modules
// --------------------------------------------------------------------

// ✅ Mock next/navigation
vi.mock("next/navigation", async () => {
  return {
    // The most commonly used hooks
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      pathname: "/",
      query: {},
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  };
});

// ✅ Mock next/image — type-safe JSX return
vi.mock("next/image", async () => {
  const React = await import("react");
  const MockNextImage = (props: ImageProps) => {
    return React.createElement("img", props);
  };

  return {
    __esModule: true,
    default: MockNextImage,
  };
});
