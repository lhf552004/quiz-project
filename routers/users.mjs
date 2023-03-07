import express from 'express';
import { User } from '../modules/user.mjs';

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
 * Render the login page.
 *
 * @name GET /user/login
 * @function
 * @memberof module:user
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {undefined}
 */
userRouter.get('/user/login', (req, res) => {
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
userRouter.post('/user/login', (req, res) => {
    let {email, password} = req.body;
    console.log(email); // Currently req.body is empty. I don't know why
    // Use mock data
    email = 'tom.cruise@gmail.com';
    password = 'tom_123'
    const user = User.fetch('user', email, password);
    if (user !== undefined) {
      res.render('profile', {email});
    }else {
      res.send('User not found or password not correct.');
    }
});

/**

@function getUserDetails
@description This function is used to retrieve details of a user by id
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
userRouter.get('/:id', (req, res) => {
    res.render('user', {data: {}}); // This is demo
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
userRouter.get('/user/create', (req, res) => {
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
userRouter.post('/user/create', (req, res) => {
    let {email, password} = req.body;
    console.log(email); // Currently req.body is empty. I don't know why
    // Use mock data
    email = 'tom.cruise@gmail.com';
    password = 'tom_123'
    const user = new User(email, password);
    user.store('user');
    // Redirect to profile
    res.render('profile', {email});
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
    res.render('profile', update); // This is demo
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