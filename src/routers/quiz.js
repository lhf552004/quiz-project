import express from "express";
import { Quiz } from "../modules/quizbank.js";
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
quizRouter.get("/", (req, res) => {
  const quiz = new Quiz();
  res.render("quizlist", { list: quiz.fetchAllQuizNames() });
});

/**

@function getQuizPage
@description This function is used to retrieve details of a quiz by id
@param {number} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.get("/:name", async (req, res) => {
  const name = req.params.name;
  const quiz = new Quiz();
  const quizItems = await quiz.fetchAllQuizItems(name);

  res.render("quiz", { data: { name: name, quizItems: quizItems } });
});

/**

@function getQuizAdminPage
@description This function is used to retrieve quiz admin page by quiz name
@param {number} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.get("/:name/quiz-admin", async (req, res) => {
  const name = req.params.name;
  const quiz = new Quiz();
  const quizItems = await quiz.fetchAllQuizItems(name);

  res.render("manageQuizAdmin", { data: { name: name, quizItems: quizItems } });
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
quizRouter.post("/", (req, res) => {
  const json = req.body; // get the form data from the request body
  // According to the quizbank module, to create a quiz, a quiz name is needed
  const newQuiz = new Quiz(json.name);
  newQuiz.createNewQuiz(json.name);
  res.status(200).json({ message: "quiz create successfully." });
});

/**

@function deleteQuiz
@description This function is used to delete a quiz by name
@param {number} name  - The name of quiz
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
quizRouter.delete("/:name", (req, res) => {
  const name = req.params.name;
  const quizToDelete = new Quiz(name);
  quizToDelete.deleteQuiz(name);
  res.status(200).json({ message: "quiz deleted successfully." });
});

export { quizRouter };
