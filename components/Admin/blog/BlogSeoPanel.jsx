"use client";

import { useMemo, useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Link2,
  ExternalLink,
  BookOpen,
  Plus,
} from "lucide-react";
import { analyzeBlogSeo, SEO_SECTIONS } from "@/lib/seo/blogSeoAnalysis";
import { findInternalLinkRecommendations } from "@/lib/ai/internalLinks";
import { getAuthoritativeLinkSuggestions } from "@/lib/seo/smartPaste";
import { analyzeContentGaps } from "@/lib/seo/contentGaps";

function StatusIcon({ status }) {
  if (status === "good") return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />;
  if (status === "warning") return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />;
  return <XCircle className="h-4 w-4 shrink-0 text-red-500" />;
}

export default function BlogSeoPanel({
  form,
  originalSlug = "",
  slugAvailable = true,
  onInsertLink,
}) {
  const [internalLinkRecs, setInternalLinkRecs] = useState([]);
  const [externalSuggestions, setExternalSuggestions] = useState([]);
  const [contentGaps, setContentGaps] = useState(null);

  const analysis = useMemo(
    () =>
      analyzeBlogSeo({
        title: form.title,
        slug: form.slug,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        excerpt: form.excerpt,
        content: form.content,
        contentFormat: form.contentFormat || "html",
        focusKeyword: form.focusKeyword,
        secondaryKeywords: form.secondaryKeywords || [],
        featuredImage: form.featuredImage,
        featuredImageAlt: form.featuredImageAlt,
        status: form.status,
        originalSlug,
        slugAvailable,
      }),
    [form, originalSlug, slugAvailable]
  );

  useEffect(() => {
    // Dynamic suggestions based on content
    if (form.content) {
      findInternalLinkRecommendations({ content: form.content, currentSlug: form.slug })
        .then((res) => setInternalLinkRecs(res.recommendations || []))
        .catch(() => {});

      const extLinks = getAuthoritativeLinkSuggestions(form.content);
      setExternalSuggestions(extLinks);

      const gaps = analyzeContentGaps({
        content: form.content,
        category: form.category || "web-development",
        title: form.title,
      });
      setContentGaps(gaps);
    }
  }, [form.content, form.slug, form.category, form.title]);

  const { signals, summary, meta } = analysis;

  // Estimated depth guidance
  const estimatedDepth =
    meta.wordCount >= 1500
      ? "Comprehensive Guide (Deep Authority)"
      : meta.wordCount >= 800
      ? "Standard In-Depth Article"
      : meta.wordCount >= 400
      ? "Focused Overview"
      : "Brief / Needs Expansion";

  return (
    <div className="space-y-4 text-xs">
      {/* Overall Score Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              <Sparkles size={11} /> On-Page SEO Engine
            </div>
            <h3 className="mt-0.5 text-base font-bold text-slate-900">SEO Health Grade</h3>
          </div>
          <div className="text-right">
            <p
              className={`text-2xl font-black ${
                summary.score >= 85
                  ? "text-emerald-600"
                  : summary.score >= 65
                  ? "text-amber-600"
                  : "text-red-600"
              }`}
            >
              {summary.score}%
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              {summary.good} passed · {summary.warning} tips · {summary.problem} issues
            </p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              summary.score >= 85
                ? "bg-emerald-500"
                : summary.score >= 65
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
            style={{ width: `${summary.score}%` }}
          />
        </div>
      </div>

      {/* Metrics & Depth Card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1.5 text-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-500">Content Depth:</span>
          <span className="font-bold text-slate-900">{estimatedDepth}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Word Count:</span>
          <span className="font-semibold text-slate-900">{meta.wordCount} words</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Headings (H2 / H3):</span>
          <span className="font-semibold text-slate-900">
            {meta.headingCounts?.h2 || 0} H2s, {meta.headingCounts?.h3 || 0} H3s
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">SEO Title Length:</span>
          <span className="font-semibold text-slate-900">{meta.seoTitleLength} / 60 chars</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Meta Description:</span>
          <span className="font-semibold text-slate-900">{meta.metaLength} / 155 chars</span>
        </div>
      </div>

      {/* Semantic Content Gaps */}
      {contentGaps && contentGaps.missingCount > 0 && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900">Topical Completeness</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
              {contentGaps.coverageScore}% Covered
            </span>
          </div>
          <p className="text-[11px] text-blue-700">
            Consider covering these key entities to establish full search intent authority:
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {contentGaps.missing.slice(0, 4).map((m, i) => (
              <span
                key={i}
                className="rounded-md border border-blue-200 bg-white px-2 py-0.5 text-[10px] font-medium text-blue-800"
              >
                + {m.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Semantic Internal Link Recommendations */}
      {internalLinkRecs.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Link2 size={13} className="text-blue-600" />
            <span>Suggested Internal Links</span>
          </div>
          <p className="text-[11px] text-slate-500">Contextual link targets found in your draft:</p>
          <div className="space-y-2">
            {internalLinkRecs.slice(0, 4).map((rec, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5"
              >
                <div>
                  <p className="font-bold text-slate-900">{rec.targetTitle}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Anchor: <span className="font-mono text-blue-600 font-semibold">"{rec.suggestedAnchor}"</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 italic">{rec.whyRelevant}</p>
                </div>
                {onInsertLink && (
                  <button
                    type="button"
                    onClick={() => onInsertLink(rec.targetUrl, rec.suggestedAnchor)}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-blue-700"
                  >
                    <Plus size={10} /> Link
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Authoritative External Reference Suggestions */}
      {externalSuggestions.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ExternalLink size={13} className="text-emerald-600" />
            <span>Authoritative Sources to Cite</span>
          </div>
          <p className="text-[11px] text-slate-500">Official documentation to back up claims:</p>
          <div className="space-y-2">
            {externalSuggestions.map((ext, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5"
              >
                <div>
                  <p className="font-bold text-emerald-950">{ext.source}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{ext.description}</p>
                </div>
                <a
                  href={ext.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-white px-2 py-1 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50"
                >
                  View <ExternalLink size={10} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Diagnostic Sections */}
      {SEO_SECTIONS.map((section) => {
        const sectionSignals = signals.filter((s) => s.section === section.id);
        if (sectionSignals.length === 0) return null;
        return (
          <div key={section.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <h4 className="mb-2 text-xs font-bold text-slate-800 uppercase tracking-wider">{section.label}</h4>
            <ul className="space-y-2">
              {sectionSignals.map((signal, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <StatusIcon status={signal.status} />
                  <div>
                    <p className="font-semibold text-slate-800">{signal.label}</p>
                    <p className="text-slate-500">{signal.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
