"use client";

import Link from 'next/link';
import { Home, Mail, Layers, Settings, Sparkles, LogOut, BookOpen, MessageSquare, HelpCircle, DollarSign, Users, Image as ImageIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

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

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-72 border-r border-slate-800/70 bg-slate-950/95 px-4 py-6 backdrop-blur-xl lg:static lg:translate-x-0">
      <div className="flex items-center gap-3 px-2 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
          HD
        </div>
        <div>
          <p className="text-sm font-semibold text-white">HD Web Studios</p>
          <p className="text-xs text-slate-500">Admin Console</p>
        </div>
      </div>

      <nav className="space-y-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${active ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/25' : 'text-slate-400 hover:bg-slate-900/80 hover:text-white'} ${!item.enabled ? 'cursor-not-allowed opacity-50' : ''}`}
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

      <button onClick={handleLogout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500">
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
}
