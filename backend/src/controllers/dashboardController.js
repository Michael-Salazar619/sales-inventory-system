import { query } from '../config/database.js';

export async function summary(_req, res) {
  const [today, monthly, lowStock, topProducts] = await Promise.all([
    query("SELECT COALESCE(SUM(total),0) AS value FROM sales WHERE created_at::date = CURRENT_DATE"),
    query("SELECT COALESCE(SUM(total),0) AS value FROM sales WHERE date_trunc('month', created_at) = date_trunc('month', CURRENT_DATE)"),
    query('SELECT COUNT(*) AS value FROM products WHERE stock <= min_stock'),
    query(`SELECT p.name, COALESCE(SUM(si.quantity),0) AS quantity
           FROM products p LEFT JOIN sale_items si ON si.product_id = p.id
           GROUP BY p.id ORDER BY quantity DESC LIMIT 5`)
  ]);

  res.json({
    salesToday: Number(today.rows[0].value),
    monthlySales: Number(monthly.rows[0].value),
    lowStock: Number(lowStock.rows[0].value),
    topProducts: topProducts.rows
  });
}
