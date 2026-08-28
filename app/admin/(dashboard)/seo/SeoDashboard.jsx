"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Briefcase,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Settings,
  Sparkles,
  Layers,
  Search,
  Globe,
  ShieldCheck,
  Link2,
  ArrowRight,
  Filter,
  Compass,
  ArrowUpRight,
  TrendingUp,
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
  { label: "Technical SEO", max: 20, desc: "Clean canonical URLs, robots.txt crawl rules, SSL, mobile responsiveness." },
  { label: "On-Page & Metadata", max: 15, desc: "Unique titles (45–60), meta descriptions (120–155), and OG images." },
  { label: "Content Architecture", max: 15, desc: "Single H1, hierarchical H2/H3 subheadings, depth (>1,200 words service)." },
  { label: "Internal Linking", max: 15, desc: "Contextual links between services, case studies, blogs, and zero orphan pages." },
  { label: "Structured Data", max: 10, desc: "Organization, LocalBusiness, Service, Article, and BreadcrumbList JSON-LD." },
  { label: "Local Authority", max: 10, desc: "Ludhiana & Punjab localized intent signals, Google Business integration." },
  { label: "GEO & AI Search", max: 10, desc: "Machine-readable /llms.txt, clear entity definitions, conversational FAQs." },
  { label: "Conversion & CTAs", max: 5, desc: "High-intent WhatsApp triggers, free audit tools, and inquiry capture funnels." },
];

