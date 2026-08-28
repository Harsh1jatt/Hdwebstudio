"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Code,
  Link2,
} from "lucide-react";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";

export default function SeoTester() {
  const [urlInput, setUrlInput] = useState("/services/business-website-development");
  const [category, setCategory] = useState("web-development");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleRunTest(e) {
    e?.preventDefault?.();
    if (!urlInput.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/seo/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim(), category }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "SEO diagnostic audit failed.");
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/seo"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2"
          >
            <ArrowLeft size={13} /> Back to SEO Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Live SEO &amp; Technical Inspector</h1>
          <p className="text-xs text-slate-500 mt-1">
            Test any public page or path for metadata, heading hierarchy, Schema structured data, and broken links.
          </p>
        </div>
      </div>

      {/* Input Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleRunTest} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_200px_auto]">
            <AdminInput
              id="testUrl"
              label="Page URL or Relative Path"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="/services/business-website-development"
              helperText="Enter full URL or path starting with /"
            />
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Topic Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="web-development">Web Development</option>
                <option value="ecommerce">Ecommerce</option>
                <option value="seo">SEO & Local Growth</option>
                <option value="software">Custom Software</option>
              </select>
            </div>
            <div className="flex items-end">
              <AdminButton type="submit" loading={loading} loadingText="Inspecting...">
                <Search size={14} /> Run Inspection
              </AdminButton>
            </div>
          </div>
        </form>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Audit Result Display */}
      {result && (
        <div className="space-y-6">
          {/* Hero Score Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inspected Route</span>
              <h2 className="text-lg font-bold text-slate-900 break-all">{result.url}</h2>
              <p className="text-xs text-slate-500 mt-1">Title: {result.meta?.title || "None"}</p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-3xl font-black text-slate-900">{result.score}/100</p>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    result.score >= 85
                      ? "bg-emerald-50 text-emerald-700"
                      : result.score >= 65
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.grade}
                </span>
              </div>
            </div>
          </div>

          {/* Checks Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Deterministic Health Checks</h3>
              <ul className="space-y-2.5 text-xs">
                {result.checks.map((chk, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    {chk.status === "pass" ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : chk.status === "warn" ? (
                      <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-slate-900">{chk.label}</p>
                      <p className="text-slate-600 mt-0.5">{chk.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Metadata Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Technical Metadata</h3>
              <div className="space-y-2 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Canonical Tag:</span>
                  <span className="font-mono text-slate-900 truncate max-w-[260px]">{result.meta?.canonical || "None"}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Robots Directive:</span>
                  <span className="font-semibold text-slate-900">{result.meta?.robots}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Word Count:</span>
                  <span className="font-bold text-slate-900">{result.meta?.wordCount} words</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">H1 Tag:</span>
                  <span className="font-semibold text-slate-900">{result.meta?.h1s?.[0] || "None"}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">H2 / H3 Count:</span>
                  <span className="font-semibold text-slate-900">{result.meta?.h2Count} H2s / {result.meta?.h3Count} H3s</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Structured Data Schemas:</span>
                  <span className="font-semibold text-emerald-600">{result.meta?.schemasFound?.join(", ") || "None"}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Links (Total / Broken):</span>
                  <span className="font-semibold text-slate-900">{result.linkScan?.total} scanned / {result.linkScan?.broken?.length} broken</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
