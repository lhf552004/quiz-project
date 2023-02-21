import express from 'express';


const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.render("home", {data: '', layout: 'layout'});  // Currently not used
});

export {homeRouter};