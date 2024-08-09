import { expect } from "chai";
import sinon from "sinon";
import { QuizItem, Quiz } from "../../src/modules/quizbank.js";
import { db } from "../../src/api/config.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseMock from "firebase-mock";

// Create a mock Firestore instance
const mockFirestore = new firebaseMock.MockFirestore();
const mockSdk = firebaseMock.MockFirebaseSdk(
  null, // RTDB
  () => mockFirestore, // Firestore
  null, // Auth
  null, // Storage
  null // Messaging
);
firebase.firestore = mockSdk.firestore;

describe("QuizItem", function () {
  const quizItemId = "2";
  const quizName = "testQuiz";
  const testQuestion = "What is the capital of France?";
  const testAnswer = "Paris";
  const testOptions = ["Paris", "Berlin", "London", "Rome"];

  let collectionStub, docStub, setStub, getStub, dbStub;
  beforeEach(() => {
    // Create stubs
    docStub = sinon.stub();
    setStub = sinon.stub();
    getStub = sinon.stub();

    // Stub Firestore methods
    collectionStub = sinon.stub(db, "collection").returns({
      doc: docStub,
      get: getStub,
    });
    docStub.returns({
      set: setStub,
    });
  });

  describe("constructor", () => {
    it("should create a quiz item", async function () {
      const quizItem = new QuizItem(testQuestion, testAnswer, testOptions);

      // Verify the creation
      expect(quizItem.question).to.be.equal(testQuestion);
      expect(quizItem.answer).to.be.equal(testAnswer);
      expect(quizItem.options).to.eql(testOptions);
    });
  });

  describe("storeQuizItem", () => {
    const mockSnapshot = {
      forEach: (callback) => {
        callback({ id: "1" });
      },
    };
    it("should store a quiz item in the database", async function () {
      getStub.resolves(mockSnapshot);
      setStub.resolves();

      const quizItem = new QuizItem(testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(quizName);

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(getStub.calledOnce).to.be.true;
      console.log("Check doc method calling");
      expect(docStub.calledOnceWithExactly("2")).to.be.true;
      expect(
        setStub.calledOnceWithExactly({
          question: testQuestion,
          answer: testAnswer,
          options: testOptions,
        })
      ).to.be.true;
    });

    it("Store a quiz item with error when fetch from collection in the database", async function () {
      const consoleErrorSpyOnStore = sinon.spy(console, "error");
      getStub.rejects(new Error("Error fetching collection"));
      const quizItem = new QuizItem(testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(quizName);

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(getStub.calledOnce).to.be.true;
      console.log("Check the exception");
      // TODO:
      expect(consoleErrorSpyOnStore.calledOnce).to.be.false;
      consoleErrorSpyOnStore.restore();
    });

    it("should get a quiz item in the database", async function () {
      const docGetStub = sinon.stub();

      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };
      debugger;
      docStub.returns({
        get: docGetStub,
      });
      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });
      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const item = await quizItem.getQuizItemById(quizName, "2");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.deep.equal({
        ...itemMock,
        id: quizItemId,
      });
    });

    it("getQuizItemById should null by wrong id", async function () {
      const get2Stub = sinon.stub();

      docStub.returns({
        get: get2Stub,
      });
      get2Stub.resolves({
        id: null,
        exists: false,
      });
      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const item = await quizItem.getQuizItemById(quizName, "3");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(get2Stub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.be.null;
    });

    it("getQuizItemById handle error when fetching quiz item", async function () {
      const get2Stub = sinon.stub();

      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };
      debugger;
      docStub.returns({
        get: get2Stub,
      });
      get2Stub.rejects(new Error("Error fetching quiz item"));
      const consoleErrorSpy = sinon.spy(console, "error");

      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const item = await quizItem.getQuizItemById(quizName, "3");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(get2Stub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.be.null;
      expect(consoleErrorSpy.calledOnce).to.be.true;
      consoleErrorSpy.restore();
    });
  });

  describe("getQuizItemById", () => {
    it("Should get a quiz item successfully", async function () {
      const docGetStub = sinon.stub();

      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };
      debugger;
      docStub.returns({
        get: docGetStub,
      });
      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });
      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const item = await quizItem.getQuizItemById(quizName, "2");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
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
        exists: false,
      });
      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const item = await quizItem.getQuizItemById(quizName, "3");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(get2Stub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.be.null;
    });

    it("Should handle database error when fetching quiz item", async function () {
      const get2Stub = sinon.stub();

      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };
      debugger;
      docStub.returns({
        get: get2Stub,
      });
      get2Stub.rejects(new Error("Error fetching quiz item"));
      const consoleErrorSpy = sinon.spy(console, "error");

      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const item = await quizItem.getQuizItemById(quizName, "3");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(get2Stub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(item).to.be.null;
      expect(consoleErrorSpy.calledOnce).to.be.true;
      consoleErrorSpy.restore();
    });

    it("Should handle empty database", async function () {});

    it("Should handle large database", async function () {});
  });

  describe("correct", () => {
    it("Should return true for the correct answer", async function () {
      const docGetStub = sinon.stub();

      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };

      docStub.returns({
        get: docGetStub,
      });
      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });
      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");

      const result = await quizItem.correct(quizName, quizItemId, testAnswer);

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(result).to.be.true;
    });

    it("Should return false for the wrong answer", async function () {
      const docGetStub = sinon.stub();

      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };

      docStub.returns({
        get: docGetStub,
      });
      docGetStub.resolves({
        id: quizItemId,
        exists: true,
        data: () => itemMock,
      });
      // const doc2Stub = sinon.stub(get2Stub, "data").callsFake(itemMock);
      const quizItem = new QuizItem("", "", "");
      // Give the wrong answer
      const result = await quizItem.correct(quizName, quizItemId, "");

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      expect(result).to.be.false;
    });

    it("Should handle the doc not existed", async function () {
      const docGetStub = sinon.stub();
      const itemMock = {
        question: testQuestion,
        answer: testAnswer,
        options: testOptions,
      };
      docStub.returns({
        get: docGetStub,
      });
      docGetStub.resolves({
        id: quizItemId,
        exists: false,
        data: () => itemMock,
      });

      const quizItem = new QuizItem("", "", "");

      const result = await quizItem.correct(quizName, quizItemId, testAnswer);

      // Verify the interactions
      console.log("Check collection calling");
      expect(collectionStub.calledOnceWithExactly(quizName)).to.be.true;
      console.log("Check get method calling");
      expect(docGetStub.calledOnce).to.be.true;
      console.log("Check the item");
      console.log(result);
      expect(result).to.be.undefined;
    });

    it("Should handle database error", async function () {});
  });

  describe("deleteQuizItem", () => {
    it("Should delete quizitem successfully", () => {
      deleteStub = sinon.stub();
      docStub.returns({
        delete: deleteStub,
      });
    });

    it("Should handle quiz item not found", () => {});

    it("Should handle database error", () => {});

    it("Should no side effect", () => {});
  });

  describe("update", () => {
    it("Should update quizitem successfully", () => {});

    it("Should handle quiz item not found", () => {});

    it("Should handle invalid input", () => {});

    it("Should partial update", () => {});

    it("Should handle database error", () => {});

    it("Should no side effect", () => {});
  });

  afterEach(() => {
    // Restore the stubs
    sinon.restore();
  });
});

describe("Quiz", function () {
  let collectionStub, docStub, setStub, getStub, dbStub;
  beforeEach(() => {});

  describe("createNewQuiz", () => {});

  describe("fetchAllQuizNames", () => {});

  describe("fetchAllQuizItems", () => {});

  describe("deleteQuiz", () => {});

  afterEach(() => {
    // Restore the stubs
    sinon.restore();
  });
});
