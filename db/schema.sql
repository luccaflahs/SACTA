CREATE TABLE "schema_migrations" (version varchar(128) primary key);
CREATE TABLE livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano INTEGER
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20261125193600');
