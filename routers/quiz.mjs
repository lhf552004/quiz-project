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
    // const allQuizIds = Quiz.fetchAllIds();  // Cause error
    res.render("quizlist", {list: [1, 2, 3, 4, 5]});
});

/**

@function getQuizPage
@description This function is used to retrieve details of a quiz by id
@param {number} id  - The id of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const quiz = new Quiz()
    const quizItems = await quiz.fetchAllQuizItems();

    res.render("quiz", {data: {id : id, quizItems: quizItems}});
});

/**

POST route handler for creating a new quiz.
@function
@name quizRouter.post
@param {string} route - The route for creating a new quiz
@param {Object} req - The request object
@param {Object} req.body - The request body containing the quiz data
@param {Object} res - The response object
@returns {Object} - The response object with status 200 and a success message
*/
quizRouter.post('/', (req, res) => {
    const json = req.body; // get the form data from the request body
    const newQuiz = Object.assign(new Quiz(), json);
    newQuiz.store();
    res.status(200).json({ message: 'quiz create successfully.' });
});

/**

@function updateQuiz
@description This function is used to update a quiz by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.put('/:id', (req, res) => {
    const json = req.body; // get the form data from the request body
    const updateQuiz = Object.assign(new Quiz(), json);
    updateQuiz.store();
    res.render('quiz', updateQuiz); 
});

/**

@function deleteQuiz
@description This function is used to delete a quiz by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    Quiz.delete('', id);
    res.status(200).json({ message: 'quiz deleted successfully.' });
});

export { quizRouter };