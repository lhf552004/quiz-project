import assert from 'assert';
import { QuizItem, Quiz } from '../modules/quizbank.mjs'
import {db} from '../api/config.js'

describe('QuizItem', function() {
  const testQuizName = 'GK';
  const testQuizItemId = '1';
  const testQuestion = 'What is the capital of France?';
  const testAnswer = 'Paris';
  const testOptions = ['Paris', 'Berlin', 'London', 'Rome'];

  describe('#storeQuizItem()', function() {
    it('should store a quiz item in the database', async function() {
      const quizItem = new QuizItem(testQuizItemId, testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(testQuizName);

      const docRef = db.collection(testQuizName).doc(testQuizItemId);
      const doc = await docRef.get();
      assert.ok(doc.exists, 'Document does not exist in the database');
      assert.strictEqual(doc.data().question, testQuestion, 'Question does not match');
      assert.strictEqual(doc.data().answer, testAnswer, 'Answer does not match');
      assert.deepStrictEqual(doc.data().options, testOptions, 'Options do not match');
    });
  });

  describe('#correct()', function() {
    it('should return true if the answer is correct', async function() {
      const quizItem = new QuizItem(testQuizItemId, testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(testQuizName);

      const result = await quizItem.correct(testQuizName, testQuizItemId, testAnswer);
      assert.strictEqual(result, true);
    });

    it('should return false if the answer is incorrect', async function() {
      const quizItem = new QuizItem(testQuizItemId, testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(testQuizName);

      const result = await quizItem.correct(testQuizName, testQuizItemId, 'Wrong Answer');
      assert.strictEqual(result, false);
    });
  });

  describe('#getQuizItemById()', function() {
    it('should retrieve the quiz item with the specified ID', async function() {
      const quizItem = new QuizItem(testQuizItemId, testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(testQuizName);

      const retrievedQuizItem = await quizItem.getQuizItemById(testQuizName, testQuizItemId);
      assert.ok(retrievedQuizItem);
      assert.strictEqual(retrievedQuizItem.question, testQuestion);
      assert.strictEqual(retrievedQuizItem.answer, testAnswer);
      assert.deepStrictEqual(retrievedQuizItem.options, testOptions);
    });
  });

  describe('#deleteQuizItem()', function() {
    it('should delete the quiz item with the specified ID', async function() {
      const quizItem = new QuizItem(testQuizItemId, testQuestion, testAnswer, testOptions);
      await quizItem.storeQuizItem(testQuizName);

      await quizItem.deleteQuizItem(testQuizName, testQuizItemId);

      const docRef = db.collection(testQuizName).doc(testQuizItemId);
      const doc = await docRef.get();
      assert.ok(!doc.exists);
    });
  });
});

// Tests for the Quiz class below:

describe('Quiz', function() {
  const testQuizName = 'TestQuiz';

  // Clean up after tests
  afterEach(async function() {
    await db.collection('Quizzes').doc(testQuizName).delete();
  });

  describe('#createNewQuiz()', function() {
    it('should create a new quiz collection in Firestore', async function() {
      const quiz = new Quiz();
      const createdQuizName = await quiz.createNewQuiz(testQuizName);

      const quizRef = db.collection('Quizzes').doc(testQuizName);
      const doc = await quizRef.get();
      assert.ok(doc.exists);
      assert.strictEqual(createdQuizName, testQuizName);
    });
  });

  describe('#fetchAllQuizNames()', function() {
    it('should fetch all quiz names from Firestore', async function() {
      const quiz = new Quiz();
      await quiz.createNewQuiz(testQuizName);

      const quizNames = await quiz.fetchAllQuizNames();
      assert.ok(quizNames);
      assert.ok(quizNames.includes(testQuizName));
    });
  });

describe('#fetchAllQuizItems()', function () {
     const testQuizItemId = '1';
     const testQuestion = 'What is the capital of France?';
     const testAnswer = 'Paris';
     const testOptions = ['Paris', 'Berlin', 'London', 'Rome'];
  
    it('should fetch all quiz items from a quiz collection in Firestore', async function () {
      const quizItem = new QuizItem();
      const quiz = new Quiz();
      const quizItems = await quiz.fetchAllQuizItems("GK");
      
      assert.ok(quizItems, 'Quiz items not fetched');
      assert.strictEqual(quizItems.length, 2, 'Incorrect number of quiz items');
      assert.strictEqual(quizItems[0].id, testQuizItemId, 'ID does not match');
      assert.strictEqual(quizItems[0].question, testQuestion, 'Question does not match');
      assert.strictEqual(quizItems[0].answer, testAnswer, 'Answer does not match');
      assert.deepStrictEqual(quizItems[0].options, testOptions, 'Options do not match');
    });
  });  

  describe('#deleteQuiz()', function() {
    it('should delete a quiz collection from Firestore', async function() {
      const quiz = new Quiz();
      await quiz.createNewQuiz(testQuizName);

      const deletionResult = await quiz.deleteQuiz(testQuizName);

      const quizRef = db.collection('Quizzes').doc(testQuizName);
      const doc = await quizRef.get();
      assert.ok(!doc.exists);
      assert.strictEqual(deletionResult, true);
    });
  });

});

