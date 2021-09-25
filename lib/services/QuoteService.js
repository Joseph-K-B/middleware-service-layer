const Quote = require('../models/Quote');
// const { Message } = require('twilio/lib/twiml/MessagingResponse');
const { fetchQuotes } = require('../utils/fetchQuote');
const { sendSms } = require('../utils/twilio');


module.exports = class QuoteService {
  

  static async getQuote(body = null){
    const data = await fetchQuotes();
    const textMsg = `${body}` ? `${body}` : `${data[0]}`;
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      textMsg
    );
    await Quote.insert(data);
    return data;
  }
  

  static async archiveQuote(){
    const data = await this.getQuote();
    const newQuote = [];
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `${data}`
    );

    console.log(data);
    newQuote.push(data);
    return newQuote;
  }

  static async deleteQuote(id){
    const quote = await Quote.remove(id);
    return quote;
  }
};

