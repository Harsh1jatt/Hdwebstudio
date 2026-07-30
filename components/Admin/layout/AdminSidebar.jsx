"use client";

import Link from 'next/link';
import { Home, Mail, Layers, Settings, ShieldCheck, Sparkles, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home, enabled: true },
  { href: '/admin/leads', label: 'Leads', icon: Mail, enabled: true },
  { href: '#', label: 'Projects', icon: Layers, enabled: false },
  { href: '#', label: 'Services', icon: Sparkles, enabled: false },
  { href: '#', label: 'Testimonials', icon: ShieldCheck, enabled: false },
  { href: '#', label: 'Settings', icon: Settings, enabled: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-72 border-r border-slate-800/70 bg-slate-950/95 px-4 py-6 backdrop-blur-xl lg:static lg:translate-x-0">
      <div className="flex items-center gap-3 px-2 pb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20">
          HD
        </div>
        <div>
          <p className="text-sm font-semibold text-white">HD Web Studios</p>
          <p className="text-xs text-slate-500">Admin Console</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/25' : 'text-slate-400 hover:bg-slate-900/80 hover:text-white'} ${!item.enabled ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={(event) => {
                if (!item.enabled) event.preventDefault();
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-100">Administrator</p>
        <p className="mt-2 text-slate-500">Manage website leads and future admin sections securely.</p>
      </div>

      <button onClick={handleLogout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
}
