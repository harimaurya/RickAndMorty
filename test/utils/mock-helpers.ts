import { vi } from "vitest";

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  pathname: "/",
  query: {},
};

export const mockFetch: typeof fetch = vi.fn();
