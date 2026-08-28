import {
  Users,
  Mail,
  Phone,
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
  Inbox,
  CheckCircle2,
  Clock,
  TrendingUp,
  Server,
  ImageIcon,
  BarChart3,
  Globe,
  Search,
  Settings,
} from "lucide-react";

import { requireAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import Post from "@/models/Post";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Story from "@/models/Story";
import FAQ from "@/models/FAQ";
import Testimonial from "@/models/Testimonial";
import LeadStatusBadge from "@/components/Admin/leads/LeadStatusBadge";

function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StatCard({ title, value, subtitle, icon: Icon, href, color = "slate" }) {
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
      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-blue-500" />
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
    </a>
  );
}

function QuickAction({ label, icon: Icon, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      <Plus className="h-4 w-4 text-slate-400" />
      <Icon className="h-4 w-4 text-blue-600" />
      {label}
    </a>
  );
}

function LeadRow({ lead }) {
  const initials =
    lead.name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "L";

  return (
    <a
      href={`/admin/leads/${lead._id}`}
      className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 transition hover:bg-slate-50 last:border-0"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-900">
            {lead.name || "Unknown"}
          </p>
          <LeadStatusBadge status={lead.status || "new"} />
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
          {lead.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-slate-400" />
              {lead.phone}
            </span>
          )}
          {lead.email && (
            <span className="hidden items-center gap-1 truncate sm:flex">
              <Mail className="h-3 w-3 text-slate-400" />
              {lead.email}
            </span>
          )}
          {lead.business && (
            <span className="hidden truncate text-slate-400 md:inline">
              &bull; {lead.business}
            </span>
          )}
        </div>
      </div>
      <span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span>
    </a>
  );
}

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const startTime = Date.now();
  await connectDB();
  const dbLatency = Date.now() - startTime;

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - 7);

  const [
    totalLeads,
    newLeadsCount,
    qualifiedLeadsCount,
    wonLeadsCount,
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
    Contact.countDocuments({ status: "new" }),
    Contact.countDocuments({ status: "qualified" }),
    Contact.countDocuments({ status: "won" }),
    Contact.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Contact.find().sort({ createdAt: -1 }).limit(6).lean(),
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
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                System Active &bull; {dbLatency}ms latency
              </p>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Welcome back, {session.user.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Overview of website enquiries, publishing status, and business metrics.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> New Blog Post
            </a>
            <a
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Mail className="h-4 w-4 text-slate-500" /> View Leads ({newLeadsCount} new)
            </a>
          </div>
        </div>
      </div>

      {/* Business & Lead Acquisition KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          subtitle={`${leadsThisWeek} this past week`}
          icon={Users}
          href="/admin/leads"
          color="blue"
        />
        <StatCard
          title="New Enquiries"
          value={newLeadsCount}
          subtitle="Pending initial contact"
          icon={Clock}
          href="/admin/leads?status=new"
          color="amber"
        />
        <StatCard
          title="Qualified Leads"
          value={qualifiedLeadsCount}
          subtitle="Ready for proposal"
          icon={TrendingUp}
          href="/admin/leads?status=qualified"
          color="purple"
        />
        <StatCard
          title="Won Clients"
          value={wonLeadsCount}
          subtitle="Successfully acquired"
          icon={CheckCircle2}
          href="/admin/leads?status=won"
          color="emerald"
        />
      </div>

      {/* Content Distribution Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Published Articles"
          value={publishedPosts}
          subtitle={`${draftPosts} in draft`}
          icon={BookOpen}
          href="/admin/blog"
          color="purple"
        />
        <StatCard
          title="Active Services"
          value={publishedServices}
          subtitle="Live on site"
          icon={Sparkles}
          href="/admin/services"
          color="blue"
        />
        <StatCard
          title="Portfolio Projects"
          value={publishedProjects}
          subtitle="Case studies showcase"
          icon={Layers}
          href="/admin/projects"
          color="slate"
        />
        <StatCard
          title="Client Testimonials"
          value={publishedTestimonials}
          subtitle="Trust signals"
          icon={MessageSquare}
          href="/admin/testimonials"
          color="emerald"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Quick Actions &amp; Productivity Shortcuts
          </h2>
          <span className="text-[11px] font-mono text-slate-400">Press <kbd className="font-bold bg-slate-100 px-1 py-0.5 rounded border border-slate-200">Ctrl+K</kbd> for Command Palette</span>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <QuickAction label="New Blog" icon={BookOpen} href="/admin/blog/new" />
          <QuickAction label="New Service" icon={Sparkles} href="/admin/services/new" />
          <QuickAction label="New Project" icon={Layers} href="/admin/projects/new" />
          <QuickAction label="New Story" icon={Play} href="/admin/stories/new" />
          <QuickAction label="New FAQ" icon={HelpCircle} href="/admin/faqs/new" />
          <QuickAction label="New Testimonial" icon={MessageSquare} href="/admin/testimonials/new" />
          <QuickAction label="View Leads" icon={Mail} href="/admin/leads" />
          <QuickAction label="Media Library" icon={ImageIcon} href="/admin/media" />
          <QuickAction label="SEO Health" icon={BarChart3} href="/admin/seo" />
          <QuickAction label="Sitemap" icon={Globe} href="/admin/seo/sitemap" />
          <QuickAction label="Search Console" icon={Search} href="/admin/seo/gsc" />
          <QuickAction label="Settings" icon={Settings} href="/admin/settings" />
        </div>
      </div>

      {/* Recent Leads + Content Summary */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Recent Leads */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Enquiries</h2>
              <p className="text-xs text-slate-500">
                Latest client submissions across website and audit forms
              </p>
            </div>
            <a
              href="/admin/leads"
              className="text-xs font-semibold text-blue-600 transition hover:underline"
            >
              View all ({totalLeads}) &rarr;
            </a>
          </div>

          {recentLeads.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentLeads.map((lead) => (
                <LeadRow key={lead._id} lead={lead} />
              ))}
            </div>
          ) : (
            <div className="px-4 py-16 text-center">
              <Inbox className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700">No enquiries yet</p>
              <p className="mt-1 text-xs text-slate-400">
                New submissions from your contact and audit forms will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Content & System Health Overview */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Content Inventory
            </h2>
            <div className="space-y-2.5">
              {[
                {
                  label: "Blog Articles",
                  published: publishedPosts,
                  draft: draftPosts,
                  href: "/admin/blog",
                  icon: BookOpen,
                },
                {
                  label: "Services",
                  published: publishedServices,
                  href: "/admin/services",
                  icon: Sparkles,
                },
                {
                  label: "Projects & Portfolio",
                  published: publishedProjects,
                  href: "/admin/projects",
                  icon: Layers,
                },
                {
                  label: "Web Stories",
                  published: publishedStories,
                  href: "/admin/stories",
                  icon: Play,
                },
                {
                  label: "FAQs",
                  published: publishedFaqs,
                  href: "/admin/faqs",
                  icon: HelpCircle,
                },
                {
                  label: "Testimonials",
                  published: publishedTestimonials,
                  href: "/admin/testimonials",
                  icon: MessageSquare,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-3.5 py-2.5 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      {item.published} active
                    </span>
                    {item.draft !== undefined && item.draft > 0 && (
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        {item.draft} draft{item.draft !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* System Status Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  System Diagnostics
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Healthy
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-slate-400">Database</span>
                <p className="mt-0.5 font-semibold text-slate-800">MongoDB Connected</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <span className="text-slate-400">DB Latency</span>
                <p className="mt-0.5 font-semibold text-slate-800">{dbLatency} ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
