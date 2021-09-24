const { Router } = require('express');
const fetch = require('node-fetch');
const Quote = require('../lib/models/Quote');
const QuoteService = require('../services/QuoteService');


module.exports = Router()
  .get('/', async(req, res, next) => {
    try {
      const apiRes = await fetch('https://inspiration.goprogram.ai');
      const quote = await QuoteService.createQuote(apiRes);
      res.send(quote);
    }catch(err) {
      next(err);
    }
  });
