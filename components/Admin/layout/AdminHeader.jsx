import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="border-b border-slate-800/70 bg-slate-950/80 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400/80">Admin dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Control center</h1>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300">Secure session enabled</div>
          <Link href="/admin/leads" className="inline-flex items-center gap-2 rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            View leads
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
