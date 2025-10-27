import { test, expect } from "@playwright/test";

test.describe("Registration flow", () => {
  test("should redirect to /register if no cookie", async ({ page }) => {
    await page.goto("/information");
    await expect(page).toHaveURL(/register/);
  });

  test("should submit register form and redirect to /information", async ({
    page,
  }) => {
    await page.goto("/register");

    await page.fill('input[name="username"]', "Hari");
    await page.fill('input[name="jobtitle"]', "Developer");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/information/);
    await expect(page.locator("span[data-testid='username']")).toHaveText(
      /Hari/
    );
    await expect(page.locator("span[data-testid='jobtitle']")).toHaveText(
      /Developer/
    );
  });
});
