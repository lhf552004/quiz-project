import puppeteer from "puppeteer";
import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

const expect = chai.expect;

describe("User DashBoard Page", () => {
  let browser;
  let page;
  let userId;

  before(async function () {
    this.timeout(60000);
    try {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto("http://localhost:3000/users/dash-board/1");
    } catch (error) {
      console.error(error);
    }
  });
  after(async () => {
    await browser.close();
  });

// test to check "Dashboard" heading is present on UI.
  it('should have the "Dashboard" heading', async () => {
    const heading = await page.$eval('.heading', el => el.textContent);
    chai.expect(heading).to.equal('Dashboard');
  });

// test to check "Welcome to Quizzy!" welcoming content is present on UI.
  it('should have the welcoming content', async () => {
    const welcomeText = await page.$eval('.welcome-text', el => el.textContent);
    chai.expect(welcomeText).to.equal('Welcome to Quizzy!');
  });
 
// test to check instruction paragraph content is present on UI.
  it('should have instruction paragraph content" text', async () => {
    const infoText = await page.$eval('.info-text', el => el.textContent);
    expect(infoText).to.equal('Select the quiz type you want to play');
  });

// test to check list of quizzes is present on UI.
  it('should display list of quizzes fetched via loop', async () => { 

    const quizNames = await page.$$eval('.quiz-name', names => names.map(name => name.textContent));
    const quizCount = quizNames.length;
    console.log(`Below are the list of ${quizCount} quiz names displayed on the User Dashboard:`);
    console.log(quizNames);


   });

// test to check data analysis and preview link for each quiz is present on UI.
  it('should have data analysis and preview links for each quiz', async () => {
    const quizNames = await page.$$eval('.quiz-name', elements => elements.map(el => el.textContent));
    const quizCount = quizNames.length;
  
    const analysisLinks = await page.$$('a.analysis-preview-name');
    expect(analysisLinks.length).to.equal(quizCount * 2);
    
  });  
  
});


