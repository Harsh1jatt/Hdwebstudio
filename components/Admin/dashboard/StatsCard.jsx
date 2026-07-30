export default function StatsCard({ title, value, description }) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/10">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">{title}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
      {description ? <p className="mt-2 text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}
