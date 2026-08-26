"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Eye, Layout, PenLine, Save } from "lucide-react";

import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import RichTextEditor from "@/components/Admin/blog/RichTextEditor";
import BlogSeoPanel from "@/components/Admin/blog/BlogSeoPanel";
import BlogPreview from "@/components/Admin/blog/BlogPreview";
import AiContentGenerator from "@/components/Admin/common/AiContentGenerator";
import { slugify } from "@/lib/slugify";

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  contentFormat: "html",
  featuredImage: "",
  featuredImageAlt: "",
  category: "",
  tags: [],
  author: "",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
  focusKeyword: "",
  secondaryKeywords: [],
};

function Section({ title, description, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function draftKey(postId) {
  return `hdws-blog-draft-${postId || "new"}`;
}

export default function PostForm({
  initialData,
  postId = null,
  mode = "create",
  onSubmit,
  submitting = false,
  error = "",
  success = "",
}) {
  const [form, setForm] = useState({ ...emptyPost, ...initialData });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const [viewMode, setViewMode] = useState("editor");
  const [dirty, setDirty] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState("");
  const [slugAvailable, setSlugAvailable] = useState(true);
  const originalSlug = useRef(initialData?.slug || "");
  const autosaveTimer = useRef(null);

  useEffect(() => {
    if (!initialData) return;
    setForm({
      ...emptyPost,
      ...initialData,
      contentFormat: initialData.contentFormat || "markdown",
      tags: Array.isArray(initialData.tags) ? initialData.tags : [],
      secondaryKeywords: Array.isArray(initialData.secondaryKeywords)
        ? initialData.secondaryKeywords
        : [],
    });
    originalSlug.current = initialData.slug || "";
    setSlugTouched(Boolean(initialData.slug));
  }, [initialData]);

  // Recover local draft if newer than server data
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(draftKey(postId));
      if (!saved) return;
      const draft = JSON.parse(saved);
      if (draft.savedAt && initialData?.updatedAt) {
        const draftTime = new Date(draft.savedAt).getTime();
        const serverTime = new Date(initialData.updatedAt).getTime();
        if (draftTime > serverTime) {
          setForm((prev) => ({ ...prev, ...draft.form }));
          setAutosaveStatus("Recovered unsaved local draft");
        }
      } else if (!initialData?.content && draft.form?.content) {
        setForm((prev) => ({ ...prev, ...draft.form }));
        setAutosaveStatus("Recovered local draft");
      }
    } catch {
      /* ignore */
    }
  }, [postId, initialData]);

  const tagsCsv = useMemo(() => (form.tags || []).join(", "), [form.tags]);
  const secondaryCsv = useMemo(
    () => (form.secondaryKeywords || []).join(", "),
    [form.secondaryKeywords]
  );

  const updateField = useCallback((key, value) => {
    setDirty(true);
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  }, [slugTouched]);

  // Autosave to localStorage (debounced)
  useEffect(() => {
    if (!dirty) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(
          draftKey(postId),
          JSON.stringify({ form, savedAt: new Date().toISOString() })
        );
        setAutosaveStatus("Draft saved locally");
      } catch {
        setAutosaveStatus("");
      }
    }, 2000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [form, dirty, postId]);

  // Warn on unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e) {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  // Slug availability check
  useEffect(() => {
    const slug = form.slug?.trim();
    if (!slug) {
      setSlugAvailable(true);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ checkSlug: slug });
        if (postId) params.set("excludeId", postId);
        const res = await fetch(`/api/admin/posts?${params}`);
        const data = await res.json();
        setSlugAvailable(data.available !== false);
      } catch {
        setSlugAvailable(true);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [form.slug, postId]);

  async function handleSubmit(event, statusOverride) {
    event?.preventDefault?.();
    const payload = {
      ...form,
      slug: slugify(form.slug),
      contentFormat: "html",
      tags: (form.tags || []).map((t) => t.trim()).filter(Boolean),
      secondaryKeywords: (form.secondaryKeywords || [])
        .map((t) => t.trim())
        .filter(Boolean),
      status: statusOverride || form.status,
    };
    await onSubmit(payload);
    setDirty(false);
    try {
      localStorage.removeItem(draftKey(postId));
    } catch {
      /* ignore */
    }
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
      {autosaveStatus ? (
        <p className="text-xs text-slate-400">{autosaveStatus}</p>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* AI Content Generator */}
          {!form.content && mode === "create" && (
            <AiContentGenerator
              onGenerated={(generated) => {
                setForm((prev) => ({
                  ...prev,
                  title: generated.title || prev.title,
                  slug: generated.slug || prev.slug,
                  excerpt: generated.excerpt || prev.excerpt,
                  content: generated.content || prev.content,
                  category: generated.category || prev.category,
                  tags: generated.tags || prev.tags,
                  seoTitle: generated.seoTitle || prev.seoTitle,
                  seoDescription: generated.seoDescription || prev.seoDescription,
                  focusKeyword: generated.focusKeyword || prev.focusKeyword,
                  author: generated.author || prev.author,
                }));
                setSlugTouched(true);
              }}
            />
          )}
          <Section title="Post details" description="Title, URL, category, and metadata.">
            <AdminInput
              id="title"
              label="Title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                id="slug"
                label="Slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  updateField("slug", e.target.value);
                }}
                helperText="/blog/your-slug"
                error={!slugAvailable ? "Slug already in use" : ""}
              />
              <AdminInput
                id="category"
                label="Category"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              />
              <AdminInput
                id="author"
                label="Author"
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
              />
              <AdminInput
                id="tags"
                label="Tags (comma-separated)"
                value={tagsCsv}
                onChange={(e) => {
                  updateField(
                    "tags",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  );
                }}
              />
            </div>
            <AdminInput
              id="excerpt"
              label="Excerpt"
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              helperText="Short summary for listings. Auto-generated if empty."
            />
            <div className="grid gap-4 md:grid-cols-2">
              <MediaPicker
                label="Featured image"
                value={form.featuredImage}
                onChange={(url) => updateField("featuredImage", url)}
              />
              <AdminInput
                id="featuredImageAlt"
                label="Featured image alt text"
                value={form.featuredImageAlt}
                onChange={(e) => updateField("featuredImageAlt", e.target.value)}
              />
            </div>
          </Section>

          <Section
            title="Content"
            description="Write with semantic headings. Post title is the page H1 — use H2+ in the body."
          >
            <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
              {[
                { id: "editor", label: "Editor", icon: PenLine },
                { id: "preview", label: "Preview", icon: Eye },
                { id: "split", label: "Split", icon: Layout },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setViewMode(id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    viewMode === id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            {viewMode === "editor" && (
              <RichTextEditor
                value={form.content}
                onChange={(html) => updateField("content", html)}
              />
            )}
            {viewMode === "preview" && <BlogPreview form={form} />}
            {viewMode === "split" && (
              <div className="grid gap-4 lg:grid-cols-2">
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => updateField("content", html)}
                />
                <BlogPreview form={form} />
              </div>
            )}
          </Section>

          <Section title="SEO metadata">
            <div className="grid gap-4">
              <AdminInput
                id="seoTitle"
                label={`SEO title (${(form.seoTitle || form.title || "").length} chars)`}
                value={form.seoTitle}
                onChange={(e) => updateField("seoTitle", e.target.value)}
                helperText="Recommended 30–60 characters"
              />
              <AdminInput
                id="seoDescription"
                label={`Meta description (${(form.seoDescription || "").length} chars)`}
                value={form.seoDescription}
                onChange={(e) => updateField("seoDescription", e.target.value)}
                helperText="Recommended 120–160 characters"
              />
              <AdminInput
                id="focusKeyword"
                label="Primary focus keyword"
                value={form.focusKeyword}
                onChange={(e) => updateField("focusKeyword", e.target.value)}
              />
              <AdminInput
                id="secondaryKeywords"
                label="Secondary keywords (comma-separated)"
                value={secondaryCsv}
                onChange={(e) => {
                  updateField(
                    "secondaryKeywords",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  );
                }}
              />
              <MediaPicker
                label="OG image (social sharing)"
                value={form.ogImage}
                onChange={(url) => updateField("ogImage", url)}
              />
            </div>
          </Section>
        </div>

        <aside className="space-y-3 xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="mt-3 space-y-2">
              <AdminButton
                type="button"
                className="w-full"
                loading={submitting}
                onClick={(e) => handleSubmit(e, "draft")}
              >
                <Save className="h-4 w-4" /> Save draft
              </AdminButton>
              <AdminButton
                type="button"
                className="w-full"
                loading={submitting}
                onClick={(e) => handleSubmit(e, "published")}
                variant="secondary"
              >
                Publish
              </AdminButton>
            </div>
          </div>
          <BlogSeoPanel
            form={form}
            originalSlug={originalSlug.current}
            slugAvailable={slugAvailable}
          />
        </aside>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
        <AdminButton type="submit" loading={submitting} loadingText="Saving...">
          Save changes
        </AdminButton>
        <Link
          href="/admin/blog"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
