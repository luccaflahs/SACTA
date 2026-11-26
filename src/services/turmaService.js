import { randomUUID } from 'node:crypto';
import AppError from '../errors/AppError.js';
import * as turmaRepository from '../repositories/turmaRepository.js';

function validarId(id) {
  if (!Number.isInteger(id) || id < 1) {
    throw new AppError(400, 'ID deve ser um número inteiro positivo');
  }
}

function validarNome(nomeP) {
  if (typeof nomeP !== 'string' || nomeP.trim() === '') {
    throw new AppError(400, 'Campo obrigatório ausente: nomeP');
  }
  return nomeP.trim();
}

export function listar() {
  return turmaRepository.findAll();
}

export function detalhar(id) {
  validarId(id);
  const turma = turmaRepository.findById(id);
  if (!turma) {
    throw new AppError(404, 'Turma não encontrada');
  }
  return turma;
}

export function criar(dados, profId) {
  const nomeP = validarNome(dados?.nomeP);
  return turmaRepository.create({
    nomeP,
    profId,
    codigoTurm: `TURMA-${randomUUID()}`
  });
}

export function atualizar(id, dados, usuarioId) {
  validarId(id);
  const turma = turmaRepository.findOwnerId(id);
  if (!turma) {
    throw new AppError(404, 'Turma não encontrada');
  }
  if (turma.profId !== usuarioId) {
    throw new AppError(403, 'Sem permissão para alterar esta turma');
  }

  const nomeP = validarNome(dados?.nomeP);
  return turmaRepository.update(id, { nomeP });
}

export function remover(id, usuarioId) {
  validarId(id);
  const turma = turmaRepository.findOwnerId(id);
  if (!turma) {
    throw new AppError(404, 'Turma não encontrada');
  }
  if (turma.profId !== usuarioId) {
    throw new AppError(403, 'Sem permissão para remover esta turma');
  }
  turmaRepository.deleteById(id);
}

export function exigirDono(id, usuarioId) {
  validarId(id);
  const turma = turmaRepository.findOwnerId(id);
  if (!turma) {
    throw new AppError(404, 'Turma não encontrada');
  }
  if (turma.profId !== usuarioId) {
    throw new AppError(403, 'Sem permissão para esta turma');
  }
  return turma;
}
