"use client";

import { useState } from "react";
import { Sparkles, Loader2, ChevronDown, ChevronUp, AlertCircle, Check, RefreshCw } from "lucide-react";

/**
 * AI Content Generator — generates structured content for Blogs, Services, or Projects.
 * Includes timeout handling, retry mechanism, and safe schema mapping.
 */
export default function AiContentGenerator({ onGenerated, type = "blog" }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const typeLabels = {
    blog: {
      title: "AI Blog Generator",
      placeholder: "e.g. How much does a business website cost in Punjab?",
      desc: "Enter a topic to generate a comprehensive, SEO-friendly article with FAQs, tags, and metadata.",
    },
    service: {
      title: "AI Service Generator",
      placeholder: "e.g. Business Website Development for Local Manufacturers",
      desc: "Enter a service name to generate hero copy, deliverables, FAQs, and schema metadata.",
    },
    project: {
      title: "AI Project / Case Study Generator",
      placeholder: "e.g. Next.js Solar Energy Customer Portal in Ludhiana",
      desc: "Enter a project name to generate challenge, solution, deliverables, and tech stack tags.",
    },
  };

  const currentMeta = typeLabels[type] || typeLabels.blog;

  async function handleGenerate() {
    if (!prompt.trim() || prompt.trim().length < 3) {
      setError("Please enter a topic (at least 3 characters).");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const res = await fetch("/api/admin/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), type }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.error || "AI generation failed. Please try again.");
      }

      if (onGenerated && data.content) {
        onGenerated(data.content);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err.message || "Failed to generate content.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-4 sm:p-5 shadow-xs">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left focus:outline-hidden"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900">{currentMeta.title}</span>
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
              HD AI
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-blue-100 pt-3">
          <p className="text-xs text-slate-600">
            {currentMeta.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleGenerate()}
              placeholder={currentMeta.placeholder}
              className="flex-1 rounded-xl border border-blue-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Generating...
                </>
              ) : success ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Form Filled!
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  Auto-Fill Form
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-center justify-between rounded-xl bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                {error}
              </span>
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-1 font-bold text-red-700 hover:underline"
              >
                <RefreshCw size={11} /> Retry
              </button>
            </div>
          )}

          {success && (
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check size={13} /> Content generated and populated into form fields below.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
