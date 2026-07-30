"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Mail, Layers, Settings, ShieldCheck, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home, enabled: true },
  { href: '/admin/leads', label: 'Leads', icon: Mail, enabled: true },
  { href: '#', label: 'Projects', icon: Layers, enabled: false },
  { href: '#', label: 'Services', icon: Sparkles, enabled: false },
  { href: '#', label: 'Testimonials', icon: ShieldCheck, enabled: false },
  { href: '#', label: 'Settings', icon: Settings, enabled: false },
];

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center justify-center rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-200 shadow-lg shadow-slate-950/20"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="mt-4 space-y-2 rounded-3xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-lg shadow-slate-950/20">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium ${item.enabled ? 'text-slate-200 hover:bg-slate-900/80' : 'cursor-not-allowed text-slate-500 opacity-60'}`}
                onClick={(event) => !item.enabled && event.preventDefault()}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
