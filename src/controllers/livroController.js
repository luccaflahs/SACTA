import * as livroService from '../services/livroService.js';

export function detalhar(req, res) {
  const livro = livroService.detalhar(Number(req.params.id));
  res.json(livro);
}

export function cadastrar(req, res) {
  const livro = livroService.cadastrar(req.body, req.usuario.id);
  res.status(201).json(livro);
}
