import { vi } from "vitest";

const client = {
  query: vi.fn(),
  mutate: vi.fn(),
};

export default client;
