import chai from "chai";
import chaiHttp from "chai-http";
import { app, server } from "../src/serve.js";
import { Quiz, QuizItem } from "../src/modules/quizbank.mjs";
const expect = chai.expect;

chai.use(chaiHttp);
after(function (done) {
  server.close(done);
});
// It maybe failed for router test, as it just not for the router itself.
// It involves pages, which maybe change.
describe("Home Router Regression Test", () => {
  it("Should get quiz item", async () => {
    console.log("it home get");
    chai
      .request(app)
      .get(`/`)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    // expect(res.status).to.equal(200);
  });
});
