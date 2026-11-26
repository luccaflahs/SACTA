import * as turmaService from '../services/turmaService.js';
import * as frequenciaService from '../services/frequenciaService.js';

export function listar(req, res) {
  res.json(turmaService.listar());
}

export function detalhar(req, res) {
  res.json(turmaService.detalhar(Number(req.params.id)));
}

export function criar(req, res) {
  res.status(201).json(turmaService.criar(req.body, req.usuario.id));
}

export function atualizar(req, res) {
  res.json(turmaService.atualizar(Number(req.params.id), req.body, req.usuario.id));
}

export function remover(req, res) {
  turmaService.remover(Number(req.params.id), req.usuario.id);
  res.status(204).end();
}

export function listarFrequencias(req, res) {
  const turma = turmaService.detalhar(Number(req.params.id));
  res.json(frequenciaService.listarPorTurma(turma.id));
}

export function criarFrequencia(req, res) {
  const turma = turmaService.exigirDono(Number(req.params.id), req.usuario.id);
  res.status(201).json(frequenciaService.criar({ ...req.body, turmaId: turma.id }));
}
