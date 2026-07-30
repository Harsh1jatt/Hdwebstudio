export default function AdminLoader() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

        <p className="text-sm font-medium text-slate-600">
          Loading leads...
        </p>
      </div>
    </div>
  );
}