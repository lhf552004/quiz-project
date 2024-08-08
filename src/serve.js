import qs from "querystring";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { homeRouter } from "./routers/home.js";
import { userRouter } from "./routers/users.js";
import { quizRouter } from "./routers/quiz.js";
import { quizItemRouter } from "./routers/quizitem.js";
import { fileURLToPath } from "url";

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
app.set("view engine", "pug");

// Derive __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
/**
 * Set the view folder.
 * @name app.set
 * @function
 * @param {string} key - The setting key.
 * @param {string} value - The setting value.
 * @returns {expressApp} The express app instance.
 */
app.set("views", path.join(__dirname, "views"));

/**
 * Mount the public directory for static files.
 * @name app.use
 * @function
 * @param {string} path - The path to mount the middleware function.
 * @param {Function} middleware - The middleware function to mount.
 * @returns {expressApp} The express app instance.
 */
app.use(express.static(path.join(__dirname, "..", "public")));

// Use middleware to parse incoming request bodies
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * The router for the home page.
 * @type {Object}
 * @property {Function} get - Handle GET requests to the home page.
 */
app.use("/", homeRouter);

/**

Mounts the quiz router to the specified route
@function
@name app.use
@param {string} route - The route to mount the router to
@param {Object} quizRouter - The quiz router to mount
*/
app.use("/quiz", quizRouter);

app.use("/quizitem", quizItemRouter);

/**

Mounts the users router to the specified route
@function
@name app.use
@param {string} route - The route to mount the router to
@param {Object} userRouter - The users router to mount
*/
app.use("/users", userRouter);

/**
 * Listen for connections on port 3000.
 * @name app.listen
 * @function
 * @param {number} port - The port to listen on.
 * @param {Function} callback - A callback function to execute when the server starts listening.
 * @returns {http.Server} The HTTP server instance.
 */
var server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export { server, app };
