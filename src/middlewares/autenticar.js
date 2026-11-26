import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export default function autenticar(req, res, next) {
  const [tipo, token] = (req.headers.authorization ?? '').split(' ');

  if (tipo !== 'Bearer' || !token) {
    throw new AppError(401, 'Token ausente ou inválido');
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError(401, 'Token ausente ou inválido');
  }

  req.usuario = { id: Number(payload.sub), nome: payload.nome };
  next();
}
