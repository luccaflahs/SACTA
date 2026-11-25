import AppError from '../errors/AppError.js';
import * as livroRepository from '../repositories/livroRepository.js';

function validate(dados) {
  for (const campo of ['titulo', 'autor']) {
    if (typeof dados?.[campo] !== 'string' || dados[campo].trim() === '') {
      throw new AppError(400, `Campo obrigatório ausente: ${campo}`);
    }
  }

  const ano = dados.ano ?? null;
  if (ano !== null && !Number.isInteger(ano)) {
    throw new AppError(400, 'Ano deve ser um número inteiro');
  }
  if (ano !== null && ano > new Date().getFullYear()) {
    throw new AppError(400, 'Ano não pode ser no futuro');
  }

  return { titulo: dados.titulo.trim(), autor: dados.autor.trim(), ano };
}

export function detalhar(id) {
  const livro = livroRepository.findById(id);
  if (!livro) {
    throw new AppError(404, 'Livro não encontrado');
  }
  return livro;
}

export function cadastrar(dados) {
  return livroRepository.create(validate(dados));
}
