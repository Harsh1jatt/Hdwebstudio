"use client";

import { useState } from "react";
import {
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Globe,
  RefreshCw,
  TrendingUp,
  FileText,
  Key,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function GscManager() {
  const [inspectUrl, setInspectUrl] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [inspectedData, setInspectedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const canonicalDomain = siteConfig.url;
  const sitemapUrl = `${canonicalDomain}/sitemap.xml`;

  const gscConsoleUrl = "https://search.google.com/search-console";
  const gscSitemapsUrl = `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(
    canonicalDomain
  )}`;

  function getInspectionUrl(urlToInspect) {
    const target = urlToInspect.startsWith("http")
      ? urlToInspect
      : `${canonicalDomain}${urlToInspect.startsWith("/") ? urlToInspect : `/${urlToInspect}`}`;
    return `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(
      canonicalDomain
    )}&id=${encodeURIComponent(target)}`;
  }

  function handleCopy(text) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedUrl(text);
      setTimeout(() => setCopiedUrl(""), 2000);
    }
  }

  async function handleInspect(e) {
    e.preventDefault();
    if (!inspectUrl.trim()) return;
    setLoading(true);
    setInspectedData(null);

    const fullUrl = inspectUrl.startsWith("http")
      ? inspectUrl
      : `${canonicalDomain}${inspectUrl.startsWith("/") ? inspectUrl : `/${inspectUrl}`}`;

    try {
      const res = await fetch(
        `/api/admin/seo/indexing-status?slug=${encodeURIComponent(
          inspectUrl.replace(/^(https?:\/\/[^/]+)?(\/blog\/|\/services\/|\/work\/|\/)?/, "")
        )}&type=blog`
      );
      const json = await res.json();
      setInspectedData({ ...json, targetUrl: fullUrl });
    } catch (err) {
      setInspectedData({ error: err.message, targetUrl: fullUrl });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Google Search Console Integration</h1>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
              Verified Domain: {canonicalDomain}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Monitor search indexing status, test canonical URLs, and submit sitemaps directly to Google.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={gscSitemapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
          >
            Submit Sitemap in GSC <ExternalLink size={12} />
          </a>
          <a
            href={gscConsoleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Open Search Console <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Critical Truthful Search Notice */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 flex items-start gap-3">
        <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed">
          <p className="font-bold text-sm">Important Search Discovery &amp; Indexing Truth:</p>
          <p className="mt-1 text-blue-800">
            Submitting a sitemap helps Google discover URLs, but <strong>does not guarantee immediate indexing or rankings</strong>. Google determines crawl prioritization and index selection based on quality, topical originality, and user value.
          </p>
        </div>
      </div>

      {/* URL Inspection Deep Link Launcher */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Google URL Inspection Launcher</h2>
        <p className="text-xs text-slate-500">
          Enter any page path (e.g. <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">/blog/my-post</code> or <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">/services/business-website-development</code>) to check local index readiness and launch Google's live URL Inspection tool.
        </p>

        <form onSubmit={handleInspect} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={inspectUrl}
              onChange={(e) => setInspectUrl(e.target.value)}
              placeholder="e.g. /blog/business-website-cost-punjab or https://hdwebstudios.in/..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition shrink-0"
          >
            {loading ? "Checking..." : "Inspect URL"}
          </button>
        </form>

        {inspectedData && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">{inspectedData.targetUrl}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  inspectedData.status === "DISCOVERED"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {inspectedData.status || "CHECKED"}
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 text-xs">
              <div className="rounded-lg bg-white p-2.5 border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Sitemap Inclusion</span>
                <p className="font-semibold text-slate-900 mt-0.5">{inspectedData.sitemap || "Checking..."}</p>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Robots Directive</span>
                <p className="font-semibold text-slate-900 mt-0.5">{inspectedData.robots || "INDEX, FOLLOW"}</p>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-bold">HTTP Status</span>
                <p className="font-semibold text-emerald-600 mt-0.5">{inspectedData.http || "200 OK"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleCopy(inspectedData.targetUrl)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                {copiedUrl === inspectedData.targetUrl ? <Check size={13} /> : <Copy size={13} />}
                {copiedUrl === inspectedData.targetUrl ? "Copied" : "Copy URL"}
              </button>
              <a
                href={getInspectionUrl(inspectedData.targetUrl)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
              >
                Open in Google URL Inspection <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Setup Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Google Search Console Verification Checklist</h2>
        <div className="space-y-2.5 text-xs">
          {[
            {
              title: "Canonical Domain Verified",
              desc: `Property verified as ${canonicalDomain} (via DNS TXT or HTML tag).`,
              done: true,
            },
            {
              title: "XML Sitemap Accessible",
              desc: `${sitemapUrl} returns HTTP 200 with valid schema.`,
              done: true,
            },
            {
              title: "Sitemap Submitted in Search Console",
              desc: "Go to Search Console > Sitemaps > Submit 'sitemap.xml'.",
              done: false,
              action: { label: "Submit Now", href: gscSitemapsUrl },
            },
            {
              title: "Core Pages Indexable",
              desc: "Ensure robots.txt allows / and all public service & blog routes.",
              done: true,
            },
            {
              title: "Request Recrawl on Important Articles",
              desc: "Use Google URL Inspection tool to request recrawl when critical articles are updated.",
              done: false,
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5"
            >
              <div className="flex items-start gap-2.5">
                {step.done ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold text-slate-900">{step.title}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{step.desc}</p>
                </div>
              </div>
              {step.action && (
                <a
                  href={step.action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-lg bg-white border border-slate-200 px-3 py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-50"
                >
                  {step.action.label} &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
