/* global describe it */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();
chai.use(chaiHttp);
// Our parent block
describe('Items', () => {
  /*
  * Test the /GET route
  */
  describe('/GET items', () => {
    it('it should GET all the items', (done) => {
      chai.request(app)
        .get('/api/v1/items')
        .end((err, res) => {
          if(err) return done(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          (res.body.data.length).should.be.eql(4);
          done();
        });
    });
  });
});
