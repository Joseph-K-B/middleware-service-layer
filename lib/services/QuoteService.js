// const Quote = require('../models/Quote');
const { Message } = require('twilio/lib/twiml/MessagingResponse');
const { fetchQuotes } = require('../utils/fetchQuote');
// const { sendSms } = require('../utils/twilio');


module.exports = class QuoteService {
  

  static async getQuote(){
    const data = await fetchQuotes();
    return data;
  }
  

  static async archiveQuote(){
    const data = await this.getQuote();
    const newQuote = [];
    
    console.log(data);
    // for(const author of data){
    newQuote.push(data);
    return newQuote;
    // }
    // console.log(newQuote);
    // return newQuote;
    // const messageInsert = await Message.insert({ quote: newQuote[0], author: newQuote[1] });
    // return messageInsert;
  }
};

