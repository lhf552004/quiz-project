"use strict";
/**
 * @module Quizbank
 * @description The module is exports two classes Quiz and QuizItem
 * One quiz could have many quizitems
 * Currently data stores in the firebase database
 */

/**
 * @typedef import ref from db config file
 */
import { db } from "../api/config.js";

/**
 * @class QuizItem representing a Quiz Item.
 * @author: Sukrut
 * @description It contains a question and its answer and could check the answer is correct
 * */
class QuizItem {
  /**
   * @constructor QuizItem Constructor
   * @description Creates an instance of QuizItem.
   * @param {string} question The question of the QuizItem.
   * @param {string} answer   The answer of the QuizItem.
   */
  constructor(question, answer, options) {
    this.question = question;
    this.answer = answer;
    this.options = options;
  }

  /**
   * @method correct
   * @description Method to check if the given answer is correct or not for the quiz item with the given ID and quiz name in the database
   * @param {string} quizName - The name of the quiz collection in which the quiz item exists
   * @param {string} quizItemId - The ID of the quiz item to be checked
   * @param {string} answer - The answer to be checked
   * @returns {boolean} - Returns true if the answer is correct, else returns false
   */
  async correct(quizName, quizItemId, answer) {
    try {
      const docRef = db.collection(quizName).doc(quizItemId);
      const doc = await docRef.get();
      if (doc.exists) {
        const quizItem = doc.data();
        if (quizItem.answer === answer) {
          console.log("Correct Answer!!!");
          return true;
        } else {
          console.log("Wrong Answer!!!");
          return false;
        }
      } else {
        console.log(
          `No quiz item found with id ${quizItemId} in quiz collection ${quizName}`
        );
      }
    } catch (error) {
      console.error(
        `Error fetching quiz item with id ${quizItemId} from quiz collection ${quizName}: `,
        error
      );
      throw new Error(error);
    }
  }

  /**
   * @method storeQuizItem
   * @param {string} quizName - The name of the quiz to add the quiz items to
   * @description Store the quiz item into database
   */
  async storeQuizItem(quizName) {
    try {
      // Get the collection reference for the quiz with the given name
      const quizCollectionRef = db.collection(quizName);

      // Retrieve all quiz items in the collection
      const snapshot = await quizCollectionRef.get();
      let maxId = 0;

      // Find the maximum ID among the existing quiz items
      snapshot.forEach((doc) => {
        const currentId = parseInt(doc.id, 10);
        if (currentId > maxId) {
          maxId = currentId;
        }
      });

      // Increment the maximum ID by one for the new quiz item
      const nextId = (maxId + 1).toString();

      // Add the new quiz item with the next ID to the collection
      await quizCollectionRef.doc(nextId).set({
        question: this.question,
        answer: this.answer,
        options: this.options,
      });

      console.log(
        `Quiz item '${nextId}' added to quiz collection '${quizName}'`
      );
    } catch (error) {
      console.error(
        `Error storing quiz item in collection '${quizName}': ${error}`
      );
      throw new Error(error); // Rethrow the error to ensure it's handled by the caller
    }
  }

  /**
   * Retrieves a specific quiz item from the specified quiz collection in Firestore
   *
   * @async
   * @function getQuizItemById
   * @param {string} quizName - The name of the quiz collection in Firestore
   * @param {string} quizItemId - The ID of the quiz item to retrieve
   * @returns {Promise<Object>} The retrieved quiz item object
   */
  async getQuizItemById(quizName, quizItemId) {
    try {
      const docRef = db.collection(quizName);
      const doc = await docRef.doc(quizItemId).get();
      if (doc.exists) {
        // If the document exists, return it as a quizItem object
        const quizItem = doc.data();
        quizItem.id = doc.id;
        console.log(
          quizItem.id +
            "|" +
            quizItem.question +
            "|" +
            quizItem.answer +
            "|" +
            quizItem.options
        );
        return quizItem;
      } else {
        console.log(
          `No quiz item found with id ${quizItemId} in quiz collection ${quizName}`
        );
        return null;
      }
    } catch (error) {
      console.error(
        `Error fetching quiz item with id ${quizItemId} from quiz collection ${quizName}: `,
        error
      );
      return null;
    }
  }

  /**
   * @method deleteQuizItem
   * @description Method to delete quiz item by id in the database
   * @param {string} quizName - Name of the quiz collection to delete the quiz item from
   * @param {string} quizItemId - ID of the quiz item to be deleted
   */
  async deleteQuizItem(quizName, quizItemId) {
    try {
      // delete the quiz item in the Firebase Firestore
      await db.collection(quizName).doc(quizItemId).delete();
      console.log(`Deleted quiz item ${quizItemId} from ${quizName}`);
    } catch (error) {
      console.error(
        `Failed to delete quiz item with ID ${quizItemId}: `,
        error
      );
      throw error;
    }
  }

