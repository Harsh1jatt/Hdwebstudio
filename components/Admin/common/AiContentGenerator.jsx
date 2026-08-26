"use client";

import { useState } from "react";
import { Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";

/**
 * AI Content Generator — generates structured content from a topic prompt.
 * Uses a built-in template engine (no external API key required).
 */
export default function AiContentGenerator({ onGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim() || prompt.trim().length < 5) {
      setError("Enter a topic (at least 5 characters).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), type: "blog" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Generation failed.");

      if (onGenerated && data.content) {
        onGenerated(data.content);
      }
      setPrompt("");
    } catch (err) {
      setError(err.message || "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">AI Content Generator</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-blue-600" />
        ) : (
          <ChevronDown className="h-4 w-4 text-blue-600" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3">
          <p className="text-xs text-blue-700">
            Enter a topic to generate structured blog content. The AI will create a title, excerpt, content, SEO metadata, and tags.
          </p>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleGenerate()}
            placeholder="e.g. Why every business needs a website in 2025"
            className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            disabled={loading}
          />

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Content
              </>
            )}
          </button>

          <p className="text-[11px] text-blue-600/70">
            Generated content is a starting point — review and customize before publishing.
          </p>
        </div>
      )}
    </div>
  );
}
