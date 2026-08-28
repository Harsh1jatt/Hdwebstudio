const statusStyles = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  qualified: "bg-emerald-50 text-emerald-700",
  proposal: "bg-purple-50 text-purple-700",
  won: "bg-green-50 text-green-700",
  lost: "bg-slate-100 text-slate-600",
  spam: "bg-red-50 text-red-600",
};

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
  spam: "Spam",
};

const ALL_STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost", "spam"];

export function LeadStatusBadge({ status = "new", onStatusChange }) {
  const s = (status || "new").toLowerCase();
  const styles = statusStyles[s] || statusStyles.new;
  const label = statusLabels[s] || statusLabels.new;

  if (onStatusChange) {
    return (
      <select
        value={s}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles} border-0 outline-none cursor-pointer`}
      >
        {ALL_STATUSES.map((st) => (
          <option key={st} value={st}>{statusLabels[st]}</option>
        ))}
      </select>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default LeadStatusBadge;