"use client";

import { useState } from "react";
import { Sparkles, Loader2, RefreshCw, X, Check, Eye } from "lucide-react";

export default function HdAiSectionRegenerate({
  sectionType, // "hero" | "overview" | "highlights" | "deliverables" | "faqs" | "seo" | "challenge_solution" | "results"
  entityType = "service", // "service" | "blog" | "project"
  entityTitle,
  fullDocumentContext = {},
  currentData = null,
  onApply,
  label = "Regenerate Section",
}) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [error, setError] = useState("");

  async function handleRegenerate() {
    if (!entityTitle?.trim()) {
      setError("Please ensure the title or name is filled first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const task =
        entityType === "service"
          ? "regenerate_service_section"
          : entityType === "project"
          ? "regenerate_project_section"
          : "regenerate_blog_section";

      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task,
          input: {
            sectionType,
            entityTitle,
            currentSectionData: currentData,
            fullDocumentContext,
            instructions: instructions.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to regenerate section.");
      }

      setGeneratedData(data.content);
      setModalOpen(true);
    } catch (err) {
      setError(err.message || "Regeneration failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleConfirmApply() {
    if (onApply && generatedData !== null) {
      onApply(generatedData);
    }
    setModalOpen(false);
    setGeneratedData(null);
  }

  return (
    <>
      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={loading || !entityTitle?.trim()}
          className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50/60 px-2.5 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
          title={`Regenerate ${sectionType} with HD AI`}
        >
          {loading ? (
            <>
              <Loader2 size={11} className="animate-spin text-blue-600" />
              <span>Regenerating...</span>
            </>
          ) : (
            <>
              <Sparkles size={11} className="text-blue-600" />
              <span>{label}</span>
            </>
          )}
        </button>
      </div>

      {/* Preview Modal Before Applying */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Preview Regenerated {sectionType.toUpperCase()}
                </h4>
                <p className="text-xs text-slate-500">Review changes before applying to form</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono text-slate-800 max-h-64 overflow-y-auto whitespace-pre-wrap">
              {typeof generatedData === "string"
                ? generatedData
                : JSON.stringify(generatedData, null, 2)}
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Refine with custom instruction (Optional):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Make it more focused on local manufacturers in Punjab"
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={loading}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Retry
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleConfirmApply}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
              >
                <Check size={14} /> Apply to Form
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
