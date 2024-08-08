// tests/example.spec.mjs
import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const title = await page.title();
  expect(title).toBe("Example Domain");

  const header = await page.locator("h1");
  await expect(header).toHaveText("Example Domain");

  const moreInfoLink = await page.locator("a");
  await expect(moreInfoLink).toHaveAttribute(
    "href",
    "https://www.iana.org/domains/example"
  );
});
