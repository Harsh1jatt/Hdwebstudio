"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Mail, Layers, Settings, Sparkles, BookOpen, MessageSquare, HelpCircle, DollarSign, Users, Image as ImageIcon } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home, enabled: true },
  { href: '/admin/leads', label: 'Leads', icon: Mail, enabled: true },
  { href: '/admin/services', label: 'Services', icon: Sparkles, enabled: true },
  { href: '/admin/projects', label: 'Projects', icon: Layers, enabled: true },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen, enabled: true },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare, enabled: true },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle, enabled: true },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign, enabled: true },
  { href: '/admin/team', label: 'Team', icon: Users, enabled: true },
  { href: '/admin/media', label: 'Media', icon: ImageIcon, enabled: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, enabled: true },
];

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center justify-center rounded-2xl bg-slate-900/90 px-4 py-3 text-slate-200 shadow-lg shadow-slate-950/20"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="mt-4 space-y-1 rounded-2xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-lg shadow-slate-950/20">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium ${item.enabled ? 'text-slate-200 hover:bg-slate-900/80' : 'cursor-not-allowed text-slate-500 opacity-60'}`}
                onClick={(event) => {
                  if (!item.enabled) event.preventDefault();
                  else setOpen(false);
                }}
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
