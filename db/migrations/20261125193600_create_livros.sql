-- migrate:up
CREATE TABLE livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano INTEGER
);

-- migrate:down
DROP TABLE livros;
