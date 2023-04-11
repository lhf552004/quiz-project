import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../serve.js';
import {Quiz, QuizItem} from '../modules/quizbank.mjs';
const expect = chai.expect;

chai.use(chaiHttp);

// It maybe failed for router test, as it just not for the router itself. 
// It involves pages, which maybe change.
describe('Home Router Regression Test', () => {

    it('Should get quiz item', async () => {
        console.log('it home get');
        const res = await chai.request(app)
            .get(`/`);
        expect(res.status).to.equal(200);
    });
});