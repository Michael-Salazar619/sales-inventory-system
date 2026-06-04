import { query } from '../config/database.js';

export async function listProducts({ search = '', lowStock = false } = {}) {
  const filters = ['($1 = \'\' OR p.name ILIKE $1 OR p.code ILIKE $1)'];
  if (lowStock) filters.push('p.stock <= p.min_stock');
  const { rows } = await query(
    `SELECT p.*, c.name AS category_name, s.name AS supplier_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     LEFT JOIN suppliers s ON s.id = p.supplier_id
     WHERE ${filters.join(' AND ')}
     ORDER BY p.created_at DESC`,
    [`%${search}%`]
  );
  return rows;
}

export async function createProduct(data) {
  const { rows } = await query(
    `INSERT INTO products (name, code, description, price, stock, min_stock, category_id, supplier_id, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [data.name, data.code, data.description, data.price, data.stock, data.minStock, data.categoryId, data.supplierId, data.imageUrl]
  );
  return rows[0];
}

export async function updateProduct(id, data) {
  const { rows } = await query(
    `UPDATE products SET name=$1, description=$2, price=$3, stock=$4, min_stock=$5, category_id=$6, supplier_id=$7, image_url=$8
     WHERE id=$9 RETURNING *`,
    [data.name, data.description, data.price, data.stock, data.minStock, data.categoryId, data.supplierId, data.imageUrl, id]
  );
  return rows[0];
}

export async function deleteProduct(id) {
  await query('DELETE FROM products WHERE id = $1', [id]);
}
