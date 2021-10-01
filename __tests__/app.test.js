const pool = require('../lib/utils/pool');
// eslint-disable-next-line no-unused-vars
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { fetchQuotes } = require('../lib/utils/fetchQuote');
const Quote = require('../lib/models/Quote');
// const { fetchQuotes } = require('../lib/utils/fetchQuote');
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

  it('gets a quote from the api', () => {
    return request(app)
      .get('/api/v1/quotes/')
      // .send(fetchQuotes())
      .then((res) => {
        expect(res.body).toEqual({
          quote: expect.any(String),
          author: expect.any(String)
        });
      });
  });

  it('creates new inspiration quote in database', () => {
    return request(app)
      .post('/api/v1/quotes')
      .send(
        {          
          author: 'Hal Elrond',
          quote: 'Your entire life changes the day you decide you will no longer accept mediocrity for yourself'
        }
      )
      .then(res => {
        expect(res.body).toEqual(
          {
            id: expect.any(String),
            quote: expect.any(String),
            author: expect.any(String)
          });
      });
  });

  it('gets all quotes from SQL DB', () => {

    return request(app)
      .get('/api/v1/quotes')
      .then(res => {
        expect(res.body).toEqual({          
          quote: expect.any(String),
          author: expect.any(String)
        });
      });
  });

  it('gets quote by id', async () =>
  {
    const quotes = await Quote.insert(
      { 
        quote: 'Those who do not believe in magic will never find it', 
        author: 'Roald Dahl' 
      });
    return request(app)
      .get('/api/v1/quotes/1')
      .then(res =>
      {
        expect(res.body).toEqual(quotes);
      });
  });

  it('updates or creates quote by id using put', async() =>
  {
    const quotes = await Quote.insert(
      {
        quote: 'Whether you think you can or you think you can\'t you\'re right',
        author: 'Henry Fjord'
      });
    console.log(quotes);
    return request(app)
      .put('/api/vq/quotes/1')
      .send({ author: 'Henry Ford' })
      .then((res) =>
      {
        expect(res.body).toEqual(
          {
            quote: 'Whether you think you can or you think you can\'t you\'re right',
            author: 'Henry Ford'
          }
        );
      });
  });




  it('deletes quote from SQL DB', async() => {
    const res = await request(app)
      .delete('/api/v1/quotes/1');
    expect(res.body).toEqual({});
  });

  afterAll(() => {
    pool.end();
  });
});
