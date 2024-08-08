import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/serve.js";
import { Quiz, QuizItem } from "../src/modules/quizbank.js";
const expect = chai.expect;

chai.use(chaiHttp);

// It maybe failed for router test, as it just not for the router itself.
// It involves pages, which maybe change.
describe("QuizItem Router Regression Test", () => {
  let quizName = "test";
  const quizItemId = "123";
  let quiz;
  before(async () => {
    quiz = new Quiz();
    await quiz.createNewQuiz(quizName);
    const quizItem = new QuizItem(
      quizItemId,
      "test question1?",
      "test answer1",
      ["test option1", "test option2", "test option3", "test option4"]
    );
    quizItem.storeQuizItem(quizName);
  });

  it("Should get quiz item", async () => {
    console.log("it quizitem get");
    const res = await chai
      .request(app)
      .get(`/quizitem/${quizItemId}/quiz/${quizName}`);
    expect(res.status).to.equal(200);
  });

  it("Should access add-quiz-item page", async () => {
    console.log("it add-quiz-item page");
    const res = await chai
      .request(app)
      .get(`/quizitem/quiz/${quizName}/add-quiz-item`);
    expect(res.status).to.equal(200);
  });

  it("Should access update-quiz-item page", async () => {
    console.log("it update-quiz-item page");
    const res = await chai
      .request(app)
      .get(`/quizitem/quiz/${quizName}/update-quiz-item/${quizItemId}`);
    expect(res.status).to.equal(200);
  });

  it("Quiz item post", async () => {
    console.log("it quiz item post");
    const res = await chai
      .request(app)
      .post(`/quizitem/${quizName}`)
      .send({
        question: "Test question 2",
        answer: "test answer 2",
        options: ["option1", "option2", "option3", "option4"],
      });
    expect(res.status).to.equal(200);
  });

  it("Quiz item put", async () => {
    console.log("it quiz item put");
    const res = await chai
      .request(app)
      .put(`/quizitem/${quizName}/quizitem/${quizItemId}`)
      .send({
        id: quizItemId,
        question: "Test question 2 update",
        answer: "test answer 2 update",
        options: ["option1", "option2", "option3", "option4"],
      });
    expect(res.status).to.equal(200);
  });

  // it('Should delete the quiz item', async () => {
  //     console.log('it delete quiz item');
  //     const res = await chai.request(app)
  //     .delete(`/quizitem/${quizItemId}/quiz/${quizName}`);
  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.deep.equal({ message: 'quizItem deleted successfully.' });

  // });

  after(async () => {
    await quiz.deleteQuiz(quizName);
  });
});
