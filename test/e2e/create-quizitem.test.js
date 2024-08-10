// tests/home.test.js
import { test, expect } from "@playwright/test";

test.describe("Admin user create quiz item", () => {
  test.beforeEach(async ({ page, context }) => {
    // Start tracing before each test
    await context.tracing.start({ screenshots: true, snapshots: true });
  });

  test.afterEach(async ({ page, context }, testInfo) => {
    // Stop tracing after each test and export if the test failed
    if (testInfo.status !== testInfo.expectedStatus) {
      await context.tracing.stop({
        path: `trace-${testInfo.title.replace(/\s+/g, "_")}.zip`,
      });
    } else {
      await context.tracing.stop();
    }
  });

  test("Should create quizitem successfully", async ({ page, context }) => {
    // Home page
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
    emailLocator.fill("test@example.com");
    passwordLocator.fill("123");
    await submitLocator.click();

    // Go back to home
    const logoElement = await page.locator(`a[href="${homeUrl}"]`);
    await logoElement.click();
    const titleBack = await page.title();
    expect(titleBack).toBe("Home");

    // Go to creating quizitem page
    const createQuizItemELement = await page.locator(
      `a[href="http://localhost:3000/quizitem/quiz/GK/add-quiz-item"]`
    );
    await createQuizItemELement.click();
    const createQuizItemTitle = await page.locator(`h3.page-title`);
    // Here, the text should be `Quiz ${quizname}`
    await expect(createQuizItemTitle).toHaveText("Add Question to Your Quiz");

    const questionInput = await page.locator(`#question`);
    questionInput.fill("Which is city is the captial of Germany");

    const option1Input = await page.locator(`#answer-1`);
    const option2Input = await page.locator(`#answer-2`);
    const option3Input = await page.locator(`#answer-3`);
    const option4Input = await page.locator(`#answer-4`);

    const check1Input = await page.locator(`#check-answer-1`);
    const createButton = await page.locator(
      `button.btn.btn-primary.create-quiz-item-btn`
    );

    option1Input.fill("Berlin");
    option2Input.fill("London");
    option3Input.fill("Vienna");
    option4Input.fill("Zurich");

    check1Input.check();

    createButton.click();

    await page.waitForURL("http://localhost:3000/quiz/GK");
    const quizTitle = await page.locator(`h1.text-center`);
    // Here, the text should be `Quiz ${quizname}`
    await expect(quizTitle).toHaveText("Quiz GK");
  });
});
