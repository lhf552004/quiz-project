// tests/home.test.js
import { test, expect } from "@playwright/test";

test.describe("Existed user take exam", () => {
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

  test("Should login successfully and take a exam", async ({
    page,
    context,
  }) => {
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
    // TODO: should move the user and password in the .env
    emailLocator.fill("test@example.com");
    passwordLocator.fill("123");
    await submitLocator.click();

    // Go back to home
    const logoElement = await page.locator(`a[href="${homeUrl}"]`);
    await logoElement.click();
    const titleBack = await page.title();
    expect(titleBack).toBe("Home");

    // Go to single quiz page
    const quizElement = await page.locator(
      `a[href="http://localhost:3000/quiz/GK"]`
    );
    await quizElement.click();
    const quizTitle = await page.locator(`h1.text-center`);
    // Here, the text should be `Quiz ${quizname}`
    await expect(quizTitle).toHaveText("Quiz GK");
    // Button navigate to next question
    const nextButton = await page.locator(`button.btn.btn-primary.next-button`);
    await expect(nextButton).toHaveText("Next");
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeDisabled();

    // First question section
    const firstH4 = await page.locator(`h4`).nth(0);
    await expect(firstH4).toHaveText("Question 1:");
    // Question
    const questionElement = await page.locator(`p.quiz-item-question`).first();
    await expect(questionElement).toHaveText("What is the capital of France?");
    // Correct answer option
    const answer1Option = await page.locator(`div.quiz-answer:text("Paris")`);
    await expect(answer1Option).toBeVisible();

    await answer1Option.click();
    // Check the option is shown as selected
    await expect(answer1Option).toHaveClass(/.*active.*/);

    // Next button is enabled
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
    await expect(answer1Option).toHaveClass(/.*right.*/);
    // First question should be hidden
    await expect(firstH4).toBeHidden();

    const secondH4 = await page.locator("h4").nth(1);
    // Assert that the <h4> element is visible
    await expect(secondH4).toBeVisible();

    // Optionally, you can check the text of the second <h4>
    await expect(secondH4).toHaveText("Question 2:");

    const answer2Option = await page.locator(
      `div.quiz-answer[data-ans-value="desk"]`
    );
    await expect(answer2Option).toBeVisible();
    await answer2Option.click();
    await expect(answer2Option).toHaveClass(/.*active.*/);

    await nextButton.click();
    await expect(answer2Option).toHaveClass(/.*right.*/);
    const finishedText = await page.locator(
      'h3:has-text("Thank you for completing Quiz")'
    );

    await expect(finishedText).toBeVisible();
  });
});
