"use client";

import { useEffect, useState, useMemo } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Globe,
  Layers,
  Sparkles,
  BookOpen,
  Play,
  FileText,
  Clock,
  Activity,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";

function StatusBadge({ status }) {
  if (status === "HEALTHY" || status === "PASS") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
        <CheckCircle2 size={13} className="text-emerald-600" /> HEALTHY
      </span>
    );
  }
  if (status === "WARNING") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
        <AlertTriangle size={13} className="text-amber-600" /> WARNING
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 border border-red-200">
      <XCircle size={13} className="text-red-600" /> ERROR
    </span>
  );
}

export default function SitemapManager() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [checking, setChecking] = useState(false);
  const [healthCheckResult, setHealthCheckResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [refreshMessage, setRefreshMessage] = useState("");

  async function loadData() {
    try {
      const res = await fetch("/api/admin/seo/sitemap");
      const json = await res.json();
      if (json.success) setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    setRefreshMessage("");
    try {
      const res = await fetch("/api/admin/seo/sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "refresh" }),
      });
      const json = await res.json();
      if (json.success) {
        setRefreshMessage(
          `Sitemap refreshed successfully! Total URLs: ${json.counts.total} (Blogs: ${json.counts.blogs}, Services: ${json.counts.services}, Projects: ${json.counts.projects}, Stories: ${json.counts.stories}, Static: ${json.counts.static})`
        );
        await loadData();
      }
    } catch (err) {
      setRefreshMessage("Refresh failed: " + err.message);
    } finally {
      setRefreshing(false);
    }
  }

  async function handleHealthCheck() {
    setChecking(true);
    try {
      const res = await fetch("/api/admin/seo/sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check" }),
      });
      const json = await res.json();
      if (json.success) {
        setHealthCheckResult(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  }

  const filteredEntries = useMemo(() => {
    if (!data?.entries) return [];
    return data.entries.filter((entry) => {
      const matchesType = selectedType === "all" || entry.type === selectedType;
      const matchesSearch =
        !searchQuery.trim() ||
        entry.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.title?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [data, selectedType, searchQuery]);

  if (loading) return <AdminLoader rows={5} />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Dynamic Sitemap Manager</h1>
            <StatusBadge status={data.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500 font-mono">
            Canonical Endpoint:{" "}
            <a
              href={data.canonicalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              {data.canonicalUrl} <ExternalLink size={12} />
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleHealthCheck}
            disabled={checking}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            <Activity size={13} className="text-emerald-600" />
            {checking ? "Checking..." : "Check Sitemap Health"}
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Revalidating..." : "Refresh Sitemap"}
          </button>
        </div>
      </div>

      {/* Success / Info Notification */}
      {refreshMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs font-semibold text-emerald-900 animate-fadeIn">
          {refreshMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total URLs</span>
          <p className="mt-1 text-2xl font-black text-slate-900">{data.counts.total}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Static Pages</span>
          <p className="mt-1 text-2xl font-black text-slate-900">{data.counts.static}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Services</span>
          <p className="mt-1 text-2xl font-black text-blue-600">{data.counts.services}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Blog Articles</span>
          <p className="mt-1 text-2xl font-black text-purple-600">{data.counts.blogs}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Projects / Work</span>
          <p className="mt-1 text-2xl font-black text-slate-900">{data.counts.projects}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Web Stories</span>
          <p className="mt-1 text-2xl font-black text-amber-600">{data.counts.stories}</p>
        </div>
      </div>

      {/* Health Check Modal / Report */}
      {healthCheckResult && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Sitemap Diagnostic Health Check</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Checked at {new Date(healthCheckResult.checkedAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {healthCheckResult.checks.map((chk, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-xl border border-white bg-white/80 p-3 shadow-xs"
              >
                {chk.status === "PASS" ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold text-slate-900">{chk.name}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{chk.message}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setHealthCheckResult(null)}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Dismiss Report
          </button>
        </div>
      )}

      {/* URL Catalog Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active URLs in Sitemap ({filteredEntries.length})</h3>
            <p className="text-xs text-slate-500">Live database-backed routes served at /sitemap.xml.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search URL or title..."
                className="rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-2.5 flex flex-wrap gap-1.5 text-xs">
          {[
            { key: "all", label: "All Types" },
            { key: "static", label: "Static" },
            { key: "service", label: "Services" },
            { key: "blog", label: "Blog Posts" },
            { key: "project", label: "Work / Case Studies" },
            { key: "story", label: "Stories" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">Canonical URL</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Change Frequency</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-6 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEntries.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-6 font-mono text-slate-900 font-medium">
                    <p className="text-slate-900 font-sans font-bold text-xs">{item.title}</p>
                    <p className="text-[11px] text-blue-600 font-mono mt-0.5">{item.url}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-800">
                    {item.priority}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 capitalize">
                    {item.changeFrequency}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    {item.lastModified ? new Date(item.lastModified).toISOString().split("T")[0] : "—"}
                  </td>
                  <td className="py-3.5 px-6 text-right whitespace-nowrap">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 inline-flex items-center gap-1"
                      title="Open URL"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automatic Invalidation Guarantee Notice */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
        <span>
          <strong>Automated Dynamic Cache Invalidation:</strong> When you publish, update, unpublish, or delete content in the CMS, Next.js instantly revalidates the XML sitemap cache. The manual refresh button is provided for operational monitoring and edge verification.
        </span>
      </div>
    </div>
  );
}
