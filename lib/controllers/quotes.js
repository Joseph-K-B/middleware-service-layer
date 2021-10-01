const { Router } = require('express');
// const Quote = require('../models/Quote.js');
// const fetch = require('node-fetch');
// const Quote = require('../lib/models/Quote');
const QuoteService = require('../services/QuoteService.js');


// module.exports = Router()
//   .get('/', async(req, res, next) => {
//     try {
//       // const apiRes = await fetch('');
//       const quote = await QuoteService.saveQuote();
//       res.json(quote);
//     }catch(err) {
//       next(err);
//     }
//   });

module.exports = Router()

//GET ALL
  .get('/', async(req, res, next) => 
  {
    try {
      // const apiRes = await fetch('');
      const quote = await QuoteService.getQuote();
      res.json(quote);
    }catch(err) {
      next(err);
    }
  })

//GET BY ID
  .get('/:id', async(req, res, next) =>
  {
    try 
    {
      const quoteItem = await QuoteService.getQuoteId(req.params.id);
      res.send(quoteItem);
    }
    catch(err)
    {
      next(err);
    }
  })

  .post('/', async(req, res, next) => {
    try {
      const quote = await QuoteService.archiveQuote(req.body);
      res.send(quote);
    } catch(err) {
      next(err);
    }
  });
// .delete('/:id', async (req, res, next) => {
//   try {
//     const removeQuote = await QuoteService.deleteQuote(req.params.id);
//     res.send(removeQuote);
//   } catch(err) {
//     next(err);
//   }
// });
 
  
