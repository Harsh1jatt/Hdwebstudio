"use client";

import { AlertTriangle, CheckCircle2, XCircle, X } from "lucide-react";

export function validateContentQuality(doc, type = "post") {
  const errors = [];
  const warnings = [];

  const title = (doc.title || doc.name || "").trim();
  const slug = (doc.slug || "").trim();
  const content = (doc.content || doc.description || "").trim();
  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const seoDescription = (doc.seoDescription || doc.excerpt || "").trim();
  const featuredImage = (doc.featuredImage || doc.heroImage || "").trim();
  const imageAlt = (doc.featuredImageAlt || "").trim();

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

  // Warning Checks (Allow Publishing with notice)
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

  const { isValid, errors, warnings } = validation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isValid ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isValid ? <AlertTriangle size={20} /> : <XCircle size={20} />}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isValid ? "Pre-Publish Quality Review" : "Publishing Blocked"}
            </h3>
            <p className="text-xs text-slate-500">
              {isValid
                ? "Your content passed critical criteria with minor optimization notices."
                : "Resolve critical validation errors before publishing live to Google."}
            </p>
          </div>
        </div>

        {/* Critical Errors */}
        {errors.length > 0 && (
          <div className="mt-5 space-y-2 rounded-xl border border-red-200 bg-red-50/70 p-4">
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
