const pool = require('../lib/utils/pool');
// eslint-disable-next-line no-unused-vars
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { fetchQuotes } = require('../lib/utils/fetchQuote');
// const fetchQuotes = require('../lib/utils/fetchQuote');


jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('Inspiration quotes service', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets quote from api', () => {
    return request(app)
      .get('/api/v1/quotes')
      .then(res => {
        expect(res.body).toEqual({
          quote: expect.any(String),
          author: expect.any(String)
        });
      });
  });

  it('creates new inspiration quote in database', () => {
    return request(app)
      .post('/api/v1/quotes/2')
      // eslint-disable-next-line quotes
      .send({
        author: 'Hal Elrond',
        quote: 'Your entire life changes the day ou decide you will no longer accept mediocrity for yourself'
      })
      .then(res => {
        expect(res.body).toEqual([{
          quote: expect.any(String),
          author: expect.any(String)
        }]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
