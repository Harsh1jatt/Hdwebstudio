import {
  Users,
  Mail,
  Phone,
  CalendarDays,
  Activity,
  ArrowUpRight,
  Plus,
  BookOpen,
  Sparkles,
  Layers,
  Play,
  MessageSquare,
  FileText,
  HelpCircle,
  BarChart3,
  Inbox,
} from "lucide-react";

import { requireAdmin } from "../../../lib/auth";
import connectDB from "../../../lib/db";
import Contact from "../../../models/Contact";
import Post from "../../../models/Post";
import Service from "../../../models/Service";
import Project from "../../../models/Project";
import Story from "../../../models/Story";
import FAQ from "../../../models/FAQ";
import Testimonial from "../../../models/Testimonial";

function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StatCard({ title, value, icon: Icon, href, color = "slate" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-blue-500" />
    </a>
  );
}

function QuickAction({ label, icon: Icon, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      <Plus className="h-4 w-4 text-slate-400" />
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function LeadRow({ lead }) {
  const initials = lead.name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "L";

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{lead.name || "Unknown"}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {lead.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {lead.phone}
            </span>
          )}
          {lead.email && (
            <span className="flex items-center gap-1 truncate">
              <Mail className="h-3 w-3" />
              {lead.email}
            </span>
          )}
        </div>
      </div>
      <span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  await connectDB();

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - 7);

  const [
    totalLeads,
    leadsThisWeek,
    recentLeads,
    publishedPosts,
    draftPosts,
    publishedServices,
    publishedProjects,
    publishedStories,
    publishedFaqs,
    publishedTestimonials,
  ] = await Promise.all([
    Contact.countDocuments(),
    Contact.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
    Post.countDocuments({ status: "published" }),
    Post.countDocuments({ status: "draft" }),
    Service.countDocuments({ published: true }),
    Project.countDocuments({ published: true }),
    Story.countDocuments({ status: "published" }),
    FAQ.countDocuments({ published: true }),
    Testimonial.countDocuments({ published: true }),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      {/* Welcome Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Welcome back</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{session.user.name}</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your content, leads, and SEO from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> New Post
            </a>
            <a
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Mail className="h-4 w-4" /> View Leads
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid - Row 1 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value={totalLeads} icon={Users} href="/admin/leads" color="blue" />
        <StatCard title="Leads This Week" value={leadsThisWeek} icon={Activity} href="/admin/leads" color="emerald" />
        <StatCard title="Published Posts" value={publishedPosts} icon={BookOpen} href="/admin/blog" color="purple" />
        <StatCard title="Draft Posts" value={draftPosts} icon={FileText} href="/admin/blog" color="amber" />
      </div>

      {/* Stats Grid - Row 2 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Services" value={publishedServices} icon={Sparkles} href="/admin/services" color="blue" />
        <StatCard title="Projects" value={publishedProjects} icon={Layers} href="/admin/projects" color="purple" />
        <StatCard title="Web Stories" value={publishedStories} icon={Play} href="/admin/stories" color="rose" />
        <StatCard title="Testimonials" value={publishedTestimonials} icon={MessageSquare} href="/admin/testimonials" color="emerald" />
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction label="New Blog Post" icon={BookOpen} href="/admin/blog/new" />
          <QuickAction label="New Service" icon={Sparkles} href="/admin/services/new" />
          <QuickAction label="New Project" icon={Layers} href="/admin/projects/new" />
          <QuickAction label="New Story" icon={Play} href="/admin/stories/new" />
        </div>
      </div>

      {/* Recent Leads + Content Summary */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Recent Leads */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Recent Leads</h2>
              <p className="text-xs text-slate-500">Latest enquiries from your website</p>
            </div>
            <a href="/admin/leads" className="text-xs font-semibold text-blue-600 hover:underline">
              View all →
            </a>
          </div>

          {recentLeads.length > 0 ? (
            <div>
              {recentLeads.map((lead) => (
                <LeadRow key={lead._id} lead={lead} />
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <Inbox className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">No leads yet</p>
              <p className="text-xs text-slate-400">Leads from your contact forms will appear here.</p>
            </div>
          )}
        </div>

        {/* Content Summary */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Content Overview</h2>
          <div className="space-y-3">
            {[
              { label: "Blog Posts", published: publishedPosts, draft: draftPosts, href: "/admin/blog", icon: BookOpen },
              { label: "Services", published: publishedServices, href: "/admin/services", icon: Sparkles },
              { label: "Projects", published: publishedProjects, href: "/admin/projects", icon: Layers },
              { label: "Web Stories", published: publishedStories, href: "/admin/stories", icon: Play },
              { label: "FAQs", published: publishedFaqs, href: "/admin/faqs", icon: HelpCircle },
              { label: "Testimonials", published: publishedTestimonials, href: "/admin/testimonials", icon: MessageSquare },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 transition hover:border-slate-200 hover:bg-slate-50"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {item.published} published
                  </span>
                  {item.draft !== undefined && item.draft > 0 && (
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                      {item.draft} draft{item.draft !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
