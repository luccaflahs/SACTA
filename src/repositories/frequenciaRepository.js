import db from '../database/connection.js';

const frequenciaFields =
  'f.id, f.turma_id AS turmaId, f.aluno_id AS alunoId, f.data, f.status';

export function findAllVisibleTo(usuarioId) {
  return db
    .prepare(
      `SELECT ${frequenciaFields}
       FROM frequencias f
       JOIN turmas t ON t.id = f.turma_id
       WHERE t.prof_id = ? OR f.aluno_id = ?
       ORDER BY f.data DESC, f.id DESC`
    )
    .all(usuarioId, usuarioId);
}

export function findById(id) {
  return db
    .prepare(
      `SELECT ${frequenciaFields}, t.prof_id AS profId
       FROM frequencias f JOIN turmas t ON t.id = f.turma_id
       WHERE f.id = ?`
    )
    .get(id);
}

export function findByTurmaId(turmaId) {
  return db
    .prepare(
      `SELECT ${frequenciaFields} FROM frequencias f
       WHERE f.turma_id = ? ORDER BY f.data DESC, f.id DESC`
    )
    .all(turmaId);
}

export function create({ turmaId, alunoId, status }) {
  return db
    .prepare(
      `INSERT INTO frequencias (turma_id, aluno_id, status)
       VALUES (?, ?, ?)
       RETURNING id, turma_id AS turmaId, aluno_id AS alunoId, data, status`
    )
    .get(turmaId, alunoId, status);
}

export function update(id, { status }) {
  return db
    .prepare(
      `UPDATE frequencias SET status = ? WHERE id = ?
       RETURNING id, turma_id AS turmaId, aluno_id AS alunoId, data, status`
    )
    .get(status, id);
}

export function deleteById(id) {
  return db.prepare('DELETE FROM frequencias WHERE id = ?').run(id);
}
