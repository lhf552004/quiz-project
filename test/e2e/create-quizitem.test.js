import { test, expect } from "@playwright/test";

test.describe("Admin user create quiz item", () => {
  // test.beforeEach(async ({ page, context }) => {
  //   // Start tracing before each test
  //   await context.tracing.start({ screenshots: true, snapshots: true });
  // });

  // test.afterEach(async ({ page, context }, testInfo) => {
  //   // Stop tracing after each test and export if the test failed
  //   if (testInfo.status !== testInfo.expectedStatus) {
  //     await context.tracing.stop({
  //       path: `trace-${testInfo.title.replace(/\s+/g, "_")}.zip`,
  //     });
  //   } else {
  //     await context.tracing.stop();
  //   }
  // });

  test("Should create quiz item successfully", async ({ page }) => {
    const homeUrl = "http://localhost:3000";
    const loginUrl = "http://localhost:3000/users/login";

    await page.goto(homeUrl);
    const title = await page.title();
    expect(title).toBe("Home");

    await page.waitForSelector("img");
    const logoLocator = await page.locator('img[src="/img/quizzy_logo.png"]');
    await expect(logoLocator).toBeVisible();
    await expect(logoLocator).toHaveAttribute("alt", "Quizzy Logo");

    const loginElement = await page.locator(`a[href="${loginUrl}"]`);
    await expect(loginElement).toBeVisible();
    await expect(loginElement).toHaveText("Login");
    await page.click(`a[href="${loginUrl}"]`);

    // Navigate to login page
    const titleLocator = await page.locator("h3");
    await expect(titleLocator).toHaveText("Login");
    const emailLocator = await page.locator("#email");
    const passwordLocator = await page.locator("#password");
    const submitLocator = await page.locator("input[type='submit']");
    await expect(submitLocator).toHaveText("SIGN IN");

    // Fill username and password
    // TODO: should move the user and password in the .env
    await emailLocator.fill("test@example.com");
    await passwordLocator.fill("123");
    await submitLocator.click();

    // Go back to home
    const logoElement = await page.locator(`a[href="${homeUrl}"]`);
    await logoElement.click();
    const titleBack = await page.title();
    expect(titleBack).toBe("Home");

    // Go to creating quiz item page
    const createQuizItemElement = await page.locator(
      `a[href="http://localhost:3000/quizitem/quiz/GK/add-quiz-item"]`
    );
    await createQuizItemElement.click();

    // Wait for the URL to change to the quiz item creation page
    await page.waitForURL(
      "http://localhost:3000/quizitem/quiz/GK/add-quiz-item"
    );

    const createQuizItemTitle = await page.locator(`h3.page-title`);
    await expect(createQuizItemTitle).toHaveText("Add Question to Your Quiz");

    // Fill in quiz item details
    await page
      .locator(`#question`)
      .fill("Which city is the capital of Germany");
    await page.locator(`#answer-1`).fill("Berlin");
    await page.locator(`#answer-2`).fill("London");
    await page.locator(`#answer-3`).fill("Vienna");
    await page.locator(`#answer-4`).fill("Zurich");

    await page.locator(`#check-answer-1`).check();
    await page.locator(`div.btn.btn-primary.create-quiz-item-btn`).click();

    // Wait for the final page to load and validate the title
    await page.waitForURL("http://localhost:3000/quiz/GK");

    const quizTitle = await page.locator(`h1.text-center`);
    await expect(quizTitle).toBeVisible();
    await expect(quizTitle).toHaveText("Quiz GK", { timeout: 10000 });
  });
});
