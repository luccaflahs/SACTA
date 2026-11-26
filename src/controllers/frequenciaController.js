import * as frequenciaService from '../services/frequenciaService.js';

export function listar(req, res) {
  res.json(frequenciaService.listar(req.usuario.id));
}

export function detalhar(req, res) {
  res.json(frequenciaService.detalhar(Number(req.params.id), req.usuario.id));
}

export function criar(req, res) {
  res.status(201).json(frequenciaService.criar(req.body, req.usuario.id));
}

export function atualizar(req, res) {
  res.json(
    frequenciaService.atualizar(Number(req.params.id), req.body, req.usuario.id)
  );
}

export function remover(req, res) {
  frequenciaService.remover(Number(req.params.id), req.usuario.id);
  res.status(204).end();
}
