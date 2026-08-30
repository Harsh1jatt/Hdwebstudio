"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import { slugify } from "@/lib/slugify";
import { availableIconNames } from "@/lib/icons";

const accentOptions = ["blue", "emerald", "purple", "orange"];

const emptyService = {
  slug: "",
  icon: "Globe",
  eyebrow: "",
  title: "",
  tagline: "",
  shortDescription: "",
  description: "",
  category: "",
  accent: "blue",
  order: 0,
  published: true,
  heroStats: [],
  overview: {
    heading: "",
    paragraphs: [""],
    highlights: [],
  },
  whatYouGet: [],
  faq: [],
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
};

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-[13px] font-semibold text-slate-700">
      {children}
    </label>
  );
}

function TextArea({ id, value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function ServiceForm({
  initialData = null,
  mode = "create",
  onSubmit,
  submitting = false,
  error = "",
  success = "",
}) {
  const [form, setForm] = useState(initialData || emptyService);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyService,
        ...initialData,
        overview: {
          heading: initialData.overview?.heading || "",
          paragraphs:
            initialData.overview?.paragraphs?.length > 0
              ? initialData.overview.paragraphs
              : [""],
          highlights: initialData.overview?.highlights || [],
        },
        heroStats: initialData.heroStats || [],
        whatYouGet: initialData.whatYouGet || [],
        faq: initialData.faq || [],
      });
      setSlugTouched(true);
    }
  }, [initialData]);

  function updateField(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "eyebrow" && !slugTouched) {
        next.slug = slugify(value);
      }

      return next;
    });
  }

  function updateOverview(key, value) {
    setForm((prev) => ({
      ...prev,
      overview: { ...prev.overview, [key]: value },
    }));
  }

  function updateArrayItem(arrayKey, index, itemKey, value) {
    setForm((prev) => {
      const items = [...prev[arrayKey]];
      items[index] = { ...items[index], [itemKey]: value };
      return { ...prev, [arrayKey]: items };
    });
  }

  function addArrayItem(arrayKey, template) {
    setForm((prev) => ({
      ...prev,
      [arrayKey]: [...prev[arrayKey], template],
    }));
  }

  function removeArrayItem(arrayKey, index) {
    setForm((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((_, i) => i !== index),
    }));
  }

  function updateParagraph(index, value) {
    setForm((prev) => {
      const paragraphs = [...prev.overview.paragraphs];
      paragraphs[index] = value;
      return {
        ...prev,
        overview: { ...prev.overview, paragraphs },
      };
    });
  }

  function addParagraph() {
    setForm((prev) => ({
      ...prev,
      overview: {
        ...prev.overview,
        paragraphs: [...prev.overview.paragraphs, ""],
      },
    }));
  }

  function validateForm() {
    const errors = {};

    if (!form.eyebrow?.trim()) errors.eyebrow = "Eyebrow is required";
    if (!form.title?.trim()) errors.title = "Title is required";
    if (!form.tagline?.trim()) errors.tagline = "Tagline is required";
    if (!form.description?.trim()) errors.description = "Description is required";
    if (!form.slug?.trim()) errors.slug = "Slug is required";
    if (!form.overview?.heading?.trim()) {
      errors.overviewHeading = "Overview heading is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...form,
      slug: slugify(form.slug),
      overview: {
        ...form.overview,
        paragraphs: form.overview.paragraphs.filter((p) => p.trim()),
      },
    };

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      {/* Basic information */}
      <Section
        title="Basic information"
        description="Core service identity shown on listings and the hero section."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            id="eyebrow"
            label="Eyebrow / display name"
            value={form.eyebrow}
            onChange={(e) => updateField("eyebrow", e.target.value)}
            error={fieldErrors.eyebrow}
          />
          <AdminInput
            id="slug"
            label="Slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", slugify(e.target.value));
            }}
            helperText="Used in the URL: /services/your-slug"
            error={fieldErrors.slug}
          />
        </div>

        <AdminInput
          id="title"
          label="Hero title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          error={fieldErrors.title}
        />

        <AdminInput
          id="tagline"
          label="Tagline"
          value={form.tagline}
          onChange={(e) => updateField("tagline", e.target.value)}
          error={fieldErrors.tagline}
        />

        <div>
          <FieldLabel>Full description</FieldLabel>
          <TextArea
            id="description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
          />
          {fieldErrors.description ? (
            <p className="mt-2 text-xs font-medium text-red-600">
              {fieldErrors.description}
            </p>
          ) : null}
        </div>

        <AdminInput
          id="shortDescription"
          label="Short description"
          value={form.shortDescription}
          onChange={(e) => updateField("shortDescription", e.target.value)}
          helperText="Used in mega menu and cards when space is limited."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <FieldLabel>Icon</FieldLabel>
            <select
              value={form.icon}
              onChange={(e) => updateField("icon", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              {availableIconNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Accent color</FieldLabel>
            <select
              value={form.accent}
              onChange={(e) => updateField("accent", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              {accentOptions.map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </select>
          </div>

          <AdminInput
            id="category"
            label="Category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
        </div>
      </Section>

      {/* Hero stats */}
      <Section title="Hero stats" description="Optional quick stats shown in the hero.">
        {form.heroStats.map((stat, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]">
            <AdminInput
              id={`hero-label-${index}`}
              label="Label"
              value={stat.label}
              onChange={(e) =>
                updateArrayItem("heroStats", index, "label", e.target.value)
              }
            />
            <AdminInput
              id={`hero-value-${index}`}
              label="Value"
              value={stat.value}
              onChange={(e) =>
                updateArrayItem("heroStats", index, "value", e.target.value)
              }
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeArrayItem("heroStats", index)}
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("heroStats", { label: "", value: "" })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add hero stat
        </button>
      </Section>

      {/* Overview Section */}
      <Section
        title="Overview"
        description="Main overview narrative explaining the business problem and engineered solution."
      >
        <AdminInput
          id="overview-heading"
          label="Overview heading"
          value={form.overview.heading}
          onChange={(e) => updateOverview("heading", e.target.value)}
          error={fieldErrors.overviewHeading}
        />

        <div className="space-y-3">
          <FieldLabel>Overview paragraphs</FieldLabel>
          {form.overview.paragraphs.map((paragraph, index) => (
            <div key={index} className="space-y-1.5">
              <span className="text-xs text-slate-500 font-semibold">Paragraph {index + 1}</span>
              <div className="flex gap-2">
                <TextArea
                  id={`paragraph-${index}`}
                  value={paragraph}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      overview: {
                        ...prev.overview,
                        paragraphs: prev.overview.paragraphs.filter((_, i) => i !== index),
                      },
                    }))
                  }
                  className="shrink-0 rounded-lg border border-red-200 bg-white px-3 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addParagraph}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            <Plus className="h-4 w-4" />
            Add paragraph
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <FieldLabel>Overview highlights</FieldLabel>
          {form.overview.highlights.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-4">
              <div>
                <FieldLabel>Icon</FieldLabel>
                <select
                  value={item.icon}
                  onChange={(e) =>
                    setForm((prev) => {
                      const highlights = [...prev.overview.highlights];
                      highlights[index] = { ...highlights[index], icon: e.target.value };
                      return { ...prev, overview: { ...prev.overview, highlights } };
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  {availableIconNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <AdminInput
                id={`highlight-title-${index}`}
                label="Title"
                value={item.title}
                onChange={(e) =>
                  setForm((prev) => {
                    const highlights = [...prev.overview.highlights];
                    highlights[index] = { ...highlights[index], title: e.target.value };
                    return { ...prev, overview: { ...prev.overview, highlights } };
                  })
                }
              />
              <AdminInput
                id={`highlight-text-${index}`}
                label="Text"
                value={item.text}
                onChange={(e) =>
                  setForm((prev) => {
                    const highlights = [...prev.overview.highlights];
                    highlights[index] = { ...highlights[index], text: e.target.value };
                    return { ...prev, overview: { ...prev.overview, highlights } };
                  })
                }
              />
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      overview: {
                        ...prev.overview,
                        highlights: prev.overview.highlights.filter((_, i) => i !== index),
                      },
                    }))
                  }
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                overview: {
                  ...prev.overview,
                  highlights: [
                    ...prev.overview.highlights,
                    { icon: "Globe", title: "", text: "" },
                  ],
                },
              }))
            }
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            <Plus className="h-4 w-4" />
            Add highlight
          </button>
        </div>
      </Section>

      {/* What you get */}
      <Section
        title="What you get"
        description="Deliverables and concrete feature cards."
      >
        {form.whatYouGet.map((item, index) => (
          <div key={index} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-4">
            <div>
              <FieldLabel>Icon</FieldLabel>
              <select
                value={item.icon}
                onChange={(e) =>
                  updateArrayItem("whatYouGet", index, "icon", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                {availableIconNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <AdminInput
              id={`wyg-title-${index}`}
              label="Title"
              value={item.title}
              onChange={(e) =>
                updateArrayItem("whatYouGet", index, "title", e.target.value)
              }
            />
            <AdminInput
              id={`wyg-text-${index}`}
              label="Text"
              value={item.text}
              onChange={(e) =>
                updateArrayItem("whatYouGet", index, "text", e.target.value)
              }
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeArrayItem("whatYouGet", index)}
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem("whatYouGet", { icon: "Globe", title: "", text: "" })
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add item
        </button>
      </Section>

      {/* FAQs */}
      <Section
        title="FAQs"
        description="Service-specific frequently asked questions."
      >
        {form.faq.map((item, index) => (
          <div key={index} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <AdminInput
              id={`faq-q-${index}`}
              label="Question"
              value={item.q}
              onChange={(e) => updateArrayItem("faq", index, "q", e.target.value)}
            />
            <div>
              <FieldLabel>Answer</FieldLabel>
              <TextArea
                id={`faq-a-${index}`}
                value={item.a}
                onChange={(e) => updateArrayItem("faq", index, "a", e.target.value)}
                rows={3}
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem("faq", index)}
              className="inline-flex items-center gap-2 text-sm text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Remove FAQ
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("faq", { q: "", a: "" })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </Section>

      {/* Publishing */}
      <Section title="Publishing" description="Control visibility and sort order on the website.">
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
          <div className="flex items-center gap-3 pt-8">
            <input
              id="published"
              type="checkbox"
              checked={form.published}
              onChange={(e) => updateField("published", e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <label htmlFor="published" className="text-sm font-medium text-slate-700">
              Published (visible on public website)
            </label>
          </div>
        </div>
      </Section>

      {/* SEO Section */}
      <Section
        title="SEO"
        description="Search engine and social sharing metadata."
      >
        <AdminInput
          id="seoTitle"
          label="SEO title"
          value={form.seoTitle}
          onChange={(e) => updateField("seoTitle", e.target.value)}
        />
        <div>
          <FieldLabel htmlFor="seoDescription">SEO description</FieldLabel>
          <TextArea
            id="seoDescription"
            value={form.seoDescription}
            onChange={(e) => updateField("seoDescription", e.target.value)}
            rows={3}
          />
        </div>
        <MediaPicker
          label="OG image"
          value={form.ogImage}
          onChange={(url) => updateField("ogImage", url)}
        />
      </Section>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-5">
        <Link
          href="/admin/services"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <AdminButton type="submit" loading={submitting} loadingText="Saving...">
          {mode === "create" ? "Create service" : "Save changes"}
        </AdminButton>
      </div>
    </form>
  );
}
