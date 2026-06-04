import * as sales from '../repositories/saleRepository.js';

export async function index(_req, res) {
  res.json(await sales.listSales());
}

export async function store(req, res) {
  const sale = await sales.createSale({ ...req.body, userId: req.user.id });
  req.app.get('io')?.emit('sale:created', sale);
  res.status(201).json(sale);
}
