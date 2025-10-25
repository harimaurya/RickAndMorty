import React from "react";
import { vi } from "vitest";
import { render as originalRender } from "@testing-library/react";
import { MockUserContextProvider } from "@/store/MockUserContext";

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  pathname: "/",
  query: {},
};

export const mockFetch = vi.fn();

export const customRender = (
  ui: React.ReactNode,
  provider: React.JSXElementConstructor<{
    children: React.ReactNode;
  }>,
  value: object = {},
  options: object = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(provider, { value }, children);

  return originalRender(ui, { wrapper: Wrapper, ...options });
};
