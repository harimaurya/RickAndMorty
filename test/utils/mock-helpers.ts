import { createElement, JSXElementConstructor, ReactNode } from "react";
import { vi } from "vitest";
import { render as originalRender } from "@testing-library/react";

interface CustomProviderProps<V extends object> {
  children: React.ReactNode;
  value: V;
}

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  pathname: "/",
  query: {},
};

export const mockFetch = vi.fn();

export const customRender = <
  V extends object,
  P extends CustomProviderProps<V>
>(
  ui: ReactNode,
  provider: JSXElementConstructor<P>,
  value: V = {} as V,
  options: object = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(provider, { value, children } as P);

  return originalRender(ui, { wrapper: Wrapper, ...options });
};
