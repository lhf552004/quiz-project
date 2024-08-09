import { expect } from "chai";
import sinon from "sinon";
import fs from "fs";
import { User } from "../../src/modules/user.js";
import { v4 as uuidv4 } from "uuid";

describe("User", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("constructor", () => {
    it("should create a new User instance with default values", () => {
      const user = new User("1", "test@example.com", "password123", "username");

      expect(user.id).to.equal("1");
      expect(user.email).to.equal("test@example.com");
      expect(user.password).to.equal("password123");
      expect(user.username).to.equal("username");
      expect(user.firstname).to.equal("");
      expect(user.lastname).to.equal("");
      expect(user.age).to.equal(0);
    });
  });

  describe("store", () => {
    it("should store a new user in the database", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(false);
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");
      // const stubUuidv4 = sandbox.stub(uuidv4, "returns").returns("new-uuid");

      const user = new User(
        null,
        "test@example.com",
        "password123",
        "username"
      );

      user.store("testBank");

      expect(stubExistsSync.calledOnce).to.be.true;
      expect(stubWriteFileSync.calledOnce).to.be.true;
      // expect(user.id).to.equal("new-uuid");

      const usersData = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      expect(usersData[0].email).to.equal("test@example.com");
    });

    it("should throw an error if the user already exists", () => {
      const existingUsers = [{ email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));

      const user = new User(
        null,
        "test@example.com",
        "password123",
        "username"
      );

      expect(() => user.store("testBank")).to.throw("User already existed.");
    });
  });

  describe("update", () => {
    it("should update an existing user in the database", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");

      User.update("testBank", "1", { username: "newUsername" });

      expect(stubWriteFileSync.calledOnce).to.be.true;

      const updatedUsers = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      expect(updatedUsers[0].username).to.equal("newUsername");
    });

    it("should throw an error if the user does not exist", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox.stub(fs, "readFileSync").returns("[]");

      expect(() =>
        User.update("testBank", "1", { username: "newUsername" })
      ).to.throw("The user doesn't exist.");
    });
  });

  describe("fetch", () => {
    it("should return a user instance if the user is found", () => {
      const existingUsers = [
        { id: "1", email: "test@example.com", password: "password123" },
      ];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));

      const user = User.fetch("testBank", "test@example.com", "password123");

      expect(user).to.be.an.instanceof(User);
      expect(user.email).to.equal("test@example.com");
    });

    it("should return undefined if the user is not found", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox.stub(fs, "readFileSync").returns("[]");

      const user = User.fetch("testBank", "test@example.com", "wrongPassword");

      expect(user).to.be.undefined;
    });
  });

  describe("fetchUsers", () => {
    it("should return a list of users with only id and email", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));

      const users = User.fetchUsers("testBank");

      expect(users).to.deep.equal([{ id: "1", email: "test@example.com" }]);
    });

    it("should return undefined if no users are found", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(false);

      const users = User.fetchUsers("testBank");

      expect(users).to.be.undefined;
    });
  });

  describe("delete", () => {
    it("should delete a user by id", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");

      const result = User.delete("testBank", "1");

      expect(result).to.equal(0);
      expect(stubWriteFileSync.calledOnce).to.be.true;

      const updatedUsers = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      expect(updatedUsers).to.be.empty;
    });

    it("should return -1 if an error occurs during deletion", () => {
      const stubExistsSync = sandbox
        .stub(fs, "existsSync")
        .throws(new Error("File system error"));

      const result = User.delete("testBank", "1");

      expect(result).to.equal(-1);
    });
  });
});
