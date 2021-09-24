const pool = require('../lib/utils/pool');
// eslint-disable-next-line no-unused-vars
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// import pool from '../lib/utils/pool.js';
// import setup from '../data/setup.js';
// import request from 'supertest';
// import app from '../lib/app.js';

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('Inspiration quotes service', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.only('creates new inspiration quote in database', () => {
    return request(app)
      .post('/api/v1/quotes')
      .send({ text: 'x' })
      .then(res => {
        expect(res.body).toEqual({
          id:'2',
          text: 'y'
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
