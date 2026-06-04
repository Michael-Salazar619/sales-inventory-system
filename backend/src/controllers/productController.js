import * as products from '../repositories/productRepository.js';

export async function index(req, res) {
  res.json(await products.listProducts({ search: req.query.search || '', lowStock: req.query.lowStock === 'true' }));
}

export async function store(req, res) {
  res.status(201).json(await products.createProduct(req.body));
}

export async function update(req, res) {
  res.json(await products.updateProduct(req.params.id, req.body));
}

export async function destroy(req, res) {
  await products.deleteProduct(req.params.id);
  res.status(204).send();
}
