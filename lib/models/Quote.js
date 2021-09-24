const pool = require('../utils/pool');
// import pool from '../utils/pool';

module.exports = class Quote {

  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  static async insert ({ text }) {
    const { rows } = await pool.query(
      'INSERT INTO quotes (quote) VALUES ($1) RETURNING *',
      [text]
    );
    return new Quote(rows[0]);
  }
}
