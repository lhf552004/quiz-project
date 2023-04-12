import puppeteer from "puppeteer";
import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from '../serve.js';
import { Quiz, QuizItem } from '../modules/quizbank.mjs';


let browser = null, page = null;
chai.use(chaiHttp);

const expect = chai.expect;
const quizName = 'testquiz';

describe("Create Quiz Item Test", function () {
	this.timeout(60 * 1000);
	before(async () => {
		browser = await puppeteer.launch({ headless: false }) // with visual
		page = await browser.newPage();

		await chai.request(app).keepOpen();
	});
	after(async () => {	
		await browser.close();
	});

	it("Should show add quiz item page", async function () {
		// Remove test quiz
		console.log('Create Test Quiz to Start')
		const newQuiz = new Quiz(quizName);
    	newQuiz.createNewQuiz(quizName);

		await page.goto("http://localhost:3000/quizitem/quiz/" + quizName + "/add-quiz-item");
			await page.waitForTimeout(1000);

			await page.waitForSelector('.page-title', { visible: true });
			const titleText = await page.evaluate(() => document.querySelector('.page-title').textContent);
			// Make sure the page has title 
			expect(titleText).to.contain('Add Question to Your Quiz');

			await page.waitForSelector('h3.quiz-name', { visible: true });
			const quizText = await page.evaluate(() => document.querySelector('.quiz-name').textContent);
			// Make sure the page has title 
			expect(quizText).to.contain('Quiz ' + quizName);	
	});

	it("Check page elements loaded correctly", async() => {
        const questionField = await page.$('input#question');
        expect(questionField).to.exist;

		const optionFields = await page.evaluate(() => document.querySelectorAll('.option-text').length);
		// Make sure the page has title 
		assert.equal(optionFields, 4, 'All Option Field Show');

		const optionCheckbox = await page.evaluate(() => document.querySelectorAll('.answer-checkbox').length);
		// Make sure the page has title 
		assert.equal(optionCheckbox, 4, 'All Answer Checkbox Show');

        const createQuizItemBtn = await page.$('.create-quiz-item-btn');
        expect(createQuizItemBtn).to.exist;

        await page.type('input#question', 'Test Quiz Item');

        await page.waitForTimeout(2000);

		await page.type('input#answer-1', 'Option 1');

        await page.waitForTimeout(1000);

		await page.type('input#answer-2', 'Option 2');

        await page.waitForTimeout(1000);

		await page.type('input#answer-3', 'Option 3');

        await page.waitForTimeout(1000);

		await page.type('input#answer-4', 'Option 4');

        await page.waitForTimeout(1000);

		await page.evaluate(() => {
			document.querySelector("#check-answer-4").click();
		  });
		

        await page.evaluate(() => document.querySelector('.create-quiz-item-btn').click());
        
        await page.waitForTimeout(5000);

        // check to see if redirect correctly
        let title = await page.title();
		assert.equal(title, "Quiz " + quizName);
    });
	

	it("Check quiz item is added correctly", async() => {
		const quizItem = new QuizItem();
    	const quizItemDetails = await quizItem.getQuizItemById(quizName, '1');

		assert.equal(quizItemDetails.answer, 'Option 4', 'Correct answer is set correctly');
		assert.equal(quizItemDetails.question, 'Test Quiz Item', 'Correct qustion is set correctly');
		assert.equal(quizItemDetails.options.length, 4, 'All options were added');

		// Remove test quiz
		console.log('Remove Test Quiz')
		const quizToDelete = new Quiz(quizName);
    	quizToDelete.deleteQuiz(quizName);
	});
});