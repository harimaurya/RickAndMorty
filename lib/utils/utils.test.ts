import { describe, it, expect } from "vitest";
import { getPaginationPages } from "./utils";

describe("getPaginationPages", () => {
  it("should return empty array when totalPages is 1 or less", () => {
    expect(getPaginationPages(1, 1)).toEqual([]);
    expect(getPaginationPages(1, 0)).toEqual([]);
  });

  it("should return all pages when totalPages is small (<= 7)", () => {
    expect(getPaginationPages(1, 2)).toEqual([1, 2]);
    expect(getPaginationPages(3, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationPages(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should return correct pages with ellipses for larger totalPages", () => {
    expect(getPaginationPages(1, 10)).toEqual([1, 2, 3, "...", 10]);
    expect(getPaginationPages(5, 10)).toEqual([
      1,
      "...",
      3,
      4,
      5,
      6,
      7,
      "...",
      10,
    ]);
    expect(getPaginationPages(9, 10)).toEqual([1, "...", 7, 8, 9, 10]);
    expect(getPaginationPages(6, 15)).toEqual([
      1,
      "...",
      4,
      5,
      6,
      7,
      8,
      "...",
      15,
    ]);
    expect(getPaginationPages(4, 42)).toEqual([1, 2, 3, 4, 5, 6, "...", 42]);
  });

  it("should handle edge cases near the start and end", () => {
    expect(getPaginationPages(2, 10)).toEqual([1, 2, 3, 4, "...", 10]);
    expect(getPaginationPages(3, 10)).toEqual([1, 2, 3, 4, 5, "...", 10]);
    expect(getPaginationPages(8, 10)).toEqual([1, "...", 6, 7, 8, 9, 10]);
    expect(getPaginationPages(7, 10)).toEqual([1, "...", 5, 6, 7, 8, 9, 10]);
  });
});

it("should return all pages when totalPages is small (<= 7)", () => {
  expect(getPaginationPages(1, 2)).toEqual([1, 2]);
  expect(getPaginationPages(3, 5)).toEqual([1, 2, 3, 4, 5]);
  expect(getPaginationPages(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
});
