-- migrate:up
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

-- migrate:down
DROP TABLE frequencias;
DROP TABLE turmas;
