import puppeteer from "puppeteer";
import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

const expect = chai.expect;

describe("Create Account Page", () => {
  let browser;
  let page;
  let userId;

  before(async function () {
    this.timeout(60000);
    try {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto("http://localhost:3000/users/create");
    } catch (error) {
      console.error(error);
    }
  });

  after(async () => {
    await browser.close();
  });

  //test check for email field
  it("should have an email field", async () => {
    const emailField = await page.$("#email");
    expect(emailField).to.exist;
  });

  //test check for password field
  it("should have a password field", async () => {
    const passwordField = await page.$("#password");
    expect(passwordField).to.exist;
  });

  //test check for "Already have an account? Login!" link
  it("should have 'Already have an account? Login!' link", async () => {
    const loginLink = await page.$('.button-link[href="/users/login"]');
    expect(loginLink).to.exist;
  });

  //test check for creation of new users
  it("Should create a new user", async () => {
    console.log(
      "New user is created successfully! Below is the user id of the newly created user:"
    );
    const res = await chai
      .request("http://localhost:3000")
      .post("/users/create")
      .send({ email: "abc@example.com", password: "abcpassword" });
      expect(res.status).to.equal(200);
      expect(res.text).to.include("<h1>This is user profile</h1>");
      userId = res.text.substring(
        res.text.indexOf("<h2>") + 4,
        res.text.indexOf("</h2>")
      );
    console.log(userId);
  });
});
