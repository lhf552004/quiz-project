import express from 'express';
import { QuizItem } from '../modules/quizbank.mjs';

/**

@module quizItemRouter The module is to handle quiz item router
*/

const quizItemRouter = express.Router();

/**

@function getQuizItemList
@description This function is used to retrieve a list of quiz items
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.get('/', (req, res) => {
    res.send('List of quiz items');   // This is demo
});

/**

@function getQuizItemDetails
@description This function is used to retrieve details of a quiz item by id
@param {number} id  - The id of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const quizItem = new QuizItem()
    const quizItemDetails = await quizItem.getQuizItemById(id);

    res.status(200).json(quizItemDetails);
});

export { quizItemRouter };