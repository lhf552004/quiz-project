'use strict';

/**
 * @module Quizbank The module is exports two classes Quiz and QuizItem
 * One quiz could have many quizitems
 * TODO: store data into database
 * Currently data stores in the json file
 */

import fs from 'fs';
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
    constructor(id, question, answer) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }

    /**
     * Method to indicate the answer is correct or not
     * @param {string} answer 
     * @returns {boolean} indicator whether it is correct answer
     */
    correct(answer) {
        return this.answer === answer
    }

    /**
     * Store the quiz item into database
     * @param {*} bankSpec file name for json file to save
     */
    store(bankSpec) {
        // TODO
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
    static delete(bankSpec, id) {
        // TODO

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

export { Quiz, QuizItem };
