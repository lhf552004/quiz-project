import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/serve.js";

const expect = chai.expect;

chai.use(chaiHttp);

// It maybe failed for router test, as it just not for the router itself.
// It involves pages, which maybe change.
describe("User Management Regression Test", () => {
  let userId;

  it("Should access user list", async () => {
    console.log("it user list");
    const res = await chai.request(app).get("/users");
    expect(res.status).to.equal(200);
  });

  it("Should access user login", async () => {
    console.log("it user login");
    const res = await chai.request(app).get("/users/login");
    expect(res.status).to.equal(200);
  });

  it("Should access user create page", async () => {
    console.log("it user create page");
    const res = await chai.request(app).get("/users/create");
    expect(res.status).to.equal(200);
  });

  it("Should create a new user", async () => {
    console.log("it create user");
    const res = await chai
      .request(app)
      .post("/users/create")
      .send({ email: "test2@example.com", password: "test2password" });
    expect(res.status).to.equal(200);
    expect(res.text).to.include("<h1>This is user profile</h1>");
    userId = res.text.substring(
      res.text.indexOf("<h2>") + 4,
      res.text.indexOf("</h2>")
    );
    console.log(userId);
  });

  it("Should update the user", async () => {
    console.log("it update user");
    console.log("id: " + userId);
    const res = await chai
      .request(app)
      .put(`/users/${userId}`)
      .send({ email: "updated@example.com", password: "updatedpassword" });
    expect(res.status).to.equal(200);
    expect(res.text).to.include("<h1>This is user profile</h1>");
    expect(res.text).to.include(userId);
  });

  it("Should log in as the user", async () => {
    console.log("it log in user");
    const res = await chai
      .request(app)
      .post("/users/login")
      .send({ email: "updated@example.com", password: "updatedpassword" });
    expect(res.status).to.equal(200);
    expect(res.text).to.include("<h1>This is user profile</h1>");
    expect(res.text).to.include(userId);
  });

  it("Should log in failed", async () => {
    console.log("it log in should be failed");
    const res = await chai
      .request(app)
      .post("/users/login")
      .send({ email: "aaa@example.com", password: "aaapassword" });
    expect(res.status).to.equal(500);
    expect(res.body).to.deep.equal({
      message: "User not found or password not correct.",
    });
  });

  it("Should delete the user", async () => {
    console.log("it delete user");
    const res = await chai.request(app).delete(`/users/${userId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: "user deleted successfully." });
  });

  // It is difficult to test status 500 for delete

  it("Should access the users page", async () => {
    console.log("it access users page");
    const res = await chai.request(app).get(`/users/`);
    expect(res.status).to.equal(200);
    expect(res.text).to.include("<h1>This is user list</h1>");
  });

  it("Should access the login page", async () => {
    console.log("it access login page");
    const res = await chai.request(app).get(`/users/login`);
    expect(res.status).to.equal(200);
    expect(res.text).to.include('<form method="post"');
  });

  it("Should access the dashboard page", async () => {
    console.log("it access dashboard page");
    const res = await chai.request(app).get(`/users/dash-board/1`);
    expect(res.status).to.equal(200);
    expect(res.text).to.include('<h2 class="heading">Dashboard</h2>');
  });

  it("Should access the admin page", async () => {
    console.log("it access admin page");
    const res = await chai.request(app).get(`/users/admin/1`);
    expect(res.status).to.equal(200);
  });
});