  /**
   * @method update
   * @description Method to update a quiz item with a given ID in the database
   * @param {string} quizName - The name of the quiz collection to update the quiz item in
   * @param {string} quizItemId - The ID of the quiz item to update
   * @param {Object} updatedFields - An object containing the updated fields and their values, e.g. { question: "New question", answer: "New answer" }
   * @returns {Promise<boolean>} - A Promise that resolves to true if the quiz item was updated successfully, or false otherwise
   */
  async update(quizName, quizItemId, updatedFields) {
    try {
      const docRef = db.collection(quizName).doc(quizItemId);
      const doc = await docRef.get();
      if (doc.exists) {
        // If the document exists, update the specified fields
        await docRef.update(updatedFields);
        console.log(
          `Quiz item with ID ${quizItemId} in quiz collection ${quizName} updated successfully.`
        );
        return true;
      } else {
        console.log(
          `No quiz item found with ID ${quizItemId} in quiz collection ${quizName}.`
        );
        return false;
      }
    } catch (error) {
      console.error(
        `Error updating quiz item with ID ${quizItemId} in quiz collection ${quizName}:`,
        error
      );
      return false;
    }
  }
}

/**
 * @class Quiz representing a Quiz.
 * @description It contains the array of quiz items
 * @author: Sukrut
 */
class Quiz {
  /**
   * Quiz Constructor
   * @param {number} id
   */
  constructor(quizName) {
    this.quizName = quizName;
    this.quizitems = [];
  }

  /**
   * @method createNewQuiz
   * @description Method to create a new Quiz and a new collection with the quiz name in Firestore
   * @param {string} quizName The name of the new quiz
   * @returns {Promise} A promise that resolves with the ID of the new quiz collection
   */
  async createNewQuiz(quizName) {
    try {
      // Check if a quiz with the same name already exists
      const quizRef = await db.collection("Quizzes").doc(quizName).get();
      if (quizRef.exists) {
        console.log(`Quiz with name ${quizName} already exists.`);
        return null;
      }

      // Add a new quiz collection in Firestore with the given quiz name as the ID
      await db.collection("Quizzes").doc(quizName).set({
        quizName: quizName,
      });

      console.log(`New quiz added with ID: ${quizName}`);

      // Create a new Quiz instance with the new quiz ID
      const newQuiz = new Quiz(quizName);
      return quizName;
    } catch (error) {
      console.error("Error creating new quiz: ", error);
      return null;
    }
  }

  /**
    @method fetchAllQuizNames
    @description Fetches all the Quiz names from the Firestore "Quizzes" collection and stores them in an array.
    @returns {Promise<Array<string>|null>} A Promise that resolves with an array of Quiz names, or null if an error occurs.
    */
  async fetchAllQuizNames() {
    try {
      const quizNames = [];
      const querySnapshot = await db.collection("Quizzes").get();
      querySnapshot.forEach((doc) => {
        const quizName = doc.id;
        quizNames.push(quizName);
      });
      console.log(quizNames);
      return quizNames;
    } catch (error) {
      console.error("Error fetching quiz names: ", error);
      return null;
    }
  }

  /**
    @method fetchAllQuizItems
    @async
    @description Fetches all quiz items from the Firestore database.
    @returns {Promise<Array<Object>|null>} - Returns a promise that resolves to an array of quiz items or null if there was an error.
    @throws {Error} - Throws an error if there was an error fetching the quiz items.
    @param {string} quizName - The name of the quiz collection to fetch quiz items from.
    */
  async fetchAllQuizItems(quizName) {
    try {
      const collectionRef = db.collection(quizName);
      const quizItemsSnapshot = await collectionRef.get();
      const quizItems = [];
      quizItemsSnapshot.forEach((doc) => {
        const quizItem = doc.data();
        quizItem.id = doc.id;
        quizItems.push(quizItem);
      });
      console.log(
        `Fetched ${quizItems.length} quiz items from collection ${quizName}`
      );
      quizItems.forEach((item) => {
        console.log(item.id);
        console.log(item.question);
        console.log(item.answer);
        console.log(item.options);
      });
      return quizItems;
    } catch (error) {
      console.error("Error fetching quiz items:", error);
    }
  }

  /**
   * @method deleteQuiz
   * @description Method to delete a quiz collection from Firestore by its name
   * @param {string} quizName - The name of the quiz collection to delete
   * @returns {Promise<boolean>} - A Promise that resolves to true if the collection was deleted successfully, or false otherwise
   */
  async deleteQuiz(quizName) {
    try {
      // Delete the quiz collection
      const collectionRef = db.collection(quizName);
      const querySnapshot = await collectionRef.get();
      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete();
      });

      // Delete the quiz from the Quizzes collection
      const quizRef = db.collection("Quizzes").doc(quizName);
      await quizRef.delete();

      console.log(`Quiz collection '${quizName}' deleted successfully.`);
      return true;
    } catch (error) {
      console.error(`Error deleting quiz collection '${quizName}':`, error);
      return false;
    }
  }
}

//var quizItem = new QuizItem();
//var quizItem = new QuizItem("What is the hollywood superstar?", "Nick",["SRK","Salman","Nick","Dwane"]);
//quizItem.storeQuizItem("Hollywood");
//quizItem.deleteQuizItem("foods","4");
//quizItem.getQuizItemById("foods","2");
//quizItem.correct("foods","2", "Cheese");
//const quiz = new Quiz();
//const quizItemsArray = await quiz.fetchAllQuizItems("foods");
//console.log(quizItemsArray.length);
//const newQuizId = await quiz.createNewQuiz("Hollywood");
//quiz.fetchAllQuizNames();
//quiz.deleteQuiz("Food");
// const updatedFields = {
//     question: "What is the capital of Spain?",
//     answer: "Madrid",
//     options: ["Paris", "London", "Berlin", "Madrid"]
//   };
// quizItem.update("foods","1",updatedFields);
export { Quiz, QuizItem };
