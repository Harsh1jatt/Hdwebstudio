"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Briefcase,
  BookOpen,
  Play,
  ExternalLink,
  RefreshCw,
  Settings,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-slate-950">{score}</p>
        <p className="text-[10px] text-slate-500">/100</p>
      </div>
    </div>
  );
}

function IssueCard({ issue, fixUrl }) {
  const icon = issue.status === "problem" ? (
    <AlertTriangle className="h-4 w-4 text-red-500" />
  ) : (
    <AlertTriangle className="h-4 w-4 text-amber-500" />
  );

  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
      issue.status === "problem" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
    }`}>
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">{issue.label}</p>
        <p className="mt-0.5 text-xs text-slate-600">{issue.message}</p>
        {issue.hint && <p className="mt-1 text-xs text-slate-500 italic">{issue.hint}</p>}
        {fixUrl && (
          <Link href={fixUrl} className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
            Fix now <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

function ContentRow({ item, type }) {
  const icons = { blog: BookOpen, service: Briefcase, project: FileText, story: Play };
  const Icon = icons[type] || FileText;
  const editUrls = {
    blog: `/admin/blog/${item.id}`,
    service: `/admin/services/${item.id}`,
    project: `/admin/projects/${item.id}`,
    story: `/admin/stories/${item.id}`,
  };
  const publicUrls = {
    blog: `/blog/${item.slug}`,
    service: `/services/${item.slug}`,
    project: `/portfolio/${item.slug}`,
    story: `/stories/${item.slug}`,
  };

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{item.title}</p>
        <p className="text-xs text-slate-500">/{type === "blog" ? "blog" : type === "service" ? "services" : type === "project" ? "portfolio" : "stories"}/{item.slug}</p>
      </div>
      <div className="flex items-center gap-2">
        {item.status !== "published" && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">{item.status}</span>
        )}
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
          item.score >= 80 ? "bg-emerald-50 text-emerald-700" : item.score >= 60 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
        }`}>
          {item.score}/100
        </span>
        <Link href={editUrls[type]} className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">Edit</Link>
      </div>
    </div>
  );
}

export default function SeoDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSeoData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/seo-scan");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load SEO data.");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSeoData();
  }, []);

  if (loading) return <AdminLoader />;
  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">{error}</div>;
  if (!data) return null;

  const { overall, content, issues } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">SEO Health</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">SEO Booster Dashboard</h2>
          <p className="mt-2 text-sm text-slate-500">Analyze your content and fix SEO issues to improve search visibility.</p>
        </div>
        <button onClick={loadSeoData} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <RefreshCw className="h-4 w-4" /> Rescan
        </button>
      </div>

      {/* Overall Score */}
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <ScoreRing score={overall.score} />
          <p className="mt-4 text-lg font-bold text-slate-900">SEO Health Score</p>
          <p className="text-sm text-slate-500">Across all published content</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="text-sm font-semibold text-red-700">Critical</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-red-900">{overall.critical}</p>
            <p className="text-xs text-red-600">Issues requiring attention</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-sm font-semibold text-amber-700">Warnings</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-amber-900">{overall.warnings}</p>
            <p className="text-xs text-amber-600">Improvements available</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-semibold text-emerald-700">Passed</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-emerald-900">{overall.passed}</p>
            <p className="text-xs text-emerald-600">Checks passed</p>
          </div>
        </div>
      </div>

      {/* Content Scores */}
      {content.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="text-base font-semibold text-slate-900">Content SEO Scores</h3>
            <p className="mt-1 text-sm text-slate-500">Individual scores for all published content.</p>
          </div>
          <div>
            {content.map((item) => (
              <ContentRow key={`${item.type}-${item.id}`} item={item} type={item.type} />
            ))}
          </div>
        </div>
      )}

      {/* Issues */}
      {issues.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-slate-900">Actionable Issues</h3>
          {issues.map((issue, i) => (
            <IssueCard key={i} issue={issue} fixUrl={issue.fixUrl} />
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Quick Links</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/admin/blog" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><BookOpen className="h-4 w-4" /> Blog Posts</Link>
          <Link href="/admin/services" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Briefcase className="h-4 w-4" /> Services</Link>
          <Link href="/admin/projects" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><FileText className="h-4 w-4" /> Projects</Link>
          <Link href="/admin/stories" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Play className="h-4 w-4" /> Web Stories</Link>
          <Link href="/admin/settings" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Settings className="h-4 w-4" /> Site Settings</Link>
        </div>
      </div>
    </div>
  );
}
