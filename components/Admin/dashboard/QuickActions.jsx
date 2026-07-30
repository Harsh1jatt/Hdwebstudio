import Link from 'next/link';
import { Zap, FileSearch, TrendingUp } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick actions</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Take action fast</h2>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Link href="/admin/leads" className="flex items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-slate-700 hover:bg-slate-900">
          <Zap className="h-5 w-5 text-sky-400" />
          View all leads
        </Link>
        <button className="flex w-full items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-slate-700 hover:bg-slate-900" disabled>
          <TrendingUp className="h-5 w-5 text-slate-500" />
          Projects (coming soon)
        </button>
        <button className="flex w-full items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-4 text-sm text-slate-200 transition hover:border-slate-700 hover:bg-slate-900" disabled>
          <FileSearch className="h-5 w-5 text-slate-500" />
          Services (coming soon)
        </button>
      </div>
    </div>
  );
}
