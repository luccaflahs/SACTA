import db from '../database/connection.js';

export function findById(id) {
  return db.prepare('SELECT * FROM livros WHERE id = ?').get(id);
}

export function create({ titulo, autor, ano }) {
  return db
    .prepare('INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?) RETURNING *')
    .get(titulo, autor, ano);
}
