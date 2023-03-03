import express from 'express';
import { Quiz, QuizItem } from '../modules/quizbank.mjs';
/**
 * @module quizRouter The module is to handler quiz router
 */

const quizRouter = express.Router();

/**

@function getQuizListPage
@description This function is used to render the quiz list page
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.get('/', (req, res) => {
    res.render("quiz", {data: '', layout: 'layout'});
});

/**

@function getQuizPage
@description This function is used to retrieve details of a quiz by id
@param {number} id  - The id of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.get('/:id', (req, res) => {
    res.send(`Details of user with id ${req.params.id}`);
});

export { quizRouter };