// import express from 'express';
// import notFoundMiddleware from './middleware/not-found.js';
// import errorMiddleware from './middleware/error.js';
const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/v1/quotes', require('./controllers/quotes.js'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

// export default app;
module.exports = app;
