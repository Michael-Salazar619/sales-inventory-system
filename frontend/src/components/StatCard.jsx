export default function StatCard({ label, value, helper }) {
  return (
    <article className="panel p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <strong className="mt-2 block text-3xl">{value}</strong>
      {helper && <p className="mt-3 text-xs font-medium text-green-700">{helper}</p>}
    </article>
  );
}
