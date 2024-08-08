import { User } from "../src/modules/user.js";
import chai, { assert } from "chai";
const expect = chai.expect;

describe("User class", () => {
  let userId;
  it("store and fetch", () => {
    const newUser = new User("", "tom.cruise@gmail.com", "123");
    newUser.store("temp_user");
    userId = newUser.id;
    const existed = User.fetch("temp_user", newUser.email, newUser.password);
    assert.equal(existed.email, newUser.email);
    assert.equal(existed.password, newUser.password);
    assert.lengthOf(existed.id, 36);
  });

  it("store should failed as duplicate", () => {
    expect(function () {
      const newUser = new User("", "tom.cruise@gmail.com", "123");
      newUser.store("temp_user");
    }).to.throw(Error, "User already existed.");
  });

  it("update and fetch", () => {
    const updated = {
      email: "tom2.cruise@gmail.com",
      username: "tom_cruise",
      firstname: "Tom",
      lastname: "Cruise",
      age: 30,
    };
    User.update("temp_user", userId, updated);

    const existed = User.fetch("temp_user", updated.email, "123");
    assert.equal(existed.email, updated.email);
    assert.equal(existed.username, updated.username);
    assert.equal(existed.firstname, updated.firstname);
    assert.equal(existed.lastname, updated.lastname);
    assert.equal(existed.age, updated.age);
    assert.equal(existed.password, "123");
    assert.lengthOf(existed.id, 36);
  });

  it("update should failed as doesn' exist", () => {
    expect(function () {
      const updated = {
        email: "tom2.cruise@gmail.com",
        username: "tom_cruise",
        firstname: "Tom",
        lastname: "Cruise",
        age: 30,
      };
      User.update("temp_user", "123456", updated);
    }).to.throw(Error, "The user doesn't exist.");
  });

  it("delete", () => {
    console.log(userId);
    User.delete("temp_user", userId);

    var theUser;

    try {
      theUser = User.fetch("temp_user", "tom2.cruise@gmail.com", "123");
    } catch (e) {
      return;
    }

    if (!theUser) return;

    assert.notEqual(theUser.email, newUser.email);
    assert.notEqual(theUser.password, newUser.password);
    assert.notEqual(theUser.id, existed.id);
  });
});
