import assert from 'assert';
import { QuizItem, Quiz } from '../modules/quizbank.mjs'
import {db} from '../api/config.js'

describe('QuizItem', function () {
  const testQuizName = 'GK';
  const testQuestion = 'What is the capital of France?';
  const testAnswer = 'Paris';
  const testOptions = ['Paris', 'Berlin', 'London', 'Rome'];
  let testQuizItemId;

  it('should store a quiz item in the database', async function () {
    const quizItem = new QuizItem(testQuestion, testAnswer, testOptions);
    await quizItem.storeQuizItem(testQuizName);

    // Fetch the quiz item from the database
    const quizItems = await db.collection(testQuizName).where('question', '==', testQuestion).get();

    // Test the fetched quiz item
    let itemExists = false;
    quizItems.forEach((doc) => {
      itemExists = true;
      testQuizItemId = doc.id;
      assert.strictEqual(doc.data().question, testQuestion, 'Question does not match');
      assert.strictEqual(doc.data().answer, testAnswer, 'Answer does not match');
      assert.deepStrictEqual(doc.data().options, testOptions, 'Options do not match');
    });

    assert.ok(itemExists, 'Quiz item does not exist in the database');
  });

  it('should retrieve a quiz item by ID', async function () {
    const quizItem = new QuizItem();
    const fetchedQuizItem = await quizItem.getQuizItemById(testQuizName, testQuizItemId);

    assert.strictEqual(fetchedQuizItem.question, testQuestion, 'Question does not match');
    assert.strictEqual(fetchedQuizItem.answer, testAnswer, 'Answer does not match');
    assert.deepStrictEqual(fetchedQuizItem.options, testOptions, 'Options do not match');
  });

  it('should update a quiz item in the database', async function () {
    const updatedQuestion = 'What is the capital city of France?';
    const quizItem = new QuizItem();
    const success = await quizItem.update(testQuizName, testQuizItemId, { question: updatedQuestion });
    assert.ok(success, 'Quiz item update failed');

    const fetchedQuizItem = await quizItem.getQuizItemById(testQuizName, testQuizItemId);
    assert.strictEqual(fetchedQuizItem.question, updatedQuestion, 'Updated question does not match');
  });

  it('should check if the answer is correct', async function () {
    const quizItem = new QuizItem();
    const isCorrect = await quizItem.correct(testQuizName, testQuizItemId, testAnswer);
    assert.ok(isCorrect, 'Answer check failed');
  });

  it('should delete a quiz item from the database', async function () {
    const quizItem = new QuizItem();
    quizItem.deleteQuizItem(testQuizName, testQuizItemId);

    const docRef = db.collection(testQuizName).doc(testQuizItemId);
    const doc = await docRef.get();
    assert.ok(!doc.exists, 'Quiz item not deleted from the database');
  });
});


// Tests for the Quiz class below:

describe('Quiz', function () {
  let quiz;
  const testQuizName = 'GK';

  before(function () {
    quiz = new Quiz(testQuizName);
  });

  it('should create a new quiz', async function () {
    const newQuizName = 'History';
    const createdQuizName = await quiz.createNewQuiz(newQuizName);
    assert.strictEqual(createdQuizName, newQuizName, 'New quiz name does not match');

    const quizRef = await db.collection('Quizzes').doc(newQuizName).get();
    assert.ok(quizRef.exists, 'Quiz does not exist in the database');
  });

  it('should fetch all quiz names', async function () {
    const quizNames = await quiz.fetchAllQuizNames();
    assert.ok(Array.isArray(quizNames), 'Quiz names should be an array');
    assert.ok(quizNames.length > 0, 'Quiz names array should not be empty');
    assert.ok(quizNames.includes(testQuizName), `Quiz names should include ${testQuizName}`);
  });

  it('should fetch all quiz items', async function () {
    const quizItems = await quiz.fetchAllQuizItems(testQuizName);
    assert.ok(Array.isArray(quizItems), 'Quiz items should be an array');
  });

  it('should delete a quiz', async function () {
    const newQuizName = 'History';
    const success = await quiz.deleteQuiz(newQuizName);
    assert.ok(success, 'Quiz deletion failed');

    const quizRef = await db.collection('Quizzes').doc(newQuizName).get();
    assert.ok(!quizRef.exists, 'Quiz still exists in the database');
  });
});