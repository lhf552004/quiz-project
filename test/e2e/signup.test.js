// tests/signup.test.js
import { test, expect } from "@playwright/test";

test.describe("Home Page test", () => {
  test("Signup test", async ({ page, context }) => {
    await page.goto("http://localhost:3000/users/create");
    const titleLocator = await page.locator("h3");
    await expect(titleLocator).toHaveText("Create Your Account");
    const emailLocator = await page.locator("#email");
    const passwordLocator = await page.locator("#password");
    const submitLocator = await page.locator("input[type='submit']");
    await expect(submitLocator).toHaveText("SIGN UP");
    // TODO: should move the user and password in the .env
    emailLocator.fill("testUser");
    passwordLocator.fill("testPassword");
    await submitLocator.click();
    // await page.waitForURL("**/profile");
    // Intercept the request and wait for the response
    // const [response] = await Promise.all([
    //   page.waitForResponse(
    //     (response) =>
    //       response.url().includes("/user/create") && response.status() === 200,
    //     { timeout: 20000 } // Increase timeout to 20 seconds
    //   ),
    //   submitLocator.click(),
    // ]);

    // // Check the response and navigate to profile page
    // await expect(response.ok()).toBeTruthy();
    // await expect(page).toHaveURL(/\/profile/);
    // const newTitleLocator = await page.locator("h1");
    // expect(newTitleLocator).toHaveText("This is user profile");
    await page.screenshot({ path: "signup.png" });
  });
});
