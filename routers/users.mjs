import express from 'express';
import { User } from '../modules/user.mjs';
import { Quiz } from '../modules/quizbank.mjs';

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
    res.render('users', { users: User.fetchUsers('user') });
});

/**
 * Render the login page.
 *
 * @name GET /user/login
 * @function
 * @memberof module:user
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.get('/login', (req, res) => {
    res.render('login');
});

/**
 * Process a login form submission.
 *
 * @name POST /user/login
 * @function
 * @memberof module:user
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The request body, containing the email and password.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.post('/login', (req, res) => {
    let { email, password } = req.body;
    const user = User.fetch('user', email, password);
    if (user !== undefined) {
        res.render('profile', { id: user.id, email, username: user.username, firstname: user.firstname, lastname: user.lastname, age: user.age });
    } else {
        res.status(500).json({ message: 'User not found or password not correct.' });
    }
});

/**
 * Render the create account page.
 *
 * @name GET /user/create
 * @function
 * @memberof module:user
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.get('/create', (req, res) => {
    res.render('createAccount');
});

/**
 * Process a create account form submission.
 *
 * @name POST /user/create
 * @function
 * @memberof module:user
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The request body, containing the email and password.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.post('/create', (req, res) => {
    let { email, password } = req.body;

    const user = new User('', email, password);
    user.store('user');
    // Redirect to profile
    res.render('profile', { id: user.id, email, username: user.username, firstname: user.firstname, lastname: user.lastname, age: user.age });
});

/**

@function updateUser
@description This function is used to update a user by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    let updated = req.body;
    User.update('user', id, updated);
    res.render('profile', { id: id, email: updated.email, username: updated.username, firstname: updated.firstname, lastname: updated.lastname, age: updated.age });
});

/**

@function deleteUser
@description This function is used to delete a user by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const code = User.delete('user', id);
    if (code === 0) {
        res.status(200).json({ message: 'user deleted successfully.' });
    } else {
        res.status(500).json({ message: 'user deleted failed.' });
    }

});

/**
 * Render the user dashboard page.
 *
 * @name GET /users/dash-board/:id
 * @function
 * @memberof module:user
 * @param {string} id - The id of user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.get('/dash-board/:id', async (req, res) => {
    const quiz = new Quiz();
    const quizzes = await quiz.fetchAllQuizNames();
    res.render('userDashboard', {quizzes: quizzes});
});

/**
 * Render the user admin page.
 *
 * @name GET /users/admin/:id
 * @function
 * @memberof module:user
 * @param {string} id - The id of user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.get('/admin/:id', (req, res) => {
    res.render('userAdmin');
});

export { userRouter };