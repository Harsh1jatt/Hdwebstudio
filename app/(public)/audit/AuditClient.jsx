"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  Globe,
  ArrowRight,
  TrendingUp,
  Layout,
  MessageCircle,
} from "lucide-react";
import { whatsAppUrl } from "@/config/site";

export default function AuditClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);

  async function handleAudit(e) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setReport(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), honeypot: "" }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis failed. Please check the URL.");
      }

      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-6 py-12 sm:py-16">
      {/* Form Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleAudit} className="space-y-4">
          <label htmlFor="audit-url" className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
            Enter your website address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                id="audit-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com or https://yourbusiness.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/10"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Website
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results View */}
      {report && (
        <div className="mt-12 space-y-8 animate-in fade-in duration-500">
          {/* Main Score Header */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80 p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Digital Presence Report</span>
                <h2 className="mt-1 text-2xl font-black text-slate-950">{report.domain}</h2>
                <p className="mt-1 text-xs text-slate-500">Tested in {report.latencyMs}ms &bull; Real-time diagnostic</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-4xl font-black text-slate-950">{report.overallScore}<span className="text-2xl text-slate-400">/100</span></p>
                  <p className="text-xs font-bold text-blue-600">{report.grade}</p>
                </div>
              </div>
            </div>

            {/* Category Bars */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200/70 pt-6 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">SEO</span>
                  <span className="font-bold text-slate-900">{report.categoryScores.seo}/20</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Mobile</span>
                  <span className="font-bold text-slate-900">{report.categoryScores.mobile}/15</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Speed</span>
                  <span className="font-bold text-slate-900">{report.categoryScores.performance}/10</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Conversion</span>
                  <span className="font-bold text-slate-900">{report.categoryScores.conversion}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown: Working vs Improvement */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* What is working */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <CheckCircle2 size={16} />
                What Is Working
              </h3>
              <ul className="mt-4 space-y-2.5">
                {report.findings.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="mt-0.5 text-emerald-600 font-bold">&bull;</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <AlertCircle size={16} />
                Actionable Recommendations
              </h3>
              <ul className="mt-4 space-y-2.5">
                {report.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="mt-0.5 text-amber-600 font-bold">&bull;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Conversion CTA Card */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-cyan-50/50 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-xs">
            <div>
              <h3 className="text-xl font-black text-slate-950">Get a Professional Improvement Plan</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
                Our engineering team will review your website architecture, mobile UX, and local SEO structure to create a custom growth roadmap.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Discuss Upgrade
              </Link>
              <a
                href={whatsAppUrl(`Hi Harshdeep, I just audited my website (${report.domain}) and would like to discuss an upgrade plan.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-800 transition hover:bg-emerald-100"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
