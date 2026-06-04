import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signAccessToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function signRefreshToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });
}
