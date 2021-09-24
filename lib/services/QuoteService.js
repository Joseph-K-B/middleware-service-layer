const Quote = require('../models/Quote');
const { sendSms } = require('../utils/twilio');
// import Quote from '../models/Quote';
// import { sendSms } from '../utils/twilio';

module.exports = class QuoteService {
  //send a text and store the order

  static async createQuote({ quote }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `${quote}`
    );

    //store the order
    const quoteReturn = await Quote.insert({ quoteReturn });

    return quote;
  }
};
