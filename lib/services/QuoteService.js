const Quote = require('../models/Quote');
// const { Message } = require('twilio/lib/twiml/MessagingResponse');
const { fetchQuotes } = require('../utils/fetchQuote');
// const { sendSms } = require('../utils/twilio');


module.exports = class QuoteService 
{
  
  //FETCH FROM API
  static async getQuote() 
  {
    const inspQuote = await fetchQuotes();
    return inspQuote;
  }

  //SAVE INTO DB
  static async archiveQuote({ quote, author })
  {
    const quotes = await Quote.insert({ quote, author });
    return quotes;
  }
  
  //GETS BY ID
  static async getQuoteId(id)
  {
    const quotes = await Quote.selectId(id);
    return quotes;
  }

  //UPDATES USING PUT
  static async updateQuote(id, quote, author)
  {
    const quotes = await Quote.update(id, quote, author);
    return quotes;
  }
  
  //REMOVES QUOTE FROM DB 
  static async deleteQuote(id)
  {
    const quote = await Quote.remove(id);
    return quote;
  }
};

