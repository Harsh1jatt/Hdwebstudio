"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Check,
  RefreshCw,
  Sliders,
  ShieldAlert,
  ListTree,
  Send,
} from "lucide-react";

const PROGRESS_STEPS = [
  "Understanding service & buyer search intent...",
  "Building content strategy & structure...",
  "Writing commercial copy & deliverables...",
  "Reviewing quality & eliminating clichés...",
  "Finalizing SEO metadata & schema...",
];

export default function HdAiAssistant({
  type = "service", // "service" | "blog" | "project"
  onGenerated,
  hasExistingContent = false,
  onOpenOutlineMode = null,
}) {
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [location, setLocation] = useState("");
  const [businessGoal, setBusinessGoal] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Collision Warning Modal
  const [pendingData, setPendingData] = useState(null);
  const [showCollisionModal, setShowCollisionModal] = useState(false);

  const meta = {
    service: {
      title: "HD AI Service Generator",
      badge: "HD AI Engine",
      placeholder: "e.g. Google Ads Management for Real Estate Developers",
      desc: "Enter a service name. HD AI analyzes buyer intent, crafts bespoke value propositions, deliverables, FAQs, and SEO.",
      task: "generate_service",
    },
    blog: {
      title: "HD AI Blog Strategist",
      badge: "HD AI Engine",
      placeholder: "e.g. How Much Does a Business Website Cost in India?",
      desc: "Enter a topic to generate an authoritative, in-depth article with FAQs, semantic headings, and internal linking.",
      task: "generate_blog",
    },
    project: {
      title: "HD AI Case Study Generator",
      badge: "HD AI Engine",
      placeholder: "e.g. Next.js Solar Energy Customer Portal",
      desc: "Generate a factual case study with architectural challenges, solutions, deliverables, and tech stack tags.",
      task: "generate_project",
    },
  }[type] || {
    title: "HD AI Content Generator",
    badge: "HD AI",
    placeholder: "Enter topic or title...",
    desc: "Generate structured content using central HD Web Studios AI engine.",
    task: "generate_service",
  };

  // Animate progress steps during generation
  useEffect(() => {
    let interval;
    if (loading) {
      setProgressIndex(0);
      interval = setInterval(() => {
        setProgressIndex((prev) => (prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  async function handleGenerate(force = false) {
    if (!topic.trim() || topic.trim().length < 3) {
      setError("Please enter a valid title or topic (at least 3 characters).");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        task: meta.task,
        input: {
          serviceName: topic.trim(),
          topic: topic.trim(),
          projectName: topic.trim(),
          targetAudience: targetAudience.trim(),
          location: location.trim(),
          businessGoal: businessGoal.trim(),
          specialInstructions: specialInstructions.trim(),
        },
      };

      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "AI generation failed. Please try again.");
      }

      const content = data.content;
      if (!content) {
        throw new Error("No structured content returned by AI engine.");
      }

      if (hasExistingContent && !force) {
        setPendingData(content);
        setShowCollisionModal(true);
      } else {
        applyGeneratedData(content);
      }
    } catch (err) {
      setError(err.message || "Failed to generate content.");
    } finally {
      setLoading(false);
    }
  }

  function applyGeneratedData(data, mergeOnly = false) {
    if (onGenerated) {
      onGenerated(data, mergeOnly);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }
    setShowCollisionModal(false);
    setPendingData(null);
  }

  return (
    <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-4 sm:p-5 shadow-xs transition">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex flex-1 items-center justify-between text-left focus:outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{meta.title}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  {meta.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{meta.desc}</p>
            </div>
          </div>
          <div className="ml-2 flex items-center gap-2">
            {expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </div>
        </button>
      </div>

      {/* Expanded Generator Form */}
      {expanded && (
        <div className="mt-4 space-y-3.5 border-t border-blue-100/80 pt-3.5">
          {/* Main Topic Input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleGenerate()}
              placeholder={meta.placeholder}
              disabled={loading}
              className="flex-1 rounded-xl border border-blue-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`inline-flex items-center gap-1 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                  showAdvanced
                    ? "border-blue-300 bg-blue-100 text-blue-800"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
                title="Target Audience, Location, Instructions"
              >
                <Sliders size={13} /> Options
              </button>

              {type === "blog" && onOpenOutlineMode && (
                <button
                  type="button"
                  onClick={onOpenOutlineMode}
                  disabled={loading}
                  className="inline-flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 px-3 py-2.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition"
                  title="Outline-First Generation"
                >
                  <ListTree size={13} /> Outline Mode
                </button>
              )}

              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={loading || !topic.trim()}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate with HD AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Advanced / Specific Controls */}
          {showAdvanced && (
            <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-blue-100 bg-white/80 p-3 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-slate-700">Target Audience (Optional)</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Small business owners, Manufacturers in Punjab"
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700">Target Geo / Location (Optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ludhiana, Punjab, India & Remote"
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {type === "service" && (
                <div className="sm:col-span-2">
                  <label className="mb-1 block font-semibold text-slate-700">Commercial Goal (Optional)</label>
                  <input
                    type="text"
                    value={businessGoal}
                    onChange={(e) => setBusinessGoal(e.target.value)}
                    placeholder="e.g. High-trust inquiries, direct phone calls, WhatsApp leads"
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="mb-1 block font-semibold text-slate-700">Detailed Instructions / Brief (Optional)</label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Paste any detailed client brief or specific requirements. The engine will preserve all key instructions."
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Loading Multi-Step Progress Indicator */}
          {loading && (
            <div className="flex items-center gap-2.5 rounded-xl bg-blue-100/70 p-3 text-xs text-blue-900 border border-blue-200/80">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
              <span className="font-semibold">{PROGRESS_STEPS[progressIndex]}</span>
            </div>
          )}

          {/* Error Notice */}
          {error && (
            <div className="flex items-center justify-between rounded-xl bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                {error}
              </span>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="inline-flex items-center gap-1 font-bold text-red-700 hover:underline"
              >
                <RefreshCw size={11} /> Retry
              </button>
            </div>
          )}

          {/* Success Notice */}
          {success && (
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check size={13} /> Content generated successfully and populated into form fields below.
            </p>
          )}
        </div>
      )}

      {/* Collision Warning Modal */}
      {showCollisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Existing Content Detected</h4>
                <p className="text-xs text-slate-500">This form already contains written information.</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-600 leading-relaxed">
              Generating new content will replace existing text. How would you like HD AI to apply the generated
              content?
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => applyGeneratedData(pendingData, false)}
                className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
              >
                Replace All Fields with HD AI Output
              </button>
              <button
                type="button"
                onClick={() => applyGeneratedData(pendingData, true)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Fill Only Empty Fields (Keep Existing Text)
              </button>
              <button
                type="button"
                onClick={() => setShowCollisionModal(false)}
                className="w-full rounded-xl border border-transparent px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
