import { pool } from '../config/database.js';
import { AppError } from '../utils/AppError.js';

export async function createSale({ userId, customerName, tax, discount, items }) {
  if (!items?.length) {
    throw new AppError('Sale requires at least one item', 400);
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const subtotal = items.reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.quantity), 0);
    const total = subtotal + Number(tax) - Number(discount);
    const saleResult = await client.query(
      'INSERT INTO sales (user_id, customer_name, subtotal, tax, discount, total) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [userId, customerName, subtotal, tax, discount, total]
    );
    const sale = saleResult.rows[0];

    for (const item of items) {
      await client.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, total) VALUES ($1,$2,$3,$4,$5)',
        [sale.id, item.productId, item.quantity, item.unitPrice, Number(item.unitPrice) * Number(item.quantity)]
      );
      const stockResult = await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1',
        [item.quantity, item.productId]
      );
      if (stockResult.rowCount === 0) {
        throw new AppError('Insufficient stock for one or more products', 409);
      }
    }

    await client.query('COMMIT');
    return sale;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function listSales() {
  const { rows } = await pool.query(
    `SELECT s.*, u.name AS seller
     FROM sales s
     JOIN users u ON u.id = s.user_id
     ORDER BY s.created_at DESC`
  );
  return rows;
}
