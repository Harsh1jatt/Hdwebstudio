"use client";

import { useEffect, useState, useMemo } from "react";
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
  Sparkles,
  Bot,
  Layers,
  Search,
  Globe,
  ShieldCheck,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import { siteConfig } from "@/config/site";

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? "#10b981" : score >= 65 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-slate-950">{score}</p>
        <p className="text-[10px] text-slate-500">/100</p>
      </div>
    </div>
  );
}

const PILLARS_CONFIG = [
  { key: "technical", label: "Technical SEO", max: 20, desc: "Slug format, crawlability, protocol security" },
  { key: "metadata", label: "Metadata & OG", max: 15, desc: "Title length (45-60), meta description (120-155), social image" },
  { key: "structure", label: "Content Structure", max: 15, desc: "Word count (>250 service, >600 blog), single H1, H2/H3 depth" },
  { key: "keywords", label: "Keyword Targeting", max: 15, desc: "Focus keyword presence in title, slug, and opening copy" },
  { key: "internalLinks", label: "Internal Linking", max: 10, desc: "Contextual links to services, portfolio, and contact" },
  { key: "semantic", label: "Semantic Coverage", max: 10, desc: "Deliverables checklist (What You Get) & structured FAQ" },
  { key: "schema", label: "Schema Markup", max: 5, desc: "Service, Article, LocalBusiness, and FAQPage JSON-LD" },
  { key: "readability", label: "Readability", max: 5, desc: "Bulleted lists, bold highlights, and balanced sentence lengths" },
  { key: "aiSearch", label: "AI Search Readiness", max: 5, desc: "Direct factual answers, entity clarity, and conversational FAQ" },
];

const STATIC_PAGES = [
  { path: "/", title: "Homepage", desc: "Digital studio overview, core pillars, and client conversion flow." },
  { path: "/about", title: "About Studio", desc: "Agency engineering ethos, founder context, and local authority." },
  { path: "/services", title: "Services Catalog", desc: "4 strategic capability categories and feature breakdowns." },
  { path: "/work", title: "Work / Case Studies", desc: "Portfolio showcase with client outcomes and technical solutions." },
  { path: "/pricing", title: "Transparent Pricing", desc: "Starter, Business, and Custom scoping packages." },
  { path: "/audit", title: "Website Audit Tool", desc: "Interactive 8-category digital presence analysis engine." },
  { path: "/contact", title: "Contact & Lead Form", desc: "Honeypot-protected inquiry capture with WhatsApp quick actions." },
];

