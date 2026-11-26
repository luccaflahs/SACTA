import AppError from '../errors/AppError.js';
import * as frequenciaRepository from '../repositories/frequenciaRepository.js';
import * as usuarioRepository from '../repositories/usuarioRepository.js';
import * as turmaService from './turmaService.js';

function validarId(id, nome = 'ID') {
  if (!Number.isInteger(id) || id < 1) {
    throw new AppError(400, `${nome} deve ser um número inteiro positivo`);
  }
}

function validarStatus(status) {
  if (typeof status !== 'string' || status.trim() === '') {
    throw new AppError(400, 'Campo obrigatório ausente: status');
  }
  return status.trim();
}

export function listar(usuarioId) {
  return frequenciaRepository.findAllVisibleTo(usuarioId);
}

export function listarPorTurma(turmaId) {
  return frequenciaRepository.findByTurmaId(turmaId);
}

export function detalhar(id, usuarioId) {
  validarId(id);
  const frequencia = frequenciaRepository.findById(id);
  if (!frequencia) {
    throw new AppError(404, 'Frequência não encontrada');
  }
  if (frequencia.profId !== usuarioId && frequencia.alunoId !== usuarioId) {
    throw new AppError(403, 'Sem permissão para consultar esta frequência');
  }
  const { profId, ...resultado } = frequencia;
  return resultado;
}

export function criar(dados, usuarioId) {
  const turmaId = dados?.turmaId;
  const alunoId = dados?.alunoId;
  validarId(turmaId, 'turmaId');
  validarId(alunoId, 'alunoId');
  const status = validarStatus(dados?.status);

  turmaService.exigirDono(turmaId, usuarioId);
  if (!usuarioRepository.findById(alunoId)) {
    throw new AppError(404, 'Aluno não encontrado');
  }
  return frequenciaRepository.create({ turmaId, alunoId, status });
}

export function atualizar(id, dados, usuarioId) {
  validarId(id);
  const frequencia = frequenciaRepository.findById(id);
  if (!frequencia) {
    throw new AppError(404, 'Frequência não encontrada');
  }
  turmaService.exigirDono(frequencia.turmaId, usuarioId);
  const status = validarStatus(dados?.status);
  return frequenciaRepository.update(id, { status });
}

export function remover(id, usuarioId) {
  validarId(id);
  const frequencia = frequenciaRepository.findById(id);
  if (!frequencia) {
    throw new AppError(404, 'Frequência não encontrada');
  }
  turmaService.exigirDono(frequencia.turmaId, usuarioId);
  frequenciaRepository.deleteById(id);
}
