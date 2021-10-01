const Quote = require('../models/Quote');
// const { Message } = require('twilio/lib/twiml/MessagingResponse');
const { fetchQuotes } = require('../utils/fetchQuote');
// const { sendSms } = require('../utils/twilio');


module.exports = class QuoteService 
{
  
  static async getQuote() 
  {
    const inspQuote = await fetchQuotes();

    console.log('Did this work??', inspQuote);

    return inspQuote;
  }

  static async archiveQuote({ quote, author })
  {
    const quotes = await Quote.insert({ quote, author });
    console.log('Working?????', quotes);
    return quotes;
  }
  
  static async getQuoteId(id)
  {
    const quotes = await Quote.selectId(id);
    return quotes;
  }
  

  // static async deleteQuote(id)
  // {
  //   const quote = await Quote.remove(id);
  //   return quote;
  // }
};

