/**
 * Modern Lightweight Skeleton Loader for Admin CMS
 * Replaces decorative spinning animations with fast, clean content skeletons.
 */
export default function AdminLoader({ rows = 4, type = "table" }) {
  if (type === "card") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="h-3.5 w-24 rounded bg-slate-200" />
            <div className="mt-4 h-7 w-16 rounded bg-slate-300" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-11 rounded-xl bg-slate-100" />
            <div className="h-11 rounded-xl bg-slate-100" />
          </div>
          <div className="h-24 rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  // Default: Table skeleton
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs animate-pulse">
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
        <div className="h-4 w-32 rounded bg-slate-200" />
      </div>
      <div className="divide-y divide-slate-100 p-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-44 rounded bg-slate-200" />
                <div className="h-2.5 w-28 rounded bg-slate-100" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 rounded-full bg-slate-100" />
              <div className="h-7 w-14 rounded-lg bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}