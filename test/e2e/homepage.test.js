// tests/home.test.js
import { test, expect } from "@playwright/test";

test.describe("Home Page test", () => {
  test("Should have all the links", async ({ page, context }) => {
    await page.goto("http://localhost:3000/");
    const title = await page.title();
    expect(title).toBe("Home");

    // Check the presence and functionality of each link
    const links = [
      { href: "http://localhost:3000/", text: "Home" },
      { href: "http://localhost:3000/users/login", text: "Login" },
      { href: "http://localhost:3000/users/create", text: "Sign Up" },
      {
        href: "http://localhost:3000/users/dash-board/1",
        text: "User Dashboard",
      },
      { href: "http://localhost:3000/users/admin/1", text: "Admin Dashboard" },
      { href: "http://localhost:3000/quiz", text: "Quiz List" },
      { href: "http://localhost:3000/quiz/GK", text: "Single quiz" },
      {
        href: "http://localhost:3000/quizitem/quiz/GK/add-quiz-item",
        text: "Add new quiz item to specific quiz",
      },
      {
        href: "http://localhost:3000/quiz/GK/quiz-admin",
        text: "Quiz Manage Page",
      },
    ];

    for (const link of links) {
      const linkElement = await page.locator(`a[href="${link.href}"]`);
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toHaveText(link.text);
    }
    await page.waitForSelector("img");
    const logoLocator = await page.locator('img[src="/img/quizzy_logo.png"]');
    await expect(logoLocator).toBeVisible();
    await expect(logoLocator).toHaveAttribute("alt", "Quizzy Logo");
  });
});
