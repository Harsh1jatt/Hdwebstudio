"use client";

import { useState } from "react";
import Link from "next/link";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import HdAiContentImprover from "@/components/Admin/ai/HdAiContentImprover";
import { Sparkles, Loader2 } from "lucide-react";

const defaults = {
  question: "",
  answer: "",
  category: "",
  published: true,
  featured: false,
  order: 0,
};

function FieldLabel({ children }) {
  return <label className="mb-2 block text-[13px] font-semibold text-slate-700">{children}</label>;
}

function Section({ title, description, action = null, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function FAQForm({ initialData = {}, onSubmit, loading, error }) {
  const [form, setForm] = useState({ ...defaults, ...initialData });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  async function handleGenerateAnswer() {
    if (!form.question?.trim()) {
      setAiError("Enter a question first to generate an answer.");
      return;
    }

    setAiLoading(true);
    setAiError("");

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "generate_faq",
          input: {
            topic: form.question,
            contextType: form.category || "General",
            count: 1,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to generate FAQ answer.");

      const generated = Array.isArray(data.faqs) ? data.faqs[0] : data.faqs;
      if (generated?.a) {
        updateField("answer", generated.a);
      }
    } catch (err) {
      setAiError(err.message || "Generation failed.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}
      {aiError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{aiError}</div>
      ) : null}

      <Section
        title="FAQ content"
        description="The question and answer pair."
        action={
          <button
            type="button"
            onClick={handleGenerateAnswer}
            disabled={aiLoading || !form.question?.trim()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition disabled:opacity-40"
          >
            {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            Generate Answer with HD AI
          </button>
        }
      >
        <div>
          <FieldLabel>Question</FieldLabel>
          <textarea
            id="question"
            value={form.question}
            onChange={(e) => updateField("question", e.target.value)}
            rows={2}
            placeholder="e.g. How long does it take to develop a custom Next.js website?"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Answer</FieldLabel>
            <HdAiContentImprover
              text={form.answer}
              context={`FAQ: ${form.question}`}
              onApply={(improved) => updateField("answer", improved)}
            />
          </div>
          <textarea
            id="answer"
            value={form.answer}
            onChange={(e) => updateField("answer", e.target.value)}
            rows={5}
            placeholder="Direct, practical, and transparent answer..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
        <AdminInput
          id="category"
          label="Category"
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          helperText="Group related FAQs together (e.g. Web Development, Pricing, Local SEO)."
        />
      </Section>

      <Section title="Publishing" description="Control visibility and sort order.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            id="order"
            label="Sort order"
            type="number"
            min="0"
            value={form.order}
            onChange={(e) => updateField("order", Number(e.target.value) || 0)}
            helperText="Lower numbers appear first."
          />
          <div className="flex flex-col gap-3 pt-8">
            <div className="flex items-center gap-3">
              <input
                id="published"
                type="checkbox"
                checked={form.published}
                onChange={(e) => updateField("published", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              <label htmlFor="published" className="text-sm font-medium text-slate-700">
                Published
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                Featured
              </label>
            </div>
          </div>
        </div>
      </Section>

      <div className="flex flex-wrap items-center gap-3">
        <AdminButton type="submit" loading={loading} loadingText="Saving...">
          {initialData._id || initialData.id ? "Save changes" : "Create FAQ"}
        </AdminButton>
        <Link
          href="/admin/faqs"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
