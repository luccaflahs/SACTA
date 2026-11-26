-- migrate:up
ALTER TABLE livros ADD COLUMN usuario_id INTEGER REFERENCES usuarios(id);

-- migrate:down
ALTER TABLE livros DROP COLUMN usuario_id;

