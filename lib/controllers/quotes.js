const { Router } = require('express');
// const fetch = require('node-fetch');
// const Quote = require('../lib/models/Quote');
const QuoteService = require('../services/QuoteService');


module.exports = Router()
  .get('/', async(req, res, next) => {
    try {
      // const apiRes = await fetch('');
      const quote = await QuoteService.getQuote();
      res.send(quote);
    }catch(err) {
      next(err);
    }
  })
  .post('/:id', async(req, res, next) => {
    try {
      const quote = await QuoteService.archiveQuote(req.body);
      res.send(quote);
    } catch(err) {
      next(err);
    }
  });
