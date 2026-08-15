"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import { slugify } from "@/lib/slugify";

const defaults = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  discountPrice: "",
  currency: "$",
  billingPeriod: "one-time",
  features: [""],
  highlighted: false,
  badge: "",
  icon: "",
  note: "",
  ctaText: "Get Started",
  ctaUrl: "",
  order: 0,
  published: true,
};

function FieldLabel({ children }) {
  return <label className="mb-2 block text-[13px] font-semibold text-slate-700">{children}</label>;
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function PricingForm({ initialData = {}, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    ...defaults,
    ...initialData,
    features: initialData.features?.length ? initialData.features : [""],
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  function updateField(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  function updateFeature(index, value) {
    setForm((prev) => {
      const features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  }

  function addFeature() {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  }

  function removeFeature(index) {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      slug: slugify(form.slug || form.name),
      features: form.features.filter((f) => f.trim()),
      price: Number(form.price) || 0,
      discountPrice: form.discountPrice !== "" ? Number(form.discountPrice) : undefined,
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      <Section title="Basic information" description="Core plan identity.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="name" label="Plan name" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          <AdminInput
            id="slug"
            label="Slug"
            value={form.slug}
            onChange={(e) => { setSlugTouched(true); updateField("slug", slugify(e.target.value)); }}
            helperText="Used in URLs and identifiers."
          />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="badge" label="Badge text" value={form.badge} onChange={(e) => updateField("badge", e.target.value)} helperText='e.g. "Most Popular"' />
          <AdminInput id="icon" label="Icon name" value={form.icon} onChange={(e) => updateField("icon", e.target.value)} />
        </div>
      </Section>

      <Section title="Pricing" description="Price and billing details.">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput id="price" label="Price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => updateField("price", e.target.value)} />
          <AdminInput id="discountPrice" label="Discount price" type="number" min="0" step="0.01" value={form.discountPrice} onChange={(e) => updateField("discountPrice", e.target.value)} helperText="Leave empty for no discount." />
          <AdminInput id="currency" label="Currency symbol" value={form.currency} onChange={(e) => updateField("currency", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Billing period</FieldLabel>
          <select
            value={form.billingPeriod}
            onChange={(e) => updateField("billingPeriod", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 md:max-w-xs"
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="per-project">Per project</option>
          </select>
        </div>
      </Section>

      <Section title="Features" description="List of features included in this plan.">
        {form.features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <AdminInput
              id={`feature-${index}`}
              label={`Feature ${index + 1}`}
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addFeature} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          <Plus className="h-4 w-4" />
          Add feature
        </button>
      </Section>

      <Section title="Call to action" description="Button text and link.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="ctaText" label="CTA text" value={form.ctaText} onChange={(e) => updateField("ctaText", e.target.value)} />
          <AdminInput id="ctaUrl" label="CTA URL" value={form.ctaUrl} onChange={(e) => updateField("ctaUrl", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Note</FieldLabel>
          <textarea
            id="note"
            value={form.note}
            onChange={(e) => updateField("note", e.target.value)}
            rows={2}
            placeholder="Optional note shown below the plan"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </Section>

      <Section title="Publishing" description="Control visibility and sort order.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="order" label="Sort order" type="number" min="0" value={form.order} onChange={(e) => updateField("order", Number(e.target.value) || 0)} helperText="Lower numbers appear first." />
          <div className="flex flex-col gap-3 pt-8">
            <div className="flex items-center gap-3">
              <input id="published" type="checkbox" checked={form.published} onChange={(e) => updateField("published", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
              <label htmlFor="published" className="text-sm font-medium text-slate-700">Published</label>
            </div>
            <div className="flex items-center gap-3">
              <input id="highlighted" type="checkbox" checked={form.highlighted} onChange={(e) => updateField("highlighted", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
              <label htmlFor="highlighted" className="text-sm font-medium text-slate-700">Highlighted (recommended plan)</label>
            </div>
          </div>
        </div>
      </Section>

      <div className="flex flex-wrap items-center gap-3">
        <AdminButton type="submit" loading={loading} loadingText="Saving...">
          {initialData._id || initialData.id ? "Save changes" : "Create plan"}
        </AdminButton>
        <Link href="/admin/pricing" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</Link>
      </div>
    </form>
  );
}
