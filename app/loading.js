export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
        <p className="text-xs font-medium text-slate-400">Loading HD Web Studios...</p>
      </div>
    </div>
  );
}
