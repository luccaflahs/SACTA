import * as authService from '../services/authService.js';

export function cadastrar(req, res) {
  const usuario = authService.cadastrar(req.body);
  res.status(201).json(usuario);
}

export function login(req, res) {
  res.json(authService.login(req.body));
}

export function perfil(req, res) {
  res.json(authService.perfil(req.usuario.id));
}
