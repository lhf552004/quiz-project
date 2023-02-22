import qs from 'querystring';

import express from 'express';
import {homeRouter} from './routers/home.mjs';
import {quizRouter} from './routers/quiz.mjs';

const app = express();
// Set the view engine to Pug
app.set('view engine', 'pug');
// Set view folder
app.set('views', './views');

// Set the public directory for static files
app.use(express.static('public'));

// Mout home router
// app.use('/', homeRouter);   // TODO at the next assignemnt
app.use('/', quizRouter);   // This is temporary solution
// Mount the users router
// app.use('/users', usersRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
