import express from 'express';
import { Quiz, QuizItem } from '../modules/quizbank.mjs';

const quizRouter = express.Router();

quizRouter.get('/', (req, res) => {
    res.render("quiz", {data: '', layout: 'layout'});
});

quizRouter.get('/:id', (req, res) => {
    res.send(`Details of user with id ${req.params.id}`);
});

export { quizRouter };