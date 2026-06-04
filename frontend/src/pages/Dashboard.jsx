import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import StatCard from '../components/StatCard.jsx';
import { api } from '../services/api.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function Dashboard() {
  const [summary, setSummary] = useState({ topProducts: [] });

  useEffect(() => {
    api.get('/dashboard/summary').then(({ data }) => setSummary(data));
  }, []);

  return (
    <div className="grid gap-6">
      <div className="rounded-lg bg-slate-950 px-6 py-7 text-white">
        <p className="text-sm font-semibold text-blue-200">Resumen ejecutivo</p>
        <h1 className="mt-2 text-3xl font-bold">Dashboard administrativo</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Metricas clave de ventas, inventario y rendimiento comercial en tiempo real.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Ventas del dia" value={`$${summary.salesToday || 0}`} helper="Actualizado desde PostgreSQL" />
        <StatCard label="Ventas mensuales" value={`$${summary.monthlySales || 0}`} helper="Periodo actual" />
        <StatCard label="Alertas de stock" value={summary.lowStock || 0} helper="Productos bajo minimo" />
      </div>
      <section className="panel p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Productos mas vendidos</h2>
          <p className="text-sm text-slate-500">Ranking operativo para tomar decisiones de inventario.</p>
        </div>
        <Bar data={{ labels: summary.topProducts.map((p) => p.name), datasets: [{ label: 'Unidades', data: summary.topProducts.map((p) => p.quantity), backgroundColor: '#2563eb' }] }} />
      </section>
    </div>
  );
}
