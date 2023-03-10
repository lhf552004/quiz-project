'use strict';

/**
 * @module Quizbank The module is exports two classes Quiz and QuizItem
 * One quiz could have many quizitems
 * Currently data stores in the firebase database
 */

/**
 * @typedef import ref from db config file
 */
import { quiz_db } from '../api/config.js'
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
            .then(function (doc) {
                if (doc.exists) {
                    var quizItem = doc.data();
                    if (quizItem.answer === answer) {
                        console.log("Correct Answer!!!");
                        return true;
                    }
                    else {
                        console.log("Wrong Answer!!!");
                        return false;
                    }
                } else {
                    // Handle error if the document does not exist
                    console.log("No Quiz Item found with Id:" + id);
                }
            })
            .catch(function (error) {
                // Handle any errors
                console.error("Error fetching correct answer: ", error);
            });
    }

    /**
     * Store the quiz item into database
     */
    storeQuizItem() {
        // Store the quiz item in the Firebase Firestore
        quiz_db.doc(this.id).set({
            question: this.question,
            answer: this.answer,
            options: this.options
        });
        console.log(this.id + "|" + this.question + "|" + this.answer);
    }

    /**
     * Method to fetch quiz item by quiz item id
     * @param {string} id The id of quiz item
     * @returns QuizItem instance
    */
    async getQuizItemById(id) {
        try {
            const docRef = quiz_db.doc(id);
            const doc = await docRef.get();
            if (doc.exists) {
                // If the document exists, return it as a quizItem object
                const quizItem = doc.data();
                quizItem.id = doc.id;
                console.log(quizItem.id + "|" + quizItem.question + "|" + quizItem.answer + "|" + quizItem.options)
                return quizItem;
            } else {
                console.log(`No quizItem found with id ${id}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching quiz item: ", error);
            return null;
        }
    }

    /**
     * Method to delete quiz item by id in the database
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
     * Async method to fetch all quiz item id's
     * @returns QuizItem ID's array
    */
    async fetchAllIds() {
        return quiz_db.get().then((data) => {
            var IDarray = [];
            data.docs.forEach((doc) => {
                IDarray.push(+doc.id);
            });
            console.log("Insdide fetchAllIds: " + typeof (IDarray));
            return IDarray;
        });
    }

    /**
     * This method calls the fetchAllIds()method to get all the IDs from Db
     * and then fetches its respective entry in the database and pushes it into an array.
     * @returns array of all quizItems 
     */
    async fetchAllQuizItems() {
        try {
            let quizIds = [];
            quizIds = await this.fetchAllIds();
            console.log("Inside fetchAllQuizItems: " + quizIds);
            let quizItems = [];
            for (let i = 0; i < quizIds.length; i++) {
                try {
                    const docRef = quiz_db.doc(quizIds[i].toString());
                    const doc = await docRef.get();
                    if (doc.exists) {
                        // If the document exists, return it as a quizItem object
                        const quizItem = doc.data();
                        quizItem.id = doc.id;
                        console.log("Inside forloop: " + quizItem.id + "|" + quizItem.question + "|" + quizItem.answer + "|" + quizItem.options)
                        quizItems.push(quizItem)
                    } else {
                        console.log(`No quizItem found with id ${id}`);
                        return null;
                    }
                } catch (error) {
                    console.error("Error fetching quiz item: ", error);
                    return null;
                }
            }
            console.log("Forloop exit" + quizItems);
            quizItems.forEach(item => {
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

}

//var quizItem = new QuizItem("3", "what is 10+6", "2",["12","14","16","20"]);
//quizItem.storeQuizItem();
// quizItem.delete("3");
//quizItem.fetchAllQuizItems();
//quizItem.fetchAllIds();
//quizItem.getQuizItemById("4");
//quizItem.fetchAllQuizItems();
//quizItem.correct("2", "4");
//const quiz = new Quiz();
//quiz.fetchAllIds();
//quiz.fetchAllQuizItems();


export { Quiz, QuizItem };
