// tests/example.spec.mjs
import { test, expect } from "@playwright/test";

test("Home Page test", async ({ page, context }) => {
  await page.goto("http://localhost:3000/");
  const title = await page.title();
  expect(title).toBe("Home");

  // Check the presence and functionality of each link
  const links = [
    { href: "http://localhost:3000/", text: "Home" },
    { href: "http://localhost:3000/users/login", text: "Sign Up" },
    { href: "http://localhost:3000/users/create", text: "Login" },
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

  // Optionally, click each link to ensure it navigates correctly
  for (const link of links) {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Wait for the new tab to open
      page.click(`a[href="${link.href}"]`), // Perform the click that opens a new tab
    ]);

    await newPage.waitForLoadState(); // Ensure the new page is fully loaded
    await expect(newPage).toHaveURL(link.href); // Verify the URL of the new tab
    await newPage.close(); // Close the new tab
  }
});
