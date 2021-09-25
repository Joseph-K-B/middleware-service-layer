const pool = require('../utils/pool');


module.exports = class Quote {

  id;
  quote;
  author;

  constructor(row) {
    this.id = row.id;
    this.quote = row.quote;
    this.author = row.author
  }

  static async insert ({ quote, author }) {
    const { rows } = await pool.query(
      `INSERT INTO quotes (quote, author)  
          VALUES ($1, $2) 
          RETURNING *`,
      [quote, author]
    );
    return new Quote(rows[0]);
  }

  static async getAll(){
    const {rows} = await pool.query(
      `SELECT * FROM quotes`
    );
    return rows.map(row => new Quote(row));
  }

  static async remove(obj){
    await pool.query(
      'DELETE FROM quotes WHERE id=$1', [obj]
    );
  }
};
