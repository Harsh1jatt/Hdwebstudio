"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import { slugify } from "@/lib/slugify";

const emptyProject = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  client: "",
  category: "",
  industry: "",
  location: "",
  projectType: "client",
  year: "",
  challenge: "",
  solution: "",
  results: [""],
  features: [""],
  technologies: [""],
  services: [""],
  featuredImage: "",
  thumbnail: "",
  gallery: [""],
  demoUrl: "",
  liveUrl: "",
  githubUrl: "",
  caseStudyUrl: "",
  testimonial: { quote: "", author: "", role: "" },
  published: true,
  featured: false,
  order: 0,
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
};

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function TextArea({ value, onChange, rows = 4 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    />
  );
}

export default function ProjectForm({
  initialData,
  mode = "create",
  submitting = false,
  error = "",
  success = "",
  onSubmit,
}) {
  const [form, setForm] = useState(initialData || emptyProject);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  useEffect(() => {
    if (!initialData) return;
    setForm({
      ...emptyProject,
      ...initialData,
      results: initialData.results?.length ? initialData.results : [""],
      features: initialData.features?.length ? initialData.features : [""],
      technologies: initialData.technologies?.length ? initialData.technologies : [""],
      services: initialData.services?.length ? initialData.services : [""],
      gallery: initialData.gallery?.length ? initialData.gallery : [""],
      testimonial: initialData.testimonial || { quote: "", author: "", role: "" },
    });
  }, [initialData]);

  function updateField(key, value) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  function updateList(key, index, value) {
    setForm((prev) => {
      const list = [...prev[key]];
      list[index] = value;
      return { ...prev, [key]: list };
    });
  }

  function addListItem(key) {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  }

  function removeListItem(key, index) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({
      ...form,
      slug: slugify(form.slug),
      results: form.results.filter(Boolean),
      features: form.features.filter(Boolean),
      technologies: form.technologies.filter(Boolean),
      services: form.services.filter(Boolean),
      gallery: form.gallery.filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
      {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{success}</div> : null}

      <Section title="Basic Information">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput label="Title" id="title" value={form.title} onChange={(e) => updateField("title", e.target.value)} />
          <AdminInput
            label="Slug"
            id="slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", slugify(e.target.value));
            }}
          />
          <AdminInput label="Client" id="client" value={form.client} onChange={(e) => updateField("client", e.target.value)} />
          <AdminInput label="Category" id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)} />
          <AdminInput label="Industry" id="industry" value={form.industry} onChange={(e) => updateField("industry", e.target.value)} />
          <AdminInput label="Year" id="year" value={form.year} onChange={(e) => updateField("year", e.target.value)} />
          <AdminInput label="Project Type" id="projectType" value={form.projectType} onChange={(e) => updateField("projectType", e.target.value)} />
          <AdminInput label="Location" id="location" value={form.location} onChange={(e) => updateField("location", e.target.value)} />
        </div>
      </Section>

      <Section title="Description">
        <AdminInput label="Short description" id="shortDescription" value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} />
        <TextArea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={4} />
      </Section>

      <Section title="Challenge">
        <TextArea value={form.challenge} onChange={(e) => updateField("challenge", e.target.value)} rows={4} />
      </Section>
      <Section title="Solution">
        <TextArea value={form.solution} onChange={(e) => updateField("solution", e.target.value)} rows={4} />
      </Section>

      {["results", "features", "technologies", "services", "gallery"].map((key) => (
        <Section key={key} title={key.charAt(0).toUpperCase() + key.slice(1)}>
          {form[key].map((item, index) => (
            <div key={`${key}-${index}`} className="flex gap-2">
              <AdminInput
                label={`${key.slice(0, -1)} ${index + 1}`}
                id={`${key}-${index}`}
                value={item}
                onChange={(e) => updateList(key, index, e.target.value)}
              />
              <button type="button" onClick={() => removeListItem(key, index)} className="mt-8 h-10 rounded-lg border border-red-200 px-3 text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addListItem(key)} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <Plus className="h-4 w-4" /> Add item
          </button>
        </Section>
      ))}

      <Section title="Images">
        <div className="grid gap-4 md:grid-cols-2">
          <MediaPicker label="Featured image" value={form.featuredImage} onChange={(url) => updateField("featuredImage", url)} />
          <MediaPicker label="Thumbnail" value={form.thumbnail} onChange={(url) => updateField("thumbnail", url)} />
        </div>
      </Section>

      <Section title="Links">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput label="Live URL" id="liveUrl" value={form.liveUrl} onChange={(e) => updateField("liveUrl", e.target.value)} />
          <AdminInput label="GitHub URL" id="githubUrl" value={form.githubUrl} onChange={(e) => updateField("githubUrl", e.target.value)} />
          <AdminInput label="Demo URL" id="demoUrl" value={form.demoUrl} onChange={(e) => updateField("demoUrl", e.target.value)} />
          <AdminInput label="Case study URL" id="caseStudyUrl" value={form.caseStudyUrl} onChange={(e) => updateField("caseStudyUrl", e.target.value)} />
        </div>
      </Section>

      <Section title="Testimonial">
        <TextArea value={form.testimonial.quote} onChange={(e) => setForm((prev) => ({ ...prev, testimonial: { ...prev.testimonial, quote: e.target.value } }))} rows={3} />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput label="Author" id="testimonialAuthor" value={form.testimonial.author} onChange={(e) => setForm((prev) => ({ ...prev, testimonial: { ...prev.testimonial, author: e.target.value } }))} />
          <AdminInput label="Role" id="testimonialRole" value={form.testimonial.role} onChange={(e) => setForm((prev) => ({ ...prev, testimonial: { ...prev.testimonial, role: e.target.value } }))} />
        </div>
      </Section>

      <Section title="Publishing">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput label="Order" id="order" type="number" min="0" value={form.order} onChange={(e) => updateField("order", Number(e.target.value) || 0)} />
          <label className="mt-8 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => updateField("published", e.target.checked)} />
            Published
          </label>
          <label className="mt-8 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
            Featured on homepage
          </label>
        </div>
      </Section>

      <Section title="SEO">
        <AdminInput label="SEO title" id="seoTitle" value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} />
        <TextArea value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} rows={3} />
        <MediaPicker label="OG image" value={form.ogImage} onChange={(url) => updateField("ogImage", url)} />
      </Section>

      <div className="flex gap-3">
        <AdminButton type="submit" loading={submitting} loadingText="Saving...">
          {mode === "create" ? "Create project" : "Save changes"}
        </AdminButton>
        <Link href="/admin/projects" className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
          Cancel
        </Link>
      </div>
    </form>
  );
}
