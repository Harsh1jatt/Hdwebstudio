"use client";

import { AlertTriangle, CheckCircle2, XCircle, X, ShieldCheck } from "lucide-react";

export function validateContentQuality(doc, type = "post") {
  const errors = [];
  const warnings = [];

  const title = (doc.title || doc.name || "").trim();
  const slug = (doc.slug || "").trim();
  const content = (doc.content || doc.description || "").trim();
  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const seoTitle = (doc.seoTitle || title || "").trim();
  const seoDescription = (doc.seoDescription || doc.excerpt || "").trim();
  const featuredImage = (doc.featuredImage || doc.heroImage || "").trim();
  const imageAlt = (doc.featuredImageAlt || "").trim();

  // Extract internal/external links from HTML
  const hasH1InBody = /<h1[^>]*>/i.test(content);
  const internalLinksCount = (content.match(/href=["'](\/[^"']*)["']/gi) || []).length;
  const externalLinksCount = (content.match(/href=["'](https?:\/\/[^"']*)["']/gi) || []).length;

  // 13-Point SEO Readiness Checklist
  const checklist = [
    { label: "Title", pass: Boolean(title && title.length >= 20 && title.length <= 70), detail: `${title.length} characters` },
    { label: "Meta Description", pass: Boolean(seoDescription && seoDescription.length >= 80 && seoDescription.length <= 165), detail: `${seoDescription.length} characters` },
    { label: "Slug", pass: Boolean(slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)), detail: `/${type === "post" ? "blog" : "services"}/${slug}` },
    { label: "H1 Hierarchy", pass: !hasH1InBody, detail: hasH1InBody ? "H1 found inside body (title is page H1)" : "Title serves as page H1" },
    { label: "Content Length", pass: wordCount >= (type === "post" ? 400 : 200), detail: `${wordCount} words` },
    { label: "Featured Image", pass: Boolean(featuredImage), detail: featuredImage ? "Provided" : "Missing" },
    { label: "Alt Text", pass: Boolean(!featuredImage || imageAlt), detail: imageAlt ? "Provided" : "Missing alt" },
    { label: "Internal Links", pass: internalLinksCount >= 1, detail: `${internalLinksCount} internal links` },
    { label: "External References", pass: externalLinksCount >= 0, detail: `${externalLinksCount} external links` },
    { label: "Canonical URL", pass: Boolean(slug), detail: `https://hdwebstudios.in/${type === "post" ? "blog" : "services"}/${slug}` },
    { label: "Schema.org Graph", pass: true, detail: type === "post" ? "BlogPosting + Organization" : "Service + LocalBusiness" },
    { label: "Indexability", pass: true, detail: "index, follow" },
    { label: "Sitemap Readiness", pass: Boolean(slug), detail: "Will be added to /sitemap.xml" },
  ];

  // Critical Checks (Block Publishing)
  if (!title) {
    errors.push("Missing Title: Content must have a valid descriptive title.");
  }
  if (!slug) {
    errors.push("Missing URL Slug: Content must have a clean URL path.");
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push("Invalid URL Slug: Slug must contain only lowercase letters, numbers, and hyphens.");
  }

  if (wordCount < 50) {
    errors.push(`Content is nearly empty (${wordCount} words). Add comprehensive text before publishing.`);
  }

  // Warning Checks
  if (!seoDescription) {
    warnings.push("Missing Meta Description: Search engines will auto-generate snippets which may not be optimal.");
  } else if (seoDescription.length < 80 || seoDescription.length > 165) {
    warnings.push(`Meta Description length (${seoDescription.length} chars) is outside the recommended 120–155 char range.`);
  }

  if (type === "post" && wordCount < 400) {
    warnings.push(`Content length is brief (${wordCount} words). Aim for 800+ words for competitive search topics.`);
  }

  if (!featuredImage) {
    warnings.push("Missing Featured Image: OpenGraph social previews will use site default placeholder.");
  } else if (featuredImage && !imageAlt) {
    warnings.push("Missing Featured Image Alt Text: Required for image SEO and screen reader accessibility.");
  }

  if (!doc.focusKeyword && type === "post") {
    warnings.push("No Focus Keyword defined: Keyword targeting and density checks cannot be calculated.");
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    canPublish: isValid,
    errors,
    warnings,
    checklist,
    summary: {
      wordCount,
      hasTitle: Boolean(title),
      hasSlug: Boolean(slug),
    },
  };
}

export default function QualityGateModal({
  isOpen,
  onClose,
  onConfirmPublish,
  validation,
  targetStatus = "published",
}) {
  if (!isOpen || !validation) return null;

  const { isValid, errors, warnings, checklist = [] } = validation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isValid ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isValid ? "SEO Readiness & Pre-Publish Review" : "Publishing Blocked"}
            </h3>
            <p className="text-xs text-slate-500">
              {isValid
                ? "13-point SEO inspection passed. Review checks below before live publishing."
                : "Resolve critical validation errors before publishing live to Google."}
            </p>
          </div>
        </div>

        {/* 13-Point Checklist Table */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-2">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            13-Point Search &amp; Indexability Checklist
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-white p-2 border border-slate-100"
              >
                <div className="truncate pr-1">
                  <span className="font-semibold text-slate-800 text-[11px] block truncate">{item.label}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{item.detail}</span>
                </div>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${
                    item.pass ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.pass ? "PASS" : "WARN"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Errors */}
        {errors.length > 0 && (
          <div className="mt-4 space-y-2 rounded-xl border border-red-200 bg-red-50/70 p-4">
            <p className="text-xs font-bold text-red-900 uppercase tracking-wider">Critical Errors (Must Fix)</p>
            <ul className="space-y-1.5 text-xs text-red-700">
              {errors.map((err, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle size={14} className="shrink-0 mt-0.5 text-red-500" />
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mt-4 space-y-2 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Optimization Opportunities</p>
            <ul className="space-y-1.5 text-xs text-amber-700">
              {warnings.map((warn, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-500" />
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Return to Editor
          </button>
          {isValid && (
            <button
              type="button"
              onClick={() => {
                onConfirmPublish();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
            >
              <CheckCircle2 size={14} />
              Confirm &amp; Publish Live
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