export default function SeoDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  async function loadSeoData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/seo-scan");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load SEO audit data.");
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
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.path?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        selectedPriority === "all" ||
        (selectedPriority === "critical" && item.issues.some((i) => i.priority === "CRITICAL")) ||
        (selectedPriority === "high" && item.issues.some((i) => i.priority === "HIGH")) ||
        (selectedPriority === "medium" && item.issues.some((i) => i.priority === "MEDIUM")) ||
        (selectedPriority === "low" && item.issues.some((i) => i.priority === "LOW"));

      return matchesType && matchesSearch && matchesPriority;
    });
  }, [data, selectedType, selectedPriority, searchQuery]);

  if (loading) return <AdminLoader rows={6} />;
  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">{error}</div>;
  if (!data) return null;

  const { overall, content = [], orphanPages = [] } = data;

  return (
    <div className="space-y-8">
      {/* Header & Quick Navigation */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles size={12} className="text-blue-600" />
            100-Point Audit Engine &amp; Authority Hub
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">SEO, GEO &amp; Content Intelligence</h1>
          <p className="mt-1 text-sm text-slate-500">
            Automated inspection across every indexable page, canonical structure, schema graph, and local search authority.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/seo/test"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <Compass size={13} className="text-blue-600" /> Live Diagnostics
          </Link>
          <Link
            href="/admin/seo/redirects"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <ArrowRight size={13} className="text-emerald-600" /> 301 Redirects
          </Link>
          <Link
            href="/admin/seo/backlinks"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <Link2 size={13} className="text-purple-600" /> Backlink CRM
          </Link>
          <Link
            href="/admin/seo/keywords"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <TrendingUp size={13} className="text-amber-600" /> Keywords
          </Link>
          <button
            onClick={loadSeoData}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Re-scan Site
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <ScoreRing score={overall.score} />
          <p className="mt-4 text-base font-bold text-slate-900">Overall SEO Health</p>
          <p className="text-xs text-slate-500">Graded across {overall.totalAudited} public routes</p>
          <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
            {overall.grade}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex flex-col justify-between rounded-2xl border border-red-200 bg-red-50/70 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-red-700">Critical</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-red-900">{overall.critical}</p>
            <p className="text-xs text-red-600">Immediate indexability risks</p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-orange-200 bg-orange-50/70 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-orange-700">High Priority</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-orange-900">{overall.high}</p>
            <p className="text-xs text-orange-600">Structural content issues</p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Medium</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-amber-900">{overall.medium}</p>
            <p className="text-xs text-amber-600">Optimization opportunities</p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-blue-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Orphan Pages</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-blue-900">{overall.orphanPagesCount}</p>
            <p className="text-xs text-blue-600">0 inbound internal links</p>
          </div>
        </div>
      </div>

      {/* Orphan Page Alert (if any found) */}
      {orphanPages.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <span>Orphan Pages Detected ({orphanPages.length})</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            These published pages have no internal links pointing to them. Add contextual links from related services or blog posts to pass crawl authority:
          </p>
          <div className="flex flex-wrap gap-2">
            {orphanPages.map((op) => (
              <span
                key={op.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1 text-xs font-mono text-amber-900 font-semibold"
              >
                {op.path} ({op.title})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Global SEO Settings Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Technical Foundation &amp; Protocol Health</h2>
          </div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
          >
            <Settings size={12} /> Global Settings
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Canonical Protocol</span>
            <p className="mt-1 font-mono font-bold text-slate-900">{siteConfig.url}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Primary Entity Location</span>
            <p className="mt-1 font-semibold text-slate-900">{siteConfig.address.city}, {siteConfig.address.state} ({siteConfig.address.country})</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Dynamic Sitemap</span>
            <a href="/sitemap.xml" target="_blank" className="mt-1 font-mono text-emerald-600 font-bold block hover:underline">/sitemap.xml (Active)</a>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">AI Search Discovery</span>
            <a href="/llms.txt" target="_blank" className="mt-1 font-mono text-blue-600 font-bold block hover:underline">/llms.txt (Active)</a>
          </div>
        </div>
      </div>

      {/* 8-Pillar Framework Breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">8-Pillar Search &amp; GEO Architecture Framework</h2>
        <p className="mt-1 text-xs text-slate-500">Every indexable public route is evaluated against these transparent technical criteria.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS_CONFIG.map((pillar) => (
            <div key={pillar.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{pillar.label}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Max {pillar.max} pts</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Page Audit Table & Inspector */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Public Page SEO Audit Catalog</h3>
            <p className="text-xs text-slate-500">Inspecting all {data.content.length} indexable routes for metadata, content depth, and schema.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title or path..."
                className="rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Type:</span>
            {[
              { key: "all", label: "All Items" },
              { key: "page", label: "Core Pages" },
              { key: "service", label: "Services" },
              { key: "blog", label: "Blog Articles" },
              { key: "project", label: "Work / Case Studies" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedType(tab.key)}
                className={`rounded-lg px-2.5 py-1 font-semibold transition ${
                  selectedType === tab.key
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Priority:</span>
            {[
              { key: "all", label: "All" },
              { key: "critical", label: "Critical" },
              { key: "high", label: "High" },
              { key: "medium", label: "Medium" },
              { key: "low", label: "Low" },
            ].map((pri) => (
              <button
                key={pri.key}
                onClick={() => setSelectedPriority(pri.key)}
                className={`rounded-lg px-2.5 py-1 font-semibold transition ${
                  selectedPriority === pri.key
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {pri.label}
              </button>
            ))}
          </div>
        </div>

        {/* Page Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">Page &amp; URL</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Words</th>
                <th className="py-3 px-4">Internal Links</th>
                <th className="py-3 px-4">Schema</th>
                <th className="py-3 px-4">Issues</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredContent.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                    No pages match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredContent.map((item) => {
                  const typeIcons = { blog: BookOpen, service: Briefcase, project: Layers, page: Globe };
                  const Icon = typeIcons[item.type] || FileText;

                  const editUrl =
                    item.type === "blog"
                      ? `/admin/blog/${item.id}`
                      : item.type === "service"
                      ? `/admin/services/${item.id}`
                      : item.type === "project"
                      ? `/admin/projects/${item.id}`
                      : `/admin/settings`;

                  return (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Icon size={15} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.title}</p>
                            <p className="font-mono text-[11px] text-slate-400">{item.path}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
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
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-800">
                        {item.wordCount} words
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">{item.internalLinks} out</span>
                        <span className="text-slate-400"> / {item.inboundLinks} in</span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {item.hasSchema ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                            <CheckCircle2 size={13} /> {item.schemaTypes?.slice(0, 2).join(", ") || "Yes"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-red-600">
                            <AlertTriangle size={13} /> None
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {item.issues.length === 0 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                            <CheckCircle2 size={12} /> Compliant
                          </span>
                        ) : (
                          <div className="space-y-1">
                            {item.issues.slice(0, 2).map((issue, idx) => (
                              <p
                                key={idx}
                                className={`text-[11px] font-medium leading-tight ${
                                  issue.priority === "CRITICAL"
                                    ? "text-red-700"
                                    : issue.priority === "HIGH"
                                    ? "text-orange-700"
                                    : "text-amber-700"
                                }`}
                              >
                                • {issue.message}
                              </p>
                            ))}
                            {item.issues.length > 2 && (
                              <p className="text-[10px] text-slate-400 font-semibold">
                                +{item.issues.length - 2} more issues
                              </p>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50"
                            title="View Public Page"
                          >
                            <ExternalLink size={13} />
                          </a>
                          {!item.isStatic && (
                            <Link
                              href={editUrl}
                              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Edit
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Best Practice Disclaimer */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
        <span>
          <strong>Ethical SEO Notice:</strong> HD Web Studios follows Google's People-First content guidelines and white-hat SEO fundamentals. Deterministic scores evaluate technical hygiene and user usefulness without manipulative link schemes or keyword stuffing.
        </span>
      </div>
    </div>
  );
}
