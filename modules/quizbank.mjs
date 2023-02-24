'use strict';

/**
 * @module Quizbank The module is exports two classes Quiz and QuizItem
 * One quiz could have many quizitems
 * Currently data stores in the firebase database
 */

/**
 * @typedef import ref from db config file
 */
import {quiz_db} from '../api/config.js'
/** 
 * @class QuizItem representing a Quiz Item. 
 * @author: Yawen
 * It contains a question and its answer and could check the answer is correct
 * */
class QuizItem {

    /**
     * QuizItem Constructor
     * Creates an instance of QuizItem.
     * @param {number} id       The id of the QuizItem.
     * @param {string} question The question of the QuizItem.
     * @param {string} answer   The answer of the QuizItem. 
     */
    constructor(id, question, answer, options) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.options = options;
    }

    /**
     * Method to indicate the answer is correct or not
     * @param {string} answer 
     * @returns {boolean} indicator whether it is correct answer
     */
    correct(id, answer) {
        // Fetch the correct answer from the Firebase Firestore
      quiz_db.doc(id).get()
      .then(function(doc) {
        if (doc.exists) {
          var quizItem = doc.data();
          if (quizItem.answer === answer) {
              console.log("Correct Answer!!!");
              return true;
          }
          else{
              console.log("Wrong Answer!!!");
              return false;
          }
        } else {
          // Handle error if the document does not exist
          console.log("No Quiz Item found with Id:" + id);
        }
      })
      .catch(function(error) {
        // Handle any errors
        console.error("Error fetching correct answer: ", error);
      });
    }

    /**
     * Store the quiz item into database
     * @param {*} bankSpec file name for json file to save
     */
    storeQuizItem() {
       // Store the quiz item in the Firebase Firestore
      console.log(this.id + "|" + this.question + "|" + this.answer);
      quiz_db.doc(this.id).set({
        question: this.question,
        answer: this.answer,
        options: this.options
      });
    }

    /**
     * Static method to fetch quiz item by quiz item id
     * @param {string} bankSpec file name for json file to save
     * @param {string} id The id of quiz item
     * @returns QuizItem instance
     */
    static fetch(bankSpec, id) {

        // TODO
    }

    /**
     * Static method to delete quiz item by id in the database
     * @param {*} bankSpec file name for json file to save
     * @param {string} id 
     */
    delete(id) {
       // delete the quiz item in the Firebase Firestore
       quiz_db.doc(id).delete();
       console.log("Deleted" + id);
    }
}

/**
 * @class Quiz representing a Quiz.
 * It contains the array of quiz items 
 */
class Quiz {

    /**
     * Quiz Constructor
     * @param {number} id 
     */
    constructor(id) {
        this.id = id;
        this.quizitems = [];
    }

    /**
     * Custom iterator
     * @returns Custom iterator instance
     */
    [Symbol.iterator] = function () {
        let index = 0;
        const that = this;
        return {
            next() {
                if (index < that.quizitems.length) {
                    const val = that.quizitems[index];
                    index++;
                    return { value: val, done: false };
                } else return { done: true };
            }
        };
    }

    /**
     * Add a quiz item into the quiz
     * @param {QuizItem} quizItem 
     */
    add(quizItem) {
        // Ensure no duplicate item
        if (quizItem !== undefined && this.quizitems.findIndex(q => q.id === quizItem.id) === -1) {
            // TODO: Synchronize
            this.quizitems.push(quizItem);
        }
    }

    /**
     * Remove the quiz item from the quiz
     * @param {*} quizItem it could be object of QuizItem, or id of the object
     */
    remove(quizItem) {
        const theType = typeof quizItem;
        let index = -1;
        if (theType === "object") {
            index = this.quizitems.findIndex(q => q.id === quizItem.id);
        } else {
            index = this.quizitems.findIndex(q => q.id === quizItem); // Parameter quizItem is id actually
        }
        if (index > -1) {
            this.quizitems.splice(index, 1);
        }
    }

    /**
     * Store the quiz into database
     * @param {*} bankSpec file name for json file to save
     */
    store(bankSpec) {
        // TODO
    }

    /**
     * Static method to retrieve quiz from database by id
     * @param {*} bankSpec file name for json file to save
     * @param {*} id Id of the quiz
     * @returns 
     */
    static fetch(bankSpec, id) {
        // TODO
    }

    /**
     * Static method to delete the quiz by id in the database
     * @param {*} bankSpec file name for json file to save
     * @param {*} id Id of the quiz
     */
    static delete(bankSpec, id) {
        // TODO
    }
}

var quizItem = new QuizItem("4", "Select the correct name of university?", "1",["Memoriel","Memorial","MUM","Mamoriel"]);
quizItem.storeQuizItem();
quizItem.delete("3");
export { Quiz, QuizItem };
