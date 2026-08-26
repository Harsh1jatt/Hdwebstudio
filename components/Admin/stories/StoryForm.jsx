"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowDown, Copy, Plus, Save, Trash2 } from "lucide-react";

import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import { slugify } from "@/lib/slugify";

const emptySlide = {
  heading: "",
  body: "",
  image: "",
  imageAlt: "",
  backgroundColor: "#0f172a",
  textColor: "#ffffff",
  ctaText: "",
  ctaUrl: "",
};

const emptyStory = {
  title: "",
  slug: "",
  description: "",
  publisher: "HD Web Studios",
  publisherLogo: "",
  posterImage: "",
  posterImageAlt: "",
  category: "",
  tags: [],
  status: "draft",
  slides: [{ ...emptySlide }],
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
  canonicalUrl: "",
  noindex: false,
};

function SlideEditor({ slide, index, total, onUpdate, onRemove, onMoveUp, onMoveDown, onDuplicate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-900"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{index + 1}</span>
          {slide.heading || `Slide ${index + 1}`}
        </button>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onMoveUp} disabled={index === 0} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30" title="Move up"><ArrowUp className="h-4 w-4" /></button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30" title="Move down"><ArrowDown className="h-4 w-4" /></button>
          <button type="button" onClick={onDuplicate} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Duplicate"><Copy className="h-4 w-4" /></button>
          {total > 1 && (
            <button type="button" onClick={onRemove} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600" title="Remove"><Trash2 className="h-4 w-4" /></button>
          )}
        </div>
      </div>

      {!collapsed && (
        <div className="space-y-4 p-4">
          <AdminInput id={`slide-heading-${index}`} label="Heading" value={slide.heading} onChange={(e) => onUpdate("heading", e.target.value)} placeholder="Slide heading" />
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">Body text</label>
            <textarea
              value={slide.body}
              onChange={(e) => onUpdate("body", e.target.value)}
              rows={3}
              placeholder="Slide body text"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <MediaPicker label="Background/image" value={slide.image} onChange={(url) => onUpdate("image", url)} />
          <AdminInput id={`slide-imageAlt-${index}`} label="Image alt text" value={slide.imageAlt} onChange={(e) => onUpdate("imageAlt", e.target.value)} placeholder="Describe the image for accessibility" />

          <div className="grid grid-cols-2 gap-4">
            <AdminInput id={`slide-bg-${index}`} label="Background color" value={slide.backgroundColor} onChange={(e) => onUpdate("backgroundColor", e.target.value)} placeholder="#0f172a" />
            <AdminInput id={`slide-text-${index}`} label="Text color" value={slide.textColor} onChange={(e) => onUpdate("textColor", e.target.value)} placeholder="#ffffff" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AdminInput id={`slide-cta-${index}`} label="CTA text (optional)" value={slide.ctaText} onChange={(e) => onUpdate("ctaText", e.target.value)} placeholder="Learn more" />
            <AdminInput id={`slide-ctaUrl-${index}`} label="CTA URL (optional)" value={slide.ctaUrl} onChange={(e) => onUpdate("ctaUrl", e.target.value)} placeholder="https://..." />
          </div>

          {slide.image && (
            <div className="relative aspect-[9/16] w-full max-w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.image} alt={slide.imageAlt || "Slide preview"} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center" style={{ backgroundColor: slide.backgroundColor + "cc", color: slide.textColor }}>
                {slide.heading && <p className="text-xs font-bold leading-tight">{slide.heading}</p>}
                {slide.body && <p className="mt-1 text-[10px] leading-tight opacity-90">{slide.body}</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function StoryForm({ initialData, storyId, mode = "create", onSubmit }) {
  const [form, setForm] = useState({ ...emptyStory, ...initialData, slides: initialData?.slides?.length ? initialData.slides : [{ ...emptySlide }] });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const tagsCsv = (form.tags || []).join(", ");

  useEffect(() => {
    if (!initialData) return;
    setForm({
      ...emptyStory,
      ...initialData,
      slides: initialData.slides?.length ? initialData.slides : [{ ...emptySlide }],
      tags: Array.isArray(initialData.tags) ? initialData.tags : [],
    });
  }, [initialData]);

  function updateField(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  function updateSlide(index, field, value) {
    setForm((prev) => {
      const slides = [...prev.slides];
      slides[index] = { ...slides[index], [field]: value };
      return { ...prev, slides };
    });
  }

  function addSlide() {
    setForm((prev) => ({ ...prev, slides: [...prev.slides, { ...emptySlide }] }));
  }

  function removeSlide(index) {
    setForm((prev) => ({ ...prev, slides: prev.slides.filter((_, i) => i !== index) }));
  }

  function moveSlide(from, to) {
    setForm((prev) => {
      const slides = [...prev.slides];
      const [item] = slides.splice(from, 1);
      slides.splice(to, 0, item);
      return { ...prev, slides };
    });
  }

  function duplicateSlide(index) {
    setForm((prev) => {
      const slides = [...prev.slides];
      slides.splice(index + 1, 0, { ...slides[index] });
      return { ...prev, slides };
    });
  }

  async function handleSubmit(event, statusOverride) {
    event?.preventDefault?.();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        slug: slugify(form.slug || form.title),
        status: statusOverride || form.status,
        tags: (form.tags || []).map((t) => t.trim()).filter(Boolean),
      };
      await onSubmit(payload);
      setSuccess(mode === "create" ? "Story created." : "Story updated.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* Story Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-900">Story details</h3>
            <p className="mt-1 text-sm text-slate-500">Title, URL, and basic information.</p>
            <div className="mt-4 space-y-4">
              <AdminInput id="title" label="Title" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
              <AdminInput id="slug" label="Slug" value={form.slug} onChange={(e) => { setSlugTouched(true); updateField("slug", e.target.value); }} helperText="/stories/your-slug" />
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">Description</label>
                <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={2} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="Brief description for social sharing" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput id="category" label="Category" value={form.category} onChange={(e) => updateField("category", e.target.value)} placeholder="e.g. Web Design" />
                <AdminInput id="tags" label="Tags (comma-separated)" value={tagsCsv} onChange={(e) => updateField("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
              </div>
            </div>
          </section>

          {/* Poster & Publisher */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-900">Poster & Publisher</h3>
            <p className="mt-1 text-sm text-slate-500">Required for Google Web Stories.</p>
            <div className="mt-4 space-y-4">
              <MediaPicker label="Poster image (required — 9:16 portrait)" value={form.posterImage} onChange={(url) => updateField("posterImage", url)} />
              <AdminInput id="posterImageAlt" label="Poster image alt text" value={form.posterImageAlt} onChange={(e) => updateField("posterImageAlt", e.target.value)} />
              <AdminInput id="publisher" label="Publisher name" value={form.publisher} onChange={(e) => updateField("publisher", e.target.value)} />
              <MediaPicker label="Publisher logo (square, min 96×96)" value={form.publisherLogo} onChange={(url) => updateField("publisherLogo", url)} />
            </div>
          </section>

          {/* Slides */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Slides</h3>
                <p className="mt-1 text-sm text-slate-500">{form.slides.length} slide{form.slides.length !== 1 ? "s" : ""}</p>
              </div>
              <AdminButton type="button" onClick={addSlide}>
                <Plus className="h-4 w-4" /> Add slide
              </AdminButton>
            </div>
            <div className="space-y-4">
              {form.slides.map((slide, index) => (
                <SlideEditor
                  key={index}
                  slide={slide}
                  index={index}
                  total={form.slides.length}
                  onUpdate={(field, value) => updateSlide(index, field, value)}
                  onRemove={() => removeSlide(index)}
                  onMoveUp={() => index > 0 && moveSlide(index, index - 1)}
                  onMoveDown={() => index < form.slides.length - 1 && moveSlide(index, index + 1)}
                  onDuplicate={() => duplicateSlide(index)}
                />
              ))}
            </div>
          </section>

          {/* SEO */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-900">SEO</h3>
            <p className="mt-1 text-sm text-slate-500">Search engine optimization settings.</p>
            <div className="mt-4 space-y-4">
              <AdminInput id="seoTitle" label={`SEO title (${(form.seoTitle || form.title || "").length} chars)`} value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} helperText="Recommended 30–60 characters" />
              <AdminInput id="seoDescription" label={`Meta description (${(form.seoDescription || "").length} chars)`} value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} helperText="Recommended 120–160 characters" />
              <div className="grid gap-4 md:grid-cols-2">
                <MediaPicker label="OG image" value={form.ogImage} onChange={(url) => updateField("ogImage", url)} />
                <div className="flex items-end">
                  <label className="flex items-center gap-2.5 text-sm text-slate-700">
                    <input type="checkbox" checked={form.noindex} onChange={(e) => updateField("noindex", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                    Noindex (hide from search engines)
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <label className="mb-2 block text-[13px] font-semibold text-slate-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <div className="mt-4 space-y-2">
              <AdminButton type="button" className="w-full" loading={submitting} onClick={(e) => handleSubmit(e, "draft")}>
                <Save className="h-4 w-4" /> Save draft
              </AdminButton>
              <AdminButton type="button" className="w-full" loading={submitting} onClick={(e) => handleSubmit(e, "published")}>
                Publish
              </AdminButton>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h4 className="text-[13px] font-semibold text-slate-700">Story Checklist</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">{form.title ? "✅" : "⚠️"} Title</li>
              <li className="flex items-center gap-2">{form.posterImage ? "✅" : "⚠️"} Poster image</li>
              <li className="flex items-center gap-2">{form.slides.length >= 3 ? "✅" : "⚠️"} At least 3 slides ({form.slides.length})</li>
              <li className="flex items-center gap-2">{form.description ? "✅" : "⚠️"} Description</li>
              <li className="flex items-center gap-2">{form.seoTitle || form.title ? "✅" : "⚠️"} SEO title</li>
              <li className="flex items-center gap-2">{form.seoDescription ? "✅" : "⚠️"} Meta description</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
            <p>Web Stories appear in Google Discover and require a poster image (9:16 portrait, recommended 1080×1920).</p>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
        <AdminButton type="submit" loading={submitting} loadingText="Saving...">Save changes</AdminButton>
        <Link href="/admin/stories" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</Link>
      </div>
    </form>
  );
}
