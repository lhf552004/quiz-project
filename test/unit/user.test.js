import { User } from "../../src/modules/user.js";
import sinon from "sinon";
import chai, { assert } from "chai";
import fs from "fs";
const expect = chai.expect;

describe("User class", () => {
  // Fake user info
  const fileName = "temp_user";
  const email = "tom.cruise@gmail.com";
  const password = "123";

  it("Fetch user list", () => {
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    // Stub the read file method
    sinon.stub(fs, "readFileSync").returns(
      JSON.stringify([
        {
          id: 1,
          email: email,
          password: password,
        },
      ])
    );

    const users = User.fetchUsers(fileName);

    expect(users).to.have.lengthOf(1);
    users.forEach((user) => {
      expect(user).to.not.have.property("password");
    });
  });

  it("Fetch single user by email and password", () => {
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    sinon.stub(fs, "readFileSync").returns(
      JSON.stringify([
        {
          id: 1,
          email: email,
          password: password,
        },
      ])
    );

    const existed = User.fetch(fileName, email, password);

    expect(existed).not.to.be.undefined;
    console.log("fetched user is not null");
    expect(existed).to.have.property("email", email);
  });

  it("Create user without duplicate", () => {
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    // Stub a empty array of users
    sinon.stub(fs, "readFileSync").returns(JSON.stringify([]));
    // Stub the write method
    const writeStub = sinon.stub(fs, "writeFileSync");
    // Create the user
    const newUser = new User("", email, password);
    newUser.store(fileName);

    expect(writeStub.calledOnce).to.be.true;
  });

  it("Create user with duplicate", () => {
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    // Stub a empty array of users
    sinon.stub(fs, "readFileSync").returns(
      JSON.stringify([
        {
          id: 1,
          email: email,
          password: password,
        },
      ])
    );
    // Create the user
    const newUser = new User("", email, password);
    expect(() => newUser.store(fileName)).to.throw("User already existed.");
  });

  it("Update with existed user", () => {
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    // Stub a empty array of users
    const existed = {
      id: 1,
      email: email,
      password: password,
    };
    sinon.stub(fs, "readFileSync").returns(JSON.stringify([existed]));
    // Stub the write method
    const writeStub = sinon.stub(fs, "writeFileSync");
    const updated = {
      ...existed,
      username: "TomCruise",
      firstname: "Tom",
      lastname: "Cruise",
    };

    User.update(fileName, 1, updated);
    const data = JSON.stringify([updated]);
    // Check it is called
    expect(writeStub.calledOnce).to.be.true;
    // Check the parameter is the same
    const actualCallArgs = writeStub.getCall(0).args[1];
    const actualData = JSON.parse(actualCallArgs);
    const expectedData = JSON.parse(data);
    expect(actualData).to.deep.equal(expectedData);
  });

  it("Update with not existed user", () => {
    // Stub a empty array of users
    const existed = {
      id: 1,
      email: email,
      password: password,
    };
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    sinon.stub(fs, "readFileSync").returns(JSON.stringify([]));
    const updated = {
      ...existed,
      username: "TomCruise",
      firstname: "Tom",
      lastname: "Cruise",
    };
    expect(() => User.update(fileName, 1, updated)).to.throw(
      "The user doesn't exist."
    );
  });

  it("Delete user with id", () => {
    // Stub a empty array of users
    const existed = {
      id: 1,
      email: email,
      password: password,
    };
    // Stub the file, assume it is existed
    sinon.stub(fs, "existsSync").returns(true);
    sinon.stub(fs, "readFileSync").returns(JSON.stringify([existed]));
    // Stub the write method
    const writeStub = sinon.stub(fs, "writeFileSync");
    User.delete(fileName, 1);
    expect(writeStub.calledOnce).to.be.true;
    // Check the user list is empty
    const actualCallArgs = writeStub.getCall(0).args[1];
    const actualData = JSON.parse(actualCallArgs);
    expect(actualData).to.have.lengthOf(0);
  });

  afterEach(() => {
    // Restore the stubs
    sinon.restore();
  });
});
