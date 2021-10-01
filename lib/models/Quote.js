const pool = require('../utils/pool');


module.exports = class Quote 
{
  constructor(row) 
  {
    this.id = row.id;
    this.quote = row.quote;
    this.author = row.author;
  }

  static async getAll()
  {
    const { rows } = await pool.query(
      'SELECT * FROM quotes'
    );
    return rows.map(row => new Quote(row));
  }

  static async insert({ quote, author })
  {
    const { rows } = await pool.query(
      `INSERT INTO quotes (quote, author)
      VALUES ($1, $2)
      RETURNING *`,
      [quote, author]
    );

    return new Quote(rows[0]);
  }

  static async selectId(id)
  {
    const { rows } = await pool.query(`
    SELECT * FROM quotes
    WHERE id = $1`, [id]
    );
    return new Quote(rows[0]);
  }


  static async update(id, quote, author)
  {
    const { rows } = await pool.query(
      'UPDATE quotes SET quote = $2 WHERE id = $1 RETURNING *',
      [id, quote, author]);

    return new Quote(rows[0]);
  }

  static async remove(id)
  {
    const { rows } = await pool.query(
      'DELETE FROM quotes WHERE id=$1', [id]
    );
    return rows[0];
  }
};
