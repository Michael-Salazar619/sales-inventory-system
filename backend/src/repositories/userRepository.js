import { query } from '../config/database.js';

export async function createUser({ name, email, passwordHash, role = 'empleado' }) {
  const { rows } = await query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
    [name, email, passwordHash, role]
  );
  return rows[0];
}

export async function findUserByEmail(email) {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

export async function findUserById(id) {
  const { rows } = await query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
  return rows[0];
}

export async function listUsers() {
  const { rows } = await query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  return rows;
}

export async function deleteUser(id) {
  await query('DELETE FROM users WHERE id = $1', [id]);
}
