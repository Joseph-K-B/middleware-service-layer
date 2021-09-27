DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote VARCHAR(512) NOT NULL,
  author VARCHAR (512)
);

INSERT INTO quotes (quote, author) 
  VALUES ('Whether you think you can or you think you cant, youre right', 'Henry Ford')
  