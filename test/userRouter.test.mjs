import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../serve.js';

const expect = chai.expect;

chai.use(chaiHttp);

describe('User Management Regression Test', () => {
    let userId;

    it('Should create a new user', async () => {
        console.log('it create user');
        const res = await chai.request(app)
            .post('/users/create')
            .send({ email: 'test2@example.com', password: 'test2password' });
        expect(res.status).to.equal(200);
        expect(res.text).to.include('<h1>This is user profile</h1>');
        userId = res.text.substring(res.text.indexOf('<h2>') + 4, res.text.indexOf('</h2>'));
        console.log(userId);
    });

    it('Should update the user', async () => {
        console.log('it update user');
        console.log('id: ' + userId);
        const res = await chai.request(app)
            .put(`/users/${userId}`)
            .send({ email: 'updated@example.com', password: 'updatedpassword' });
        expect(res.status).to.equal(200);
        expect(res.text).to.include('<h1>This is user profile</h1>');
        expect(res.text).to.include(userId);
    });

    it('Should log in as the user', async () => {
        console.log('it log in user');
        const res = await chai.request(app)
            .post('/users/login')
            .send({ email: 'updated@example.com', password: 'updatedpassword' });
        expect(res.status).to.equal(200);
        expect(res.text).to.include('<h1>This is user profile</h1>');
        expect(res.text).to.include(userId);
    });

    it('Should log in failed', async () => {
        console.log('it log in should be failed');
        const res = await chai.request(app)
            .post('/users/login')
            .send({ email: 'aaa@example.com', password: 'aaapassword' });
        expect(res.status).to.equal(500);
        expect(res.body).to.deep.equal({ message: 'User not found or password not correct.' });
    });

    it('Should delete the user', async () => {
        console.log('it delete user');
        const res = await chai.request(app).delete(`/users/${userId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({ message: 'user deleted successfully.' });

    });

    // It is difficult to test status 500 for delete
});