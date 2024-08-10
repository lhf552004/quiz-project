import { expect } from "chai";
import sinon from "sinon";
import { QuizItem, Quiz } from "../../src/modules/quizbank.js";
import { db } from "../../src/api/config.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseMock from "firebase-mock";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";

chai.use(chaiAsPromised); // Add chai-as-promised to Chai for promise-based assertions

// Create a mock Firestore instance
const mockFirestore = new firebaseMock.MockFirestore();
const mockSdk = firebaseMock.MockFirebaseSdk(
  null, // RTDB
  () => mockFirestore, // Firestore
  null, // Auth
  null, // Storage
  null // Messaging
);
firebase.firestore = mockSdk.firestore; // Replace Firestore with the mock Firestore

describe("QuizItem", function () {
  // Define constants used in multiple tests
  const quizItemId = "2";
  const quizName = "testQuiz";
  const testQuestion = "What is the capital of France?";
  const testAnswer = "Paris";
  const testOptions = ["Paris", "Berlin", "London", "Rome"];
  let quizItem;
  let collectionStub,
    docStub,
    setStub,
    getStub,
    dbStub,
    docGetStub,
    docDeleteStub,
    docUpdateStub;

  beforeEach(() => {
    // Create stubs for Firestore methods
    docStub = sinon.stub();
    setStub = sinon.stub();
    getStub = sinon.stub();
    docGetStub = sinon.stub();
    docDeleteStub = sinon.stub();
    docUpdateStub = sinon.stub();
    // Stub Firestore collection and document methods
    collectionStub = sinon.stub(db, "collection").returns({
      doc: docStub,
      get: getStub,
    });
    docStub.returns({
      set: setStub,
      get: docGetStub,
      delete: docDeleteStub,
      update: docUpdateStub,
    });
    quizItem = new QuizItem();
  });

  describe("constructor", () => {
    it("should create a quiz item", async function () {
      // Test that the QuizItem constructor initializes properties correctly
      quizItem = new QuizItem(testQuestion, testAnswer, testOptions);

      // Verify that the properties are set correctly
      expect(quizItem.question).to.be.equal(testQuestion);
      expect(quizItem.answer).to.be.equal(testAnswer);
      expect(quizItem.options).to.eql(testOptions);
    });
  });

  describe("storeQuizItem", () => {
    const mockSnapshot = {
      forEach: (callback) => {
        callback({ id: "1" }); // Simulate existing documents in the collection
      },
    };

    it("should store a quiz item in the database", async function () {
      // Simulate retrieving existing quiz items
      getStub.resolves(mockSnapshot);
      setStub.resolves(); // Simulate a successful set operation

      quizItem = new QuizItem(testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(quizName); // Call the method being tested

      // Verify that the Firestore methods were called correctly

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(getStub.calledOnce).to.be.true;
      console.log("Check doc method calling");
      expect(docStub.calledOnceWithExactly("2")).to.be.true; // ID is "2" because of the mock
      expect(
        setStub.calledOnceWithExactly({
          question: testQuestion,
          answer: testAnswer,
          options: testOptions,
        })
      ).to.be.true;
    });

    it("Store a quiz item with error when fetch from collection in the database", async function () {
      // Simulate an error when fetching the collection
      getStub.rejects(new Error("Error fetching collection"));

      quizItem = new QuizItem(testQuestion, testAnswer, testOptions);

      // Attempt to store the item with firebase error
      await expect(quizItem.storeQuizItem(quizName)).to.be.rejectedWith(
        "Error fetching collection"
      );

      // Verify that the correct error handling occurred

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(getStub.calledOnce).to.be.true;
    });
  });

  describe("getQuizItemById", () => {
    it("Should get a quiz item successfully", async function () {
      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };

      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });

      // Call the method to retrieve a quiz item by ID
      const item = await quizItem.getQuizItemById(quizName, "2");

      // Verify that the item was retrieved successfully

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.deep.equal({
        ...itemMock,
        id: quizItemId,
      });
    });

    it("Should get null by wrong id", async function () {
      const get2Stub = sinon.stub();

      docStub.returns({
        get: get2Stub,
      });

      get2Stub.resolves({
        id: null,
        exists: false, // Simulate a non-existent document
      });

      // Call the method to retrieve a non-existent quiz item
      const item = await quizItem.getQuizItemById(quizName, "3");

      // Verify that null is returned for non-existent items

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(get2Stub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.be.null;
    });

    it("Should handle database error when fetching quiz item", async function () {
      const get2Stub = sinon.stub();

      docStub.returns({
        get: get2Stub,
      });

      // Simulate an error when fetching the quiz item
      get2Stub.rejects(new Error("Error fetching quiz item"));
      const consoleErrorSpy = sinon.spy(console, "error");

      // Call the method, expecting it to handle the error
      const item = await quizItem.getQuizItemById(quizName, "3");

      // Verify that the error was logged and handled correctly

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(get2Stub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.be.null; // Item should be null if there was an error
      expect(consoleErrorSpy.calledOnce).to.be.true;
      consoleErrorSpy.restore(); // Restore original console.error
    });

    it("Should handle empty database", async function () {
      // This test would handle cases where the database returns an empty collection
    });

    it("Should handle large database", async function () {
      // This test would handle cases where the database has a large number of entries
    });
  });

  describe("correct", () => {
    it("Should return true for the correct answer", async function () {
      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };

      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });

      // Call the method to check if the correct answer is returned
      const result = await quizItem.correct(quizName, quizItemId, testAnswer);

      // Verify that the correct answer is identified

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(result).to.be.true;
    });

    it("Should return false for the wrong answer", async function () {
      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };

      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });

      // Call the method with the wrong answer
      const result = await quizItem.correct(
        quizName,
        quizItemId,
        "wrong answer"
      );

      // Verify that the wrong answer is identified correctly

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(result).to.be.false;
    });

    it("Should handle the doc not existed", async function () {
      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };

      // Simulate a document that does not exist
      docGetStub.resolves({
        id: quizItemId,
        exists: false,
        data: () => itemMock,
      });

      // Call the method expecting it to handle the non-existent document
      const result = await quizItem.correct(quizName, quizItemId, testAnswer);

      // Verify that the method handles non-existent documents correctly

      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;

      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      console.log(result);
      expect(result).to.be.undefined;
    });

    it("Should handle database error", async function () {
      // Simulate an error when getting the document
      docGetStub.rejects(new Error("Firestore get error"));

      const result = quizItem.correct(quizName, quizItemId, testAnswer);

      // Verify that the method correctly rejects with the Firestore error
      await expect(result).to.be.rejectedWith("Firestore get error");
      expect(docGetStub.calledOnce).to.be.true;
    });
  });

  describe("deleteQuizItem", () => {
    let docDeleteStub;

    beforeEach(function () {
      // Stub the Firestore delete and get methods
      docDeleteStub = sinon.stub();
      docStub.returns({
        delete: docDeleteStub,
        get: docGetStub,
      });
    });

    it("Should delete quiz item successfully", async () => {
      // Simulate a successful deletion
      docDeleteStub.resolves();
      docGetStub.resolves({ exists: true });
      // Call the method and expect it to fulfill the promise
      await expect(quizItem.deleteQuizItem(quizName, quizItemId)).to.be
        .fulfilled;
      expect(docDeleteStub.calledOnce).to.be.true;
    });

    it("Should handle quiz item not found", async () => {
      // Simulate the document does not exist
      docGetStub.resolves({ exists: false });
      docDeleteStub.resolves(); // Firestore delete will still resolve even if the document doesn't exist

      // Call the method expecting it to handle the non-existent item
      try {
        await quizItem.deleteQuizItem(quizName, quizItemId);
      } catch (error) {
        // Handle the error, e.g., log it or throw a custom error
        expect(error.message).to.equal(
          `Quiz item with ID 'testItem' not found in quiz 'testQuiz'.`
        );
      }

      expect(docGetStub.calledOnce).to.be.true;
      expect(docDeleteStub.called).to.be.false; // Ensure delete is not called when the item doesn't exist
    });

    it("Should handle firebase error", async () => {
      // Simulate a deletion error
      docGetStub.resolves({ exists: true });
      docDeleteStub.rejects(new Error("Firestore delete error"));

      // Call the method and expect it to reject with the Firestore error
      await expect(
        quizItem.deleteQuizItem(quizName, quizItemId)
      ).to.be.rejectedWith("Firestore delete error");

      expect(docDeleteStub.calledOnce).to.be.true;
    });

    it("Should no side effect", async () => {
      docDeleteStub.resolves();

      docGetStub.resolves({
        id: "anotherItemId",
        exists: true,
        data: () => ({
          id: "anotherItemId",
          answer: "answer",
          question: "question",
          options: ["answer", "option2"],
        }),
      });

      // Call the method to delete a quiz item and ensure no side effects
      await expect(quizItem.deleteQuizItem(quizName, quizItemId)).to.be
        .fulfilled;
      expect(docDeleteStub.calledOnce).to.be.true;

      // Call getQuizItemById and ensure that another item still exists
      const result = await quizItem.getQuizItemById(quizName, "anotherItemId");
      console.log(result);
      expect(result).to.not.be.null;
      expect(result.id).to.be.equal("anotherItemId");
    });
  });

  describe("update", () => {
    let updateMock = {
      question: "updated question",
      answer: "updated answer",
      options: ["option1", "option2"],
    };
    beforeEach(() => {});
    it("Should update quiz item successfully", async () => {
      // This test would ensure the quiz item is updated correctly
      docGetStub.resolves({
        id: quizItemId,
        exists: true,
      });

      const result = await quizItem.update(quizName, quizItemId, updateMock);
      expect(docUpdateStub.calledOnce).to.be.true;
      expect(docUpdateStub.calledWithExactly(updateMock)).to.be.true;

      // Check that the update method was called with the correct partial data
      expect(docUpdateStub.args[0][0]).to.deep.equal(updateMock);

      // Verify that the update method returned true, indicating success
      expect(result).to.be.true;
    });

    it("Should handle quiz item not found", async () => {
      // This test would ensure the method handles cases where the item does not exist
      docGetStub.resolves({
        exists: false,
      });

      const result = await quizItem.update(quizName, quizItemId, updateMock);
      await expect(docUpdateStub.calledOnce).to.be.false;
      await expect(result).to.be.false;
    });

    it("Should handle invalid input", () => {
      // This test would ensure the method handles invalid input correctly
      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => ({
          question: testQuestion,
          answer: testAnswer,
          options: testOptions,
        }),
      });
      let wrongInput;
      wrongInput = null;

      const checkInput = async (wrongInput) => {
        console.log(wrongInput);
        console.log(typeof wrongInput);
        await expect(() =>
          quizItem.update(quizName, quizItemId, wrongInput)
        ).to.throw(
          `Expected updatedFields to be a non-null object, but got ${typeof wrongInput}`
        );
      };
      checkInput(null);
      checkInput("");
      checkInput([]);
    });

    it("Should partial update", async () => {
      // This test would ensure the method handles partial updates correctly
    });

    it("Should handle database error", async () => {
      // This test would ensure the method handles database errors correctly
      docGetStub.resolves({
        exists: true,
      });
      // Simulate a update error
      docUpdateStub.rejects(new Error("Firestore delete error"));

      // Call the method and expect it to reject with the Firestore error
      await expect(
        quizItem.update(quizName, quizItemId, updateMock)
      ).to.be.rejectedWith("Firestore delete error");

      expect(docUpdateStub.calledOnce).to.be.true;
    });

    it("Should no side effect", () => {
      // This test would ensure the update operation has no side effects on other items
    });
  });

  afterEach(() => {
    // Restore the stubs after each test to avoid interference
    sinon.restore();
  });
});

describe("Quiz", function () {
  let collectionStub, docStub, setStub, getStub, dbStub;

  beforeEach(() => {
    // This setup would initialize stubs for each test in the Quiz suite
  });

  describe("createNewQuiz", () => {
    // This test suite would ensure new quizzes are created correctly
  });

  describe("fetchAllQuizNames", () => {
    // This test suite would ensure all quiz names are fetched correctly
  });

  describe("fetchAllQuizItems", () => {
    // This test suite would ensure all quiz items are fetched correctly
  });

  describe("deleteQuiz", () => {
    // This test suite would ensure quizzes are deleted correctly
  });

  afterEach(() => {
    // Restore the stubs after each test in the Quiz suite
    sinon.restore();
  });
});
