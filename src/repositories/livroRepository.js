import db from '../database/connection.js';

export function findById(id) {
  return db.prepare(
    'SELECT id, titulo, autor, ano, usuario_id AS usuarioId FROM livros WHERE id = ?'
  ).get(id);
}

export function create({ titulo, autor, ano, usuarioId }) {
  return db
    .prepare(
      'INSERT INTO livros (titulo, autor, ano, usuario_id) VALUES (?, ?, ?, ?) RETURNING id, titulo, autor, ano'
    )
    .get(titulo, autor, ano, usuarioId);
}
