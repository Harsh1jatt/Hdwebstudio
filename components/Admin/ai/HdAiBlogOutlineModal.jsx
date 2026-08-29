"use client";

import { useState } from "react";
import {
  ListTree,
  Loader2,
  X,
  Sparkles,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function HdAiBlogOutlineModal({
  isOpen,
  onClose,
  onApplyArticle,
  initialTopic = "",
}) {
  const [topic, setTopic] = useState(initialTopic);
  const [focusKeyword, setFocusKeyword] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [instructions, setInstructions] = useState("");

  const [step, setStep] = useState("input"); // "input" | "outline" | "generating_full"
  const [loading, setLoading] = useState(false);
  const [outline, setOutline] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleGenerateOutline() {
    if (!topic.trim()) {
      setError("Please enter a blog topic.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "generate_blog_outline",
          input: {
            topic: topic.trim(),
            focusKeyword: focusKeyword.trim(),
            targetAudience: targetAudience.trim(),
            specialInstructions: instructions.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate outline.");
      }

      setOutline(data.outline);
      setStep("outline");
    } catch (err) {
      setError(err.message || "Outline generation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateFullArticle() {
    if (!outline) return;

    setLoading(true);
    setStep("generating_full");
    setError("");

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "generate_blog_from_outline",
          input: {
            topic: outline.title || topic,
            outline,
            focusKeyword: outline.focusKeyword || focusKeyword || topic,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate full article from outline.");
      }

      if (onApplyArticle && data.content) {
        onApplyArticle(data.content);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Article generation failed.");
      setStep("outline");
    } finally {
      setLoading(false);
    }
  }

  function updateSectionHeading(idx, newHeading) {
    setOutline((prev) => {
      const next = { ...prev };
      next.sections[idx].heading = newHeading;
      return next;
    });
  }

  function removeSection(idx) {
    setOutline((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs">
            <ListTree size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Outline-First Blog Generator</h3>
            <p className="text-xs text-slate-500">Plan structure before writing to guarantee comprehensive depth.</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Step 1: Input Details */}
        {step === "input" && (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Blog Topic / Working Title *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How Much Does a Business Website Cost in India?"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Focus Keyword</label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g. website development cost india"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Small business owners, Startups"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Special Instructions (Optional)</label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Specific points to cover: e.g. breakdown CMS vs custom, explain ongoing maintenance..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-purple-500"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateOutline}
                disabled={loading || !topic.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition disabled:opacity-50"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                Generate Outline
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review & Edit Outline */}
        {step === "outline" && outline && (
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900">{outline.title}</span>
                <span className="ml-2 text-[11px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                  {outline.estimatedWordCount || "1200 - 1800 words"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleGenerateOutline}
                disabled={loading}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900"
              >
                <RefreshCw size={11} /> Regenerate Outline
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {outline.sections?.map((sec, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => updateSectionHeading(idx, e.target.value)}
                      className="flex-1 font-bold text-slate-900 bg-white rounded-lg border border-slate-200 px-2.5 py-1 text-xs outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {sec.keyPoints?.length > 0 && (
                    <ul className="mt-2 space-y-1 pl-4 text-slate-600 list-disc">
                      {sec.keyPoints.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setStep("input")}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                &larr; Back to Parameters
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleGenerateFullArticle}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition"
                >
                  <Sparkles size={13} />
                  Write Full Article from Outline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Full Generation in Progress */}
        {step === "generating_full" && (
          <div className="py-12 text-center space-y-3">
            <Loader2 size={32} className="animate-spin text-purple-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">Writing Full Article from Approved Outline</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Expanding all sections with concrete details, semantic HTML hierarchy, FAQs, and contextual internal
              links...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
