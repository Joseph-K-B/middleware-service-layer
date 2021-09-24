DROP TABLE IF EXISTS ;

CREATE TABLE quotes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote VARCHAR(256) NOT NULL
  author VARCHAR (256)
);

INSERT INTO quotes (quote, author) 
  VALUES ($1, $2)