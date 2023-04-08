import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../serve.js';

const expect = chai.expect;

chai.use(chaiHttp);

// It maybe failed for router test, as it just not for the router itself. 
// It involves pages, which maybe change.
describe('Quiz Router Regression Test', () => {
    let quizName;

    it('Should access quiz list', async () => {
        console.log('it quiz list');
        const res = await chai.request(app)
            .get('/quiz');
        expect(res.status).to.equal(200);
    });

    it('Should access quiz page', async () => {
        console.log('it quiz page');
        const res = await chai.request(app)
            .get('/quiz/GK');
        expect(res.status).to.equal(200);
    });

    it('Should access quiz admin page', async () => {
        console.log('it quiz admin page');
        const res = await chai.request(app)
            .get('/quiz/GK/quiz-admin');
        expect(res.status).to.equal(200);
    });

    it('Quiz post', async () => {
        console.log('it quiz post');
        quizName = 'Test';
        const res = await chai.request(app)
            .post('/quiz')
            .send({ quizName: quizName });
        expect(res.status).to.equal(200);
    });

    it('Should delete the quiz', async () => {
        console.log('it delete quiz');
        const res = await chai.request(app).delete(`/quiz/${quizName}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ message: 'quiz deleted successfully.' });

    });
});