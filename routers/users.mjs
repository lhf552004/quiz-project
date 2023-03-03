import express from 'express';
/**

@module userRouter The module is to handle user router
*/

const userRouter = express.Router();

/**

@function getUsersList
@description This function is used to retrieve a list of users
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.get('/', (req, res) => {
    res.send('List of users');   // This is demo
});

/**

@function getUserDetails
@description This function is used to retrieve details of a user by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.get('/:id', (req, res) => {
    res.send(`Details of user with id ${req.params.id}`); // This is demo
});

/**

@function createUser
@description This function is used to create a new user
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.post('/', (req, res) => {
    const newUser = {
        id: 1,
        firstName: 'Tom',
        lastName: 'Cruise',
        email: 'tom.cruise@gmail.com'
    }
    res.send('user', newUser)
});

/**

@function updateUser
@description This function is used to update a user by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.put('/:id', (req, res) => {
    const update = {
        id: req.params.id,
        firstName: 'Tom second',
        lastName: 'Cruise',
        email: 'tom.cruise@gmail.com'
    }
    res.send('user', update); // This is demo
});

/**

@function deleteUser
@description This function is used to delete a user by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.delete('/:id', (req, res) => {
    
    res.status(200).json({ message: 'user deleted successfully.' });
});


export { userRouter };