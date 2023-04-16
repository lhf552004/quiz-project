import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../serve.js';
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server Test', () => {
    describe('GET /', () => {
      it('should return a 200 status code', (done) => {
        chai
          .request(app)
          .get('/')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            done();
          });
      });
    });
  });
  