import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('List of users');   // This is demo
});

userRouter.get('/:id', (req, res) => {
    res.send(`Details of user with id ${req.params.id}`); // This is demo
});

export { userRouter };