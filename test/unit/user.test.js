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

      user.store("temp_user");

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

      expect(() => user.store("temp_user")).to.throw("User already existed.");
    });
  });

  describe("update", () => {
    it("Should update user successfully", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");

      User.update("temp_user", "1", { username: "newUsername" });

      expect(stubWriteFileSync.calledOnce).to.be.true;

      const updatedUsers = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      expect(updatedUsers[0].username).to.equal("newUsername");
    });

    it("should throw an error if the user does not exist", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox.stub(fs, "readFileSync").returns("[]");

      expect(() =>
        User.update("temp_user", "1", { username: "newUsername" })
      ).to.throw("The user doesn't exist.");
    });

    it("Should handle invalid input", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));

      expect(() => User.update("temp_user", "1", null)).to.throw(
        "The user doesn't exist."
      );

      expect(() => User.update("temp_user", "1", "")).to.throw(
        "The input is not user object."
      );

      expect(() =>
        User.update("temp_user", "1", JSON.stringify(existingUsers))
      ).to.throw("The input is not user object.");
    });

    it("Should partial update", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");

      User.update("temp_user", "1", { username: "newUsername" });

      expect(stubWriteFileSync.calledOnce).to.be.true;

      const updatedUsers = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      expect(updatedUsers[0].username).to.equal("newUsername");
      // Other property should not be changed
      expect(updatedUsers[0].id).to.equal("1");
      expect(updatedUsers[0].email).to.equal("test@example.com");
    });

    it("Should handle database error", () => {
      const existingUsers = [{ id: "1", email: "test@example.com" }];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");
      stubWriteFileSync.rejects(new Error("File saving error"));

      expect(() =>
        User.update("temp_user", "1", { username: "newUsername" })
      ).to.throw("File saving error");
    });

    it("Should no side effect", () => {
      const existingUsers = [
        { id: "1", email: "test@example.com" },
        {
          id: "2",
          email: "test2@example.com",
          username: "test2",
          firstname: "Elon",
          lastname: "Mask",
        },
      ];
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox
        .stub(fs, "readFileSync")
        .returns(JSON.stringify(existingUsers));
      const stubWriteFileSync = sandbox.stub(fs, "writeFileSync");

      User.update("temp_user", "1", { username: "newUsername" });

      expect(stubWriteFileSync.calledOnce).to.be.true;

      const updatedUsers = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      const newUpdated = updatedUsers.find((u) => u.id === "1");
      const anotherUser = updatedUsers.find((u) => u.id === "2");
      expect(newUpdated.username).to.equal("newUsername");
      // Other property should not be changed
      expect(anotherUser.email).to.equal("test2@example.com");
      expect(anotherUser.username).to.equal("test2");
      expect(anotherUser.firstname).to.equal("Elon");
      expect(anotherUser.lastname).to.equal("Mask");
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

      const user = User.fetch("temp_user", "test@example.com", "password123");

      expect(user).to.be.an.instanceof(User);
      expect(user.email).to.equal("test@example.com");
    });

    it("should return undefined if the user is not found", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(true);
      const stubReadFileSync = sandbox.stub(fs, "readFileSync").returns("[]");

      const user = User.fetch("temp_user", "test@example.com", "wrongPassword");

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

      const users = User.fetchUsers("temp_user");

      expect(users).to.deep.equal([{ id: "1", email: "test@example.com" }]);
    });

    it("should return undefined if no users are found", () => {
      const stubExistsSync = sandbox.stub(fs, "existsSync").returns(false);

      const users = User.fetchUsers("temp_user");

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

      const result = User.delete("temp_user", "1");

      expect(result).to.equal(0);
      expect(stubWriteFileSync.calledOnce).to.be.true;

      const updatedUsers = JSON.parse(stubWriteFileSync.getCall(0).args[1]);
      expect(updatedUsers).to.be.empty;
    });

    it("should return -1 if an error occurs during deletion", () => {
      const stubExistsSync = sandbox
        .stub(fs, "existsSync")
        .throws(new Error("File system error"));

      const result = User.delete("temp_user", "1");

      expect(result).to.equal(-1);
    });
  });
});
