import Link from 'next/link';
import { FolderKanban, Zap, Sparkles, BookOpen, MessageSquare, HelpCircle, DollarSign, Users, Image as ImageIcon } from 'lucide-react';

const actions = [
  { href: "/admin/leads", icon: Zap, label: "View all leads" },
  { href: "/admin/services", icon: Sparkles, label: "Manage services" },
  { href: "/admin/projects", icon: FolderKanban, label: "Manage projects" },
  { href: "/admin/blog", icon: BookOpen, label: "Manage blog posts" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Manage testimonials" },
  { href: "/admin/faqs", icon: HelpCircle, label: "Manage FAQs" },
  { href: "/admin/pricing", icon: DollarSign, label: "Manage pricing" },
  { href: "/admin/team", icon: Users, label: "Manage team" },
  { href: "/admin/media", icon: ImageIcon, label: "Manage media" },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick actions</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Take action fast</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {actions.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-700 hover:bg-slate-900">
            <Icon className="h-4 w-4 text-sky-400" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
