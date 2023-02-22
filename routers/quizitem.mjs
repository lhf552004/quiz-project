import express from 'express';


const quizItemRouter = express.Router();

quizItemRouter.get('/', (req, res) => {
    res.send('List of users');   // This is demo
});

quizItemRouter.get('/:id', (req, res) => {
    res.send(`Details of user with id ${req.params.id}`); // This is demo
});

export { quizItemRouter };