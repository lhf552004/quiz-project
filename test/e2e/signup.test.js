// tests/example.spec.mjs
import { test, expect } from "@playwright/test";

test("Login test", async ({ page, context }) => {
  await page.goto("http://localhost:3000/users/create");
  const titleLocator = await page.locator("h3");
  await expect(titleLocator).toHaveText("Create Your Account");
  const emailLocator = await page.locator("#email");
  const passwordLocator = await page.locator("#password");
  const submitLocator = await page.locator("input[type='submit']");
  await expect(submitLocator).toHaveText("SIGN UP");
  emailLocator.fill("testUser");
  passwordLocator.fill("testPassword");
  await submitLocator.click();
});
