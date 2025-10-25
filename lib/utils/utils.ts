import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the array of page numbers to display in the pagination control.
 * Shows first, last, and pages surrounding the current page, using '...' for gaps.
 * @param {number} currentPage
 * @param {number} totalPages
 * @returns {Array<number|string>} Array of page numbers and ellipses
 */
export const getPaginationPages = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  if (totalPages <= 1) return [];

  if (totalPages <= 7) {
    // Show all pages if total is small
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1); // First page
  pages.add(totalPages); // Last page

  // Pages around current
  for (let i = -2; i <= 2; i++) {
    const pageNum = currentPage + i;
    if (pageNum > 1 && pageNum < totalPages) {
      pages.add(pageNum);
    }
  }

  // Ensure current page is included even if totalPages is just over the edge
  pages.add(currentPage);

  const sortedPages = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
  const displayPages: (number | string)[] = [];

  // Insert ellipses
  for (let i = 0; i < sortedPages.length; i++) {
    const pageNum = sortedPages[i];

    // If the gap is > 1 from the last displayed page, insert '...'
    if (displayPages.length > 0) {
      const lastDisplayed = displayPages[displayPages.length - 1];
      const lastNumber =
        typeof lastDisplayed === "number" ? lastDisplayed : NaN;
      if (!Number.isNaN(lastNumber) && pageNum > lastNumber + 1) {
        displayPages.push("...");
      }
    }
    displayPages.push(pageNum);
  }

  return displayPages;
};
