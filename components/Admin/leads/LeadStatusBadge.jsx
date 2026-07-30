const statusStyles = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-amber-50 text-amber-700",
  Qualified: "bg-emerald-50 text-emerald-700",
  Closed: "bg-slate-100 text-slate-600",
};

export default function LeadStatusBadge({ status = "New" }) {
  const styles =
    statusStyles[status] || statusStyles.New;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />

      {status}
    </span>
  );
}