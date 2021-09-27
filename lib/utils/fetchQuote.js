const fetch = require('node-fetch');

async function fetchQuotes() {
  const url = 'https://inspiration.goprogram.ai';
  const req = await fetch(url);
  const res = await req.json();
  return res;
}

module.exports = { fetchQuotes };


