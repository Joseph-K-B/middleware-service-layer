// import { promises as fs } from 'fs';

// export default (pool) => {
//   return fs.readFile('./sql/setup.sql', { encoding: 'utf-8' })
//     .then(sql => pool.query(sql));
// };

const fs = require('fs').promises;

module.exports = (pool) => {
  return fs.readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' })
    .then(sql => pool.query(sql));
};
