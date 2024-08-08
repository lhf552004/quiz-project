import puppeteer from "puppeteer";
import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../../serve.js";

let browser = null,
  page = null;
chai.use(chaiHttp);

let quizItemDetails = null;

describe("Single Quiz Page", function () {
  this.timeout(60 * 1000);
  before(async () => {
    browser = await puppeteer.launch({ headless: false }); // with visual
    page = await browser.newPage();

    await chai.request(app).keepOpen();
  });
  after(async () => {
    await browser.close();
  });

  it("Should show quiz page", async function () {
    await page.goto("http://localhost:3000/quiz/GK");
    await page.waitForTimeout(1000);

    // checking for title of a quiz
    let title = await page.title();
    assert.equal(title, "Quiz GK");
  });

  it("Should show quiz title", async () => {
    await page.waitForSelector("h1", { visible: true });
    const titleText = await page.evaluate(
      () => document.querySelector("h1").textContent
    );
    // Make sure the page has title
    assert.equal(titleText, "Quiz GK");
  });
  it("Should has next button", async () => {
    await page.waitForSelector("button.btn.btn-primary.next-button", {
      visible: true,
    });
    const buttonText = await page.evaluate(
      () => document.querySelector(".next-button").textContent
    );
    // Make sure button has Next as text
    assert.equal(buttonText, "Next");
  });
  it("Should show all options for a quizItem", async () => {
    const quizItemId = await page.evaluate(
      () => document.querySelector(".quiz-item.active").dataset.id
    );
    const options = await page.evaluate(
      () => document.querySelectorAll(".quiz-item.active .quiz-answer").length
    );
    const quizName = await page.evaluate(
      () => document.querySelector(".quiz-container").dataset.quizName
    );
    // using chai request to get quiz item details
    return chai
      .request(app)
      .get("/quizitem/" + quizItemId + "/quiz/" + quizName)
      .then((resp) => {
        quizItemDetails = resp.body;
        // checking to make sure the number of options show up correctly
        assert.equal(options, quizItemDetails.options.length);
      });
  });
  it("Check right answer step", async () => {
    // have to go back to the page multiple times because the test quiz is too short for the whole test
    await page.goto("http://localhost:3000/quiz/GK");
    await page.waitForTimeout(1000);

    const quizItemId = await page.evaluate(
      () => document.querySelector(".quiz-item.active").dataset.id
    );
    const quizName = await page.evaluate(
      () => document.querySelector(".quiz-container").dataset.quizName
    );

    return chai
      .request(app)
      .get("/quizitem/" + quizItemId + "/quiz/" + quizName)
      .then(async (resp) => {
        quizItemDetails = resp.body;
        // Wait for the correct quiz answer and next button available
        await page.waitForSelector(
          '.quiz-answer[data-ans-value="' + quizItemDetails.answer + '"]',
          { visible: true }
        );
        await page.waitForSelector("button.btn.btn-primary.next-button", {
          visible: true,
        });

        await page.evaluate(async (quizItemDetails) => {
          // Trigger click on right answer and next button
          document
            .querySelector(
              '.quiz-answer[data-ans-value="' + quizItemDetails.answer + '"]'
            )
            .click();
          document.querySelector("button.btn.btn-primary.next-button").click();
        }, quizItemDetails);

        // timeout to wait for everything to set
        await page.waitForTimeout(1000);

        // check for right class
        const hasRightClass = await page.evaluate(
          (quizItemDetails) =>
            document
              .querySelector(
                '.quiz-answer[data-ans-value="' + quizItemDetails.answer + '"]'
              )
              .classList.contains("right"),
          quizItemDetails
        );

        // make sure right class is set to the right answer
        assert.equal(hasRightClass, true);

        await page.waitForTimeout(2000);

        // checking next question is visible by checking the ids are different
        const nextQuizItem = await page.evaluate(
          () => document.querySelector(".quiz-item.active").dataset.id
        );
        assert.notEqual(nextQuizItem, quizItemId);
      });
  });
  // Very similar to right answer check
  it("Check wrong answer step", async () => {
    // have to go back to the page multiple times because the test quiz is too short for the whole test
    await page.goto("http://localhost:3000/quiz/GK");
    await page.waitForTimeout(1000);

    const quizName = await page.evaluate(
      () => document.querySelector(".quiz-container").dataset.quizName
    );
    const quizItemId = await page.evaluate(
      () => document.querySelector(".quiz-item.active").dataset.id
    );

    return chai
      .request(app)
      .get("/quizitem/" + quizItemId + "/quiz/" + quizName)
      .then(async (resp) => {
        quizItemDetails = resp.body;
        // purposely choose a wrong answer
        await page.waitForSelector(
          '.quiz-item.active .quiz-answer[data-ans-value]:not([data-ans-value="' +
            quizItemDetails.answer +
            '"])',
          { visible: true }
        );
        await page.waitForSelector("button.btn.btn-primary.next-button", {
          visible: true,
        });

        await page.evaluate(async (quizItemDetails) => {
          document
            .querySelector(
              '.quiz-item.active .quiz-answer[data-ans-value]:not([data-ans-value="' +
                quizItemDetails.answer +
                '"])'
            )
            .click();
          document.querySelector("button.btn.btn-primary.next-button").click();
        }, quizItemDetails);

        await page.waitForTimeout(1000);

        const hasWrongClass = await page.evaluate(() =>
          document
            .querySelector(".quiz-item.active .quiz-answer.active")
            .classList.contains("wrong")
        );
        // check to make sure wrong class is set
        assert.equal(hasWrongClass, true);

        await page.waitForTimeout(2000);

        // checking next question is visible by checking the ids are different
        const nextQuizItem = await page.evaluate(
          () => document.querySelector(".quiz-item.active").dataset.id
        );
        assert.notEqual(nextQuizItem, quizItemId);
      });
  });

  it("Check result", async () => {
    // have to go back to the page multiple times because the test quiz is too short for the whole test
    await page.goto("http://localhost:3000/quiz/GK");
    await page.waitForTimeout(1000);

    // get the remaining unanswerred questions
    let numberOfRemQues = await page.evaluate(
      () =>
        document.querySelectorAll(".quiz-item").length -
        document.querySelectorAll(".quiz-answer.right").length
    );
    // get total number of questions
    const numberOfQues = await page.evaluate(
      () => document.querySelectorAll(".quiz-item").length
    );

    // go through all remaining question
    while (numberOfRemQues--) {
      // randomly clicking on the first answer option, don't care if it's right or wrong
      await page.evaluate(async () => {
        document.querySelector(".quiz-item.active .quiz-answer").click();
        document.querySelector("button.btn.btn-primary.next-button").click();
      });

      await page.waitForTimeout(3000);
    }

    await page.waitForTimeout(2000);

    // Get number of right answer
    const numberRight = await page.evaluate(
      () =>
        document.querySelectorAll(".quiz-item").length -
        document.querySelectorAll(".quiz-answer.wrong").length
    );

    // make sure result is visible
    await page.waitForSelector(".finish-quiz", { visible: true });

    // get result text
    const resultText = await page.evaluate(
      () => document.querySelector(".finish-quiz h4").textContent
    );

    // expected text just based on the number of right answer and number of question
    const expectResultText =
      "You got " + numberRight + "/" + numberOfQues + " right";

    // compare to make sure the expected text and the result text are matched
    assert.equal(resultText, expectResultText);
  });
});
