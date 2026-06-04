import { deleteUser, listUsers } from '../repositories/userRepository.js';

export async function index(_req, res) {
  res.json(await listUsers());
}

export async function destroy(req, res) {
  await deleteUser(req.params.id);
  res.status(204).send();
}
