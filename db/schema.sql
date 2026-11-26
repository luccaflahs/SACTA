CREATE TABLE "schema_migrations" (version varchar(128) primary key);
CREATE TABLE livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano INTEGER
, usuario_id INTEGER REFERENCES usuarios(id));
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL
);
CREATE TABLE turmas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_p TEXT NOT NULL,
  prof_id INTEGER NOT NULL REFERENCES usuarios(id),
  codigo_turm TEXT NOT NULL UNIQUE
);
CREATE TABLE frequencias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  turma_id INTEGER NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
  aluno_id INTEGER NOT NULL REFERENCES usuarios(id),
  data TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  status TEXT NOT NULL
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20261125193600'),
  ('20261126175835'),
  ('20261126175836'),
  ('20261126181800');
