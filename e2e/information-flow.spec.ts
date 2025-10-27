import { test, expect } from "@playwright/test";

test.describe("Information flow", () => {
  test.beforeEach(async ({ context, page }) => {
    // Set user cookie to bypass registration
    await context.addCookies([
      {
        name: "user",
        value: JSON.stringify({ username: "Hari", jobTitle: "Engineer" }),
        domain: "localhost",
        path: "/",
      },
    ]);

    // Navigate to information page
    await page.goto("/information");
  });

  test("should allow access to /information when cookie exists", async ({
    page,
  }) => {
    await expect(page.locator("h1")).toHaveText("Information");
  });

  test("should open modal on card click and close correctly", async ({
    page,
  }) => {
    // Click first card
    await page.click("a[href='/information/1']");

    // Verify modal appears
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await expect(page.locator("text=Character Details")).toBeVisible();

    // Close modal
    await page.click('button[data-slot="dialog-close"]');
    await expect(page).toHaveURL("/information");
  });
});
