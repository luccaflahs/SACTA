import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';
import * as usuarioRepository from '../repositories/usuarioRepository.js';

function exigir(dados, campos) {
  for (const campo of campos) {
    if (typeof dados?.[campo] !== 'string' || dados[campo].trim() === '') {
      throw new AppError(400, `Campo obrigatório ausente: ${campo}`);
    }
  }
}

export function cadastrar(dados) {
  exigir(dados, ['nome', 'email', 'senha']);
  const email = dados.email.trim().toLowerCase();

  if (dados.senha.length < 6) {
    throw new AppError(400, 'A senha deve ter pelo menos 6 caracteres');
  }
  if (usuarioRepository.findByEmail(email)) {
    throw new AppError(400, 'Email já cadastrado');
  }

  const senhaHash = bcrypt.hashSync(dados.senha, 10);
  return usuarioRepository.create({ nome: dados.nome.trim(), email, senhaHash });
}

export function login(dados) {
  exigir(dados, ['email', 'senha']);
  const usuario = usuarioRepository.findByEmail(dados.email.trim().toLowerCase());

  if (!usuario || !bcrypt.compareSync(dados.senha, usuario.senha_hash)) {
    throw new AppError(401, 'Email ou senha inválidos');
  }

  const token = jwt.sign(
    { sub: String(usuario.id), nome: usuario.nome },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '1h' }
  );
  return { token };
}

export function perfil(id) {
  const usuario = usuarioRepository.findById(id);
  if (!usuario) {
    throw new AppError(404, 'Usuário não encontrado');
  }
  return usuario;
}
