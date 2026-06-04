import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';
import { createUser, findUserByEmail, findUserById } from '../repositories/userRepository.js';

export async function register(data) {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new AppError('Email already registered', 409);
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await createUser({ ...data, passwordHash });
  return { user, accessToken: signAccessToken(user), refreshToken: signRefreshToken(user) };
}

export async function login({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError('Invalid credentials', 401);
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new AppError('Invalid credentials', 401);
  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  return { user: safeUser, accessToken: signAccessToken(user), refreshToken: signRefreshToken(user) };
}

export async function refresh(refreshToken) {
  if (!refreshToken) throw new AppError('Refresh token is required', 400);
  try {
    const payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
    const user = await findUserById(payload.id);
    if (!user) throw new AppError('User not found', 404);
    return { user };
  } catch {
    throw new AppError('Invalid refresh token', 401);
  }
}

export async function requestPasswordReset(email) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  // Production version: persist a hashed one-time token and send it by email.
  return { userId: user.id };
}
