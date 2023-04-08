import puppeteer from "puppeteer";
import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from '../serve.js';

let browser = null, page = null;
chai.use(chaiHttp);

const expect = chai.expect;

describe("Create Quiz Modal", function () {
	this.timeout(60 * 1000);
	before(async () => {
		browser = await puppeteer.launch({ headless: false }) // with visual
		page = await browser.newPage();

		await chai.request(app).keepOpen();
	});
	after(async () => {
		await browser.close();
	});

	it("Should show quiz page", async function () {
		await page.goto("http://localhost:3000/users/admin/1");
		await page.waitForTimeout(1000);

		await page.waitForSelector('h3', { visible: true });
		const titleText = await page.evaluate(() => document.querySelector('h3').textContent);
		// Make sure the page has title 
		expect(titleText).to.contain('Quizzy Admin Panel');
	});
	
	it("Check add new quiz button", async () => {
		const addNewQuizBtn = await page.evaluate(() => document.querySelector('.add-quiz-link').textContent);

        // Make sure the button has the right text
        assert.equal(addNewQuizBtn, 'Add New Quiz +');

	});

	it("Check successfully create quiz", async() => {
        await page.evaluate(() => document.querySelector('.add-quiz-link').click());

        await page.waitForSelector('.create-quiz-modal', { visible: true });

        const modalTitle = await page.evaluate(() => document.querySelector('.create-quiz-modal h2').textContent);
		assert.equal(modalTitle, 'Add New Quiz');

        const quizNameField = await page.$('input#quizname');
        expect(quizNameField).to.exist;

        const createQuizBtn = await page.$('.create-quiz-btn');
        expect(createQuizBtn).to.exist;

        await page.type('input#quizname', 'createTest');

        await page.waitForTimeout(2000);

        await page.evaluate(() => document.querySelector('.create-quiz-btn').click());
        
        await page.waitForTimeout(5000);

        // check to see if redirect correctly
        let title = await page.title();
		assert.equal(title, "Quiz createTest");

        // remove test quiz
        return chai.request(app)
            .delete('/quiz/createTest')
            .then((resp) => {
                assert.equal(resp.body.message, 'quiz deleted successfully.')
            });		

    });
});