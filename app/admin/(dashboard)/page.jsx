import {
  Users,
  UserPlus,
  Inbox,
  ShieldCheck,
  ArrowUpRight,
  Mail,
  Phone,
  CalendarDays,
  Activity,
  CheckCircle2,
} from "lucide-react";

import { requireAdmin } from "../../../lib/auth";
import connectDB from "../../../lib/db";
import Contact from "../../../models/Contact";

import QuickActions from "../../../components/admin/dashboard/QuickActions";

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-slate-600" />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          {value}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {description}
        </p>
      </div>
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
    <div className="group flex flex-col gap-4 border-b border-slate-100 px-5 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {lead.name || "Unknown lead"}
          </p>

          <div className="mt-1 flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-3">
            {lead.email && (
              <span className="flex items-center gap-1.5 truncate">
                <Mail className="h-3.5 w-3.5" />
                {lead.email}
              </span>
            )}

            {lead.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {lead.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          New enquiry
        </span>

        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(lead.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  await connectDB();

  const totalLeads = await Contact.countDocuments();

  const today = new Date();

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const leadsToday = await Contact.countDocuments({
    createdAt: {
      $gte: startOfDay,
    },
  });

  const recentLeads = await Contact.find()
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .lean();

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* ------------------------------------------------ */}
      {/* Welcome Header */}
      {/* ------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
        {/* Background decoration */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              Secure admin session
            </div>

            <p className="text-sm font-medium text-blue-300">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {session.user.name}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Here's what's happening across your HD Web Studios
              workspace. Manage leads, monitor activity and keep
              your business operations moving.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Signed in as
              </p>

              <p className="mt-0.5 max-w-[220px] truncate text-sm font-medium text-white">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* Stats */}
      {/* ------------------------------------------------ */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total leads"
          value={totalLeads}
          description="All enquiries received"
          icon={Users}
          href="/admin/leads"
        />

        <StatCard
          title="New today"
          value={leadsToday}
          description="Enquiries received today"
          icon={UserPlus}
          href="/admin/leads"
        />

        <StatCard
          title="Recent leads"
          value={recentLeads.length}
          description="Latest 5 enquiries"
          icon={Inbox}
          href="/admin/leads"
        />

        <StatCard
          title="Admin role"
          value={session.user.role}
          description="Current access level"
          icon={ShieldCheck}
          href="/admin/settings"
        />
      </section>

      {/* ------------------------------------------------ */}
      {/* Main Content */}
      {/* ------------------------------------------------ */}

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        {/* Recent Leads */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />

                <h2 className="text-base font-semibold text-slate-950">
                  Recent leads
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Latest enquiries submitted through your website.
              </p>
            </div>

            <a
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              View all

              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {recentLeads.length > 0 ? (
            <div>
              {recentLeads.map((lead) => (
                <LeadRow
                  key={lead._id.toString()}
                  lead={lead}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Inbox className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No leads yet
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                When someone submits your contact form, their
                enquiry will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}

        <div className="space-y-6">
          <QuickActions />

          {/* System Status */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-950">
                  System status
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your admin workspace is operational.
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Authentication
                </span>

                <span className="font-medium text-emerald-600">
                  Protected
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Database
                </span>

                <span className="font-medium text-emerald-600">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Lead capture
                </span>

                <span className="font-medium text-emerald-600">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}