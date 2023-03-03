import qs from 'querystring';

import express from 'express';
import {homeRouter} from './routers/home.mjs';
import {userRouter} from './routers/users.mjs';
import {quizRouter} from './routers/quiz.mjs';

/**
 * The main express application object.
 * @typedef {Object} expressApp
 * @property {Function} set - Set express settings.
 * @property {Function} use - Mount middleware functions.
 * @property {Function} listen - Start the server and listen on a specified port.
 */

/**
 * The main application instance.
 * @type {expressApp}
 */
const app = express();

/**
 * Set the view engine to Pug.
 * @name app.set
 * @function
 * @param {string} key - The setting key.
 * @param {string} value - The setting value.
 * @returns {expressApp} The express app instance.
 */
app.set('view engine', 'pug');

/**
 * Set the view folder.
 * @name app.set
 * @function
 * @param {string} key - The setting key.
 * @param {string} value - The setting value.
 * @returns {expressApp} The express app instance.
 */
app.set('views', './views');

/**
 * Mount the public directory for static files.
 * @name app.use
 * @function
 * @param {string} path - The path to mount the middleware function.
 * @param {Function} middleware - The middleware function to mount.
 * @returns {expressApp} The express app instance.
 */
app.use(express.static('public'));


/**
 * The router for the home page.
 * @type {Object}
 * @property {Function} get - Handle GET requests to the home page.
 */
// app.use('/', homeRouter);   // TODO at the next assignemnt
app.use('/', quizRouter);   // This is temporary solution

/**

Mounts the users router to the specified route
@function
@name app.use
@param {string} route - The route to mount the router to
@param {Object} userRouter - The users router to mount
*/
app.use('/users', userRouter);

/**
 * Listen for connections on port 3000.
 * @name app.listen
 * @function
 * @param {number} port - The port to listen on.
 * @param {Function} callback - A callback function to execute when the server starts listening.
 * @returns {http.Server} The HTTP server instance.
 */
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
