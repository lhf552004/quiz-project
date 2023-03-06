import express from 'express';

/**
 * @module homeRouter The module is to handler home router
 */

const homeRouter = express.Router();

/**

@function getHomePage
@description This function is used to render the home page
@param {object} req - The request object
@param {object} res - The response object
@returns {void}
*/
homeRouter.get('/', (req, res) => {
    res.render("home", {data: {}, layout: 'layout'});  // Currently not used
});

export {homeRouter};