export default function SeoDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredContent = useMemo(() => {
    if (!data?.content) return [];
    return data.content.filter((item) => {
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [data, selectedType, searchQuery]);

  if (loading) return <AdminLoader rows={5} />;
  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">{error}</div>;
  if (!data) return null;

  const { overall, content = [], issues = [] } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles size={12} className="text-blue-600" />
            Deterministic 100-Point Model
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">SEO &amp; Content Intelligence</h1>
          <p className="mt-1 text-sm text-slate-500">
            Formulaic grading across technical compliance, metadata, keyword targeting, and AI search readiness.
          </p>
        </div>
        <button
          onClick={loadSeoData}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <RefreshCw className="h-4 w-4" /> Rescan All Content
        </button>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <ScoreRing score={overall.score} />
          <p className="mt-4 text-base font-bold text-slate-900">Aggregate SEO Health</p>
          <p className="text-xs text-slate-500">Evaluated across all published CMS records</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-red-200 bg-red-50/70 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-red-700">Critical Issues</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-red-900">{overall.critical}</p>
            <p className="text-xs text-red-600">Immediate indexability risks</p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Warnings</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-amber-900">{overall.warnings}</p>
            <p className="text-xs text-amber-600">Optimization opportunities</p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Passed Checks</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-emerald-900">{overall.passed}</p>
            <p className="text-xs text-emerald-600">Compliant evaluation criteria</p>
          </div>
        </div>
      </div>

      {/* Global SEO Settings Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Global Website SEO Configuration</h2>
          </div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
          >
            <Settings size={12} /> Edit Settings
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Canonical URL</span>
            <p className="mt-1 font-mono text-slate-900">{siteConfig.url}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Primary Location</span>
            <p className="mt-1 font-semibold text-slate-900">{siteConfig.address.city}, {siteConfig.address.state} ({siteConfig.address.country})</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Sitemap Endpoint</span>
            <p className="mt-1 font-mono text-emerald-600">/sitemap.xml (Active)</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Robots Directive</span>
            <p className="mt-1 font-mono text-slate-900">/robots.txt (Index: true)</p>
          </div>
        </div>
      </div>

      {/* 9-Pillar Diagnostic Framework Breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">9-Pillar Deterministic Evaluation Breakdown</h2>
        <p className="mt-1 text-xs text-slate-500">Every piece of published content is graded against these transparent criteria.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS_CONFIG.map((pillar) => (
            <div key={pillar.key} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{pillar.label}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Max {pillar.max} pts</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Page & Content SEO Inspector */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Content SEO Inspector</h3>
            <p className="text-xs text-slate-500">Deterministic grades for Services, Blogs, Case Studies, and Static Pages.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title or slug..."
                className="rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Content Type Filter Pills */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-2 flex flex-wrap gap-1.5 text-xs">
          {[
            { key: "all", label: "All Items" },
            { key: "service", label: "Services" },
            { key: "blog", label: "Blog Posts" },
            { key: "project", label: "Projects / Work" },
            { key: "story", label: "Web Stories" },
            { key: "static", label: "Core Pages" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedType(tab.key)}
              className={`rounded-lg px-3 py-1 font-semibold transition ${
                selectedType === tab.key
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {selectedType === "static" ? (
          <div className="divide-y divide-slate-100">
            {STATIC_PAGES.map((page) => (
              <div key={page.path} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Globe size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{page.title}</p>
                    <p className="text-xs text-slate-500">{page.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-400">{page.path}</span>
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View Page <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredContent.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">No content matches the selected filter.</div>
            ) : (
              filteredContent.map((item) => {
                const typeIcons = { blog: BookOpen, service: Briefcase, project: Layers, story: Play };
                const Icon = typeIcons[item.type] || FileText;
                const editUrl =
                  item.type === "blog"
                    ? `/admin/blog/${item.id}`
                    : item.type === "service"
                    ? `/admin/services/${item.id}`
                    : item.type === "project"
                    ? `/admin/projects/${item.id}`
                    : `/admin/stories/${item.id}`;

                const publicUrl =
                  item.type === "blog"
                    ? `/blog/${item.slug}`
                    : item.type === "service"
                    ? `/services/${item.slug}`
                    : item.type === "project"
                    ? `/work/${item.slug}`
                    : `/stories/${item.slug}`;

                return (
                  <div key={`${item.type}-${item.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-400">{publicUrl}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          item.score >= 85
                            ? "bg-emerald-50 text-emerald-700"
                            : item.score >= 65
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.score}/100
                      </span>
                      <Link
                        href={editUrl}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        Edit Content
                      </Link>
                      <Link
                        href={`/admin/chat?prompt=${encodeURIComponent(`Improve SEO for ${item.title}`)}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
                      >
                        <Bot size={13} />
                        Fix with AI
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Actionable Issues */}
      {issues.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Actionable Diagnostics</h3>
          <div className="space-y-3">
            {issues.map((issue, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-5 ${
                  issue.status === "problem" ? "border-red-200 bg-red-50/50" : "border-amber-200 bg-amber-50/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${issue.status === "problem" ? "text-red-500" : "text-amber-500"}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{issue.label}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{issue.message || issue.detail}</p>
                    {issue.hint && <p className="mt-1 text-xs text-slate-500 italic">💡 {issue.hint}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {issue.fixUrl && (
                    <Link
                      href={issue.fixUrl}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Manual Fix <ExternalLink size={12} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/chat?prompt=${encodeURIComponent(`Fix issue: ${issue.label} - ${issue.message || issue.detail}`)}`}
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
                  >
                    <Sparkles size={12} />
                    Fix with HD AI
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Best Practice Disclaimer */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
        <span>
          <strong>Transparency Note:</strong> SEO scores reflect deterministic compliance with technical on-page standards, schema structure, and content depth. They provide actionable guidelines and do not guarantee search engine ranking.
        </span>
      </div>
    </div>
  );
}
