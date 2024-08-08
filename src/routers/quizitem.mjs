import express from 'express';
import { Quiz, QuizItem } from '../modules/quizbank.mjs';

/**

@module quizItemRouter The module is to handle quiz item router
*/

const quizItemRouter = express.Router();

/**

@function getQuizItemDetails
@description This function is used to retrieve details of a quiz item by id and quiz name
@param {number} id  - The id of quiz item
@param {string} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.get('/:id/quiz/:name', async (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const quizItem = new QuizItem();
    const quizItemDetails = await quizItem.getQuizItemById(name, id);

    res.status(200).json(quizItemDetails);
});

/**

@function RenderAddQuizItemPage
@description This function is used to render add quiz item page by quiz name
@param {string} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.get('/quiz/:name/add-quiz-item', async (req, res) => {
    const name = req.params.name;
    res.render('addQuizItem', {name: name});
});

/**

@function RenderUpdateQuizItemPage
@description This function is used to render update quiz item page by quiz name
@param {string} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.get('/quiz/:name/update-quiz-item/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const quizItem = new QuizItem();
    const quizItemObj = await quizItem.getQuizItemById(name, id);
    res.render('updateQuizItem', {quizItem: quizItemObj});
});

/**

@function addQuizItem
@description This function is used to add a quizItem to a quiz by name
@param {string} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.post('/:name', async (req, res) => {
    const name = req.params.name;
    const json = req.body; // get the form data from the request body

    const newQuizItem = Object.assign(new QuizItem(), json);
    newQuizItem.storeQuizItem(name);

    // Get quiz items by quiz name
    const quiz = new Quiz();
    let quizItems = await quiz.fetchAllQuizItems(name);
    res.render('quiz', {data: {name : name, quizItems: quizItems}}); 
});

/**

@function updateQuizItem
@description This function is used to update a quizItem to a quiz by name
@param {string} id  - The id of quiz item
@param {string} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.put('/:name/quizitem/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const json = req.body; // get the form data from the request body
    const newQuizItem = new QuizItem();
    newQuizItem.update(name, id, json);
    res.status(200).json({ message: 'quizItem update successfully.' });
});

/**

@function deleteQuizItem
@description This function is used to delete a quiz by id
@param {number} id  - The id of quiz item
@param {string} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizItemRouter.delete('/:id/quiz/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const quizItemToDelete = new QuizItem();
    quizItemToDelete.deleteQuizItem(name, id);
    res.status(200).json({ message: 'quizItem deleted successfully.' });
});


export { quizItemRouter };