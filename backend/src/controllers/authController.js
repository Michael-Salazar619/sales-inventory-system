import * as authService from '../services/authService.js';
import { signAccessToken } from '../utils/tokens.js';

export async function register(req, res) {
  const result = await authService.register(req.body);
  res.status(201).json(result);
}

export async function login(req, res) {
  const result = await authService.login(req.body);
  res.json(result);
}

export function logout(_req, res) {
  res.status(204).send();
}

export async function refresh(req, res) {
  const result = await authService.refresh(req.body.refreshToken);
  res.json({ accessToken: signAccessToken(result.user), user: result.user });
}

export async function forgotPassword(req, res) {
  await authService.requestPasswordReset(req.body.email);
  res.json({ message: 'If the email exists, reset instructions were generated' });
}
