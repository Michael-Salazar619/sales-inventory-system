import { api } from '../services/api.js';
import { useState } from 'react';

export default function Reports() {
  const [status, setStatus] = useState('');

  async function openPdfReport() {
    setStatus('Generando PDF...');
    const pdfWindow = window.open('', '_blank');

    try {
      const response = await api.get('/reports/sales.pdf', { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      if (pdfWindow) {
        pdfWindow.location.href = url;
      } else {
        window.location.href = url;
      }

      setStatus('PDF generado correctamente.');
    } catch {
      pdfWindow?.close();
      setStatus('No se pudo generar el PDF. Vuelve a iniciar sesion e intenta de nuevo.');
    }
  }

  async function downloadExcelReport() {
    setStatus('Generando Excel...');

    try {
      const response = await api.get('/reports/sales.xlsx', { responseType: 'blob' });
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'reporte-ventas.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setStatus('Excel descargado correctamente.');
    } catch {
      setStatus('No se pudo descargar el Excel. Vuelve a iniciar sesion e intenta de nuevo.');
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-bold">Reportes</h1>
      <section className="panel grid gap-4 p-5">
        <div>
          <h2 className="text-lg font-semibold">Reportes de ventas</h2>
          <p className="text-sm text-slate-500">Genera reportes autenticados con la informacion actual de ventas.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn" type="button" onClick={openPdfReport}>
            Abrir PDF
          </button>
          <button className="btn" type="button" onClick={downloadExcelReport}>
            Descargar Excel
          </button>
        </div>
        {status && (
          <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
            {status}
          </p>
        )}
      </section>
    </div>
  );
}
