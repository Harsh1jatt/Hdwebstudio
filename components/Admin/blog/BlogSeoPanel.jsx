"use client";

import { useMemo } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { analyzeBlogSeo, SEO_SECTIONS } from "@/lib/seo/blogSeoAnalysis";

function StatusIcon({ status }) {
  if (status === "good") return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />;
  if (status === "warning") return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />;
  return <XCircle className="h-4 w-4 shrink-0 text-red-500" />;
}

export default function BlogSeoPanel({ form, originalSlug = "", slugAvailable = true }) {
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

  const { signals, summary, meta } = analysis;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">SEO Signals</h3>
            <p className="mt-1 text-xs text-slate-500">
              Heuristic guidance only — not a Google ranking score
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{summary.score}%</p>
            <p className="text-xs text-slate-500">
              {summary.good} good · {summary.warning} improve · {summary.problem} fix
            </p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all"
            style={{ width: `${summary.score}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        <p>
          SEO title: <strong>{meta.seoTitleLength}</strong> chars · Meta:{" "}
          <strong>{meta.metaLength}</strong> chars · Words: <strong>{meta.wordCount}</strong>
        </p>
      </div>

      {SEO_SECTIONS.map((section) => {
        const sectionSignals = signals.filter((s) => s.section === section.id);
        if (sectionSignals.length === 0) return null;
        return (
          <div key={section.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-800">{section.label}</h4>
            <ul className="space-y-2">
              {sectionSignals.map((signal, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <StatusIcon status={signal.status} />
                  <div>
                    <p className="font-medium text-slate-700">{signal.label}</p>
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
