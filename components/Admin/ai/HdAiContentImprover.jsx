"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Wand2,
  Check,
  X,
  RefreshCw,
  Copy,
  UserCheck,
  FileEdit,
  Eye,
  TrendingUp,
  Flame,
  Minimize2,
  Maximize2,
  SpellCheck,
} from "lucide-react";

const IMPROVE_OPTIONS = [
  { id: "make_human", label: "Make More Human", desc: "Strip AI clichés & add authentic voice", icon: UserCheck },
  { id: "rewrite", label: "Rewrite Fresh Copy", desc: "Complete rephrasing preserving facts", icon: FileEdit },
  { id: "clarity", label: "Improve Clarity", desc: "Simplify sentences & enhance scannability", icon: Eye },
  { id: "seo", label: "Improve SEO & Intent", desc: "Naturally enhance search & entity signals", icon: TrendingUp },
  { id: "persuasive", label: "Make More Persuasive", desc: "Sharpen commercial benefits & CTA", icon: Flame },
  { id: "shorten", label: "Make Concise", desc: "Trim fluff by 35-50%", icon: Minimize2 },
  { id: "expand", label: "Expand in Detail", desc: "Add practical depth and examples", icon: Maximize2 },
  { id: "grammar", label: "Fix Grammar", desc: "Polish phrasing, syntax, and punctuation", icon: SpellCheck },
];

export default function HdAiContentImprover({
  text = "",
  onApply,
  context = "",
  label = "Improve with HD AI",
}) {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("make_human");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [improvedText, setImprovedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function handleImprove(actionToUse) {
    const act = actionToUse || selectedAction;
    if (!text?.trim()) {
      setError("Please ensure the field contains text to improve.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "improve_content",
          input: {
            text,
            action: act,
            context,
            instructions: instructions.trim(),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to improve content.");
      }

      setImprovedText(data.improved);
    } catch (err) {
      setError(err.message || "Improvement failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
    setImprovedText("");
    setError("");
    if (text?.trim()) {
      handleImprove("make_human");
    }
  }

  function handleApply() {
    if (onApply && improvedText) {
      onApply(improvedText);
    }
    setOpen(false);
  }

  function handleCopy() {
    if (improvedText) {
      navigator.clipboard.writeText(improvedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        disabled={!text?.trim()}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
        title="Improve text with HD AI"
      >
        <Wand2 size={11} className="text-blue-600" />
        <span>{label}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">HD AI Content Improver</h3>
                <p className="text-xs text-slate-500">Transform copy into human, commercial, and high-impact writing.</p>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="mt-4 flex flex-wrap gap-1.5 border-y border-slate-100 py-3">
              {IMPROVE_OPTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSelectedAction(id);
                    handleImprove(id);
                  }}
                  disabled={loading}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    selectedAction === id
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>

            {/* Side-by-side comparison */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Original Content
                </span>
                <div className="h-56 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap font-sans">
                  {text}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    HD AI Improved Result
                  </span>
                  {improvedText && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-900"
                    >
                      {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>

                <div className="relative h-56 overflow-y-auto rounded-xl border border-blue-200 bg-blue-50/30 p-3.5 text-xs leading-relaxed text-slate-900 whitespace-pre-wrap font-sans">
                  {loading ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                      <Loader2 size={18} className="animate-spin text-blue-600" />
                      <span>Applying {selectedAction.replace(/_/g, " ")} transformation...</span>
                    </div>
                  ) : error ? (
                    <div className="text-red-600">{error}</div>
                  ) : improvedText ? (
                    improvedText
                  ) : (
                    <span className="text-slate-400 italic">Select an improvement option above...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Optional Instruction Bar */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleImprove(selectedAction)}
                placeholder="Optional instruction: e.g. Emphasize Next.js sub-second speed and local SEO in Ludhiana"
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleImprove(selectedAction)}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                Rerun
              </button>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!improvedText || loading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Check size={14} /> Replace with Improved Text
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
