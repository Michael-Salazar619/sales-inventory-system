import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { listSales } from '../repositories/saleRepository.js';

export async function salesExcel(_req, res) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Ventas');
  sheet.columns = [
    { header: 'Cliente', key: 'customer_name' },
    { header: 'Vendedor', key: 'seller' },
    { header: 'Total', key: 'total' },
    { header: 'Fecha', key: 'created_at' }
  ];
  sheet.addRows(await listSales());
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=ventas.xlsx');
  await workbook.xlsx.write(res);
  res.end();
}

export async function salesPdf(_req, res) {
  const sales = await listSales();
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=ventas.pdf');
  doc.pipe(res);
  doc.fontSize(18).text('Reporte de ventas');
  sales.forEach((sale) => doc.moveDown().fontSize(10).text(`${sale.customer_name} - ${sale.seller} - $${sale.total}`));
  doc.end();
}
