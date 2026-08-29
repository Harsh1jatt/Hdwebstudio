"use client";

import { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  X,
  Loader2,
  Sparkles,
  Info,
  Wand2,
} from "lucide-react";

export default function HdAiQualityReviewer({
  title,
  content,
  contentType = "service",
  targetKeyword = "",
  onTriggerImprovement,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState("");

  async function handleRunReview() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "review_content",
          input: {
            title,
            content,
            contentType,
            targetKeyword,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Quality review failed.");
      }

      setReview(data.review);
      setOpen(true);
    } catch (err) {
      setError(err.message || "Failed to inspect quality.");
    } finally {
      setLoading(false);
    }
  }

  function getScoreColor(score) {
    if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (score >= 70) return "text-blue-700 bg-blue-50 border-blue-200";
    if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  }

  return (
    <>
      <button
        type="button"
        onClick={handleRunReview}
        disabled={loading || !content}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition disabled:opacity-40 shadow-2xs"
        title="Check for AI clichés, repetition, and search quality"
      >
        {loading ? (
          <>
            <Loader2 size={13} className="animate-spin text-blue-600" />
            <span>Analyzing Quality...</span>
          </>
        ) : (
          <>
            <ShieldCheck size={14} className="text-blue-600" />
            <span>HD AI Quality Review</span>
          </>
        )}
      </button>

      {error && <span className="text-xs text-red-600 block mt-1">{error}</span>}

      {open && review && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>

            {/* Header with Score */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">HD AI Quality Score</h3>
                  <p className="text-xs text-slate-500">Inspection for clichés, repetition, and buyer intent.</p>
                </div>
              </div>

              <div
                className={`flex flex-col items-center rounded-xl border px-3.5 py-1.5 ${getScoreColor(
                  review.score || 0
                )}`}
              >
                <span className="text-xl font-extrabold">{review.score || 0}/100</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{review.grade || "Reviewed"}</span>
              </div>
            </div>

            {/* Summary */}
            {review.summary && (
              <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 border border-slate-100">
                {review.summary}
              </p>
            )}

            {/* Strengths */}
            {review.strengths?.length > 0 && (
              <div className="mt-4 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Key Strengths
                </span>
                <div className="space-y-1">
                  {review.strengths.map((str, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Issues and Actionable Suggestions */}
            {review.issues?.length > 0 && (
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Actionable Opportunities ({review.issues.length})
                </span>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {review.issues.map((iss, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-3 text-xs ${
                        iss.severity === "critical"
                          ? "bg-red-50/70 border-red-200 text-red-900"
                          : "bg-amber-50/70 border-amber-200 text-amber-900"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {iss.severity === "critical" ? (
                          <XCircle size={13} className="text-red-500" />
                        ) : (
                          <AlertTriangle size={13} className="text-amber-500" />
                        )}
                        <span>{iss.message}</span>
                      </div>
                      {iss.fixSuggestion && (
                        <p className="mt-1 text-[11px] text-slate-700 pl-4">
                          <strong className="font-semibold">Suggested fix:</strong> {iss.fixSuggestion}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[11px] text-slate-400">
                {review.recommendedAction || "Content evaluated against HD Web Studios standards."}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
