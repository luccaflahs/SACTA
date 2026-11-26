import db from '../database/connection.js';

export function findByEmail(email) {
  return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
}

export function findById(id) {
  return db.prepare('SELECT id, nome, email FROM usuarios WHERE id = ?').get(id);
}

export function create({ nome, email, senhaHash }) {
  return db
    .prepare('INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?) RETURNING id, nome, email')
    .get(nome, email, senhaHash);
}
