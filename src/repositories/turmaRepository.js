import db from '../database/connection.js';

const turmaFields = 'id, nome_p AS nomeP, prof_id AS profId, codigo_turm AS codigoTurm';

export function findAll() {
  return db.prepare(`SELECT ${turmaFields} FROM turmas ORDER BY id`).all();
}

export function findById(id) {
  return db.prepare(`SELECT ${turmaFields} FROM turmas WHERE id = ?`).get(id);
}

export function create({ nomeP, profId, codigoTurm }) {
  return db
    .prepare(
      `INSERT INTO turmas (nome_p, prof_id, codigo_turm)
       VALUES (?, ?, ?) RETURNING ${turmaFields}`
    )
    .get(nomeP, profId, codigoTurm);
}

export function update(id, { nomeP }) {
  return db
    .prepare(`UPDATE turmas SET nome_p = ? WHERE id = ? RETURNING ${turmaFields}`)
    .get(nomeP, id);
}

export function deleteById(id) {
  return db.prepare('DELETE FROM turmas WHERE id = ?').run(id);
}

export function findOwnerId(id) {
  return db.prepare('SELECT prof_id AS profId FROM turmas WHERE id = ?').get(id);
}
