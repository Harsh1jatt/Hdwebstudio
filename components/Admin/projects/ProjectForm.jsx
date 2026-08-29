"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";
import TagInput from "@/components/Admin/common/TagInput";
import HdAiAssistant from "@/components/Admin/ai/HdAiAssistant";
import HdAiSectionRegenerate from "@/components/Admin/ai/HdAiSectionRegenerate";
import HdAiContentImprover from "@/components/Admin/ai/HdAiContentImprover";
import HdAiQualityReviewer from "@/components/Admin/ai/HdAiQualityReviewer";
import { slugify } from "@/lib/slugify";

const emptyProject = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  client: "",
  category: "Web Development",
  industry: "",
  location: "Ludhiana, Punjab",
  projectType: "client",
  year: new Date().getFullYear().toString(),
  challenge: "",
  solution: "",
  results: [],
  features: [],
  technologies: [],
  services: [],
  featuredImage: "",
  thumbnail: "",
  gallery: [],
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

function Section({ title, description, action = null, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function TextArea({ label, id, value, onChange, rows = 4, placeholder, helperText, action = null }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            {label}
          </label>
        )}
        {action && <div>{action}</div>}
      </div>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
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
      results: Array.isArray(initialData.results) ? initialData.results : [],
      features: Array.isArray(initialData.features) ? initialData.features : [],
      technologies: Array.isArray(initialData.technologies) ? initialData.technologies : [],
      services: Array.isArray(initialData.services) ? initialData.services : [],
      gallery: Array.isArray(initialData.gallery) ? initialData.gallery : [],
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

  const hasContent = Boolean(form.title || form.description || form.challenge);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      {/* Central HD AI Project Generator */}
      <HdAiAssistant
        type="project"
        hasExistingContent={hasContent}
        onGenerated={(data, mergeOnly = false) => {
          setForm((prev) => {
            if (mergeOnly) {
              return {
                ...prev,
                title: prev.title || data.title,
                slug: prev.slug || data.slug,
                client: prev.client || data.client,
                category: prev.category || data.category,
                industry: prev.industry || data.industry,
                shortDescription: prev.shortDescription || data.shortDescription,
                description: prev.description || data.description,
                challenge: prev.challenge || data.challenge,
                solution: prev.solution || data.solution,
                features: prev.features?.length ? prev.features : data.features || [],
                technologies: prev.technologies?.length ? prev.technologies : data.technologies || [],
                results: prev.results?.length ? prev.results : data.results || [],
                seoTitle: prev.seoTitle || data.seoTitle,
                seoDescription: prev.seoDescription || data.seoDescription,
              };
            }
            return {
              ...prev,
              ...data,
              results: data.results || prev.results,
              features: data.features || prev.features,
              technologies: data.technologies || prev.technologies,
              services: data.services || prev.services,
            };
          });
          setSlugTouched(true);
        }}
      />

      <Section title="Basic Information" description="Primary client and case study details.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Project Title"
            id="title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Next.js Solar Energy Customer Portal"
          />
          <AdminInput
            label="Slug"
            id="slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", slugify(e.target.value));
            }}
            helperText="/work/your-slug"
          />
          <AdminInput
            label="Client / Business Name"
            id="client"
            value={form.client}
            onChange={(e) => updateField("client", e.target.value)}
            placeholder="e.g. SunPower Punjab"
          />
          <AdminInput
            label="Category"
            id="category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="e.g. Web Development, Custom Web App"
          />
          <AdminInput
            label="Industry / Niche"
            id="industry"
            value={form.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            placeholder="e.g. Renewable Energy, Education, Retail"
          />
          <AdminInput
            label="Year"
            id="year"
            value={form.year}
            onChange={(e) => updateField("year", e.target.value)}
            placeholder="e.g. 2025"
          />
          <AdminInput
            label="Location"
            id="location"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="e.g. Ludhiana, Punjab"
          />
          <AdminInput
            label="Project Type"
            id="projectType"
            value={form.projectType}
            onChange={(e) => updateField("projectType", e.target.value)}
            placeholder="client | internal | open-source"
          />
        </div>
      </Section>

      <Section title="Overview & Descriptions" description="Summary and comprehensive case study copy.">
        <AdminInput
          label="Short Description"
          id="shortDescription"
          value={form.shortDescription}
          onChange={(e) => updateField("shortDescription", e.target.value)}
          placeholder="Brief 1-2 sentence overview for cards and listings."
        />
        <TextArea
          label="Full Description"
          id="description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          placeholder="Detailed narrative of the project context and objectives."
          action={
            <HdAiContentImprover
              text={form.description}
              context={`Project: ${form.title}. Client: ${form.client}`}
              onApply={(improved) => updateField("description", improved)}
            />
          }
        />
      </Section>

      <Section
        title="Problem & Solution"
        description="Explain the core challenge and your technical approach."
        action={
          <HdAiSectionRegenerate
            sectionType="challenge_solution"
            entityType="project"
            entityTitle={form.title}
            fullDocumentContext={form}
            currentData={{ challenge: form.challenge, solution: form.solution }}
            label="Regenerate Narrative"
            onApply={(data) => {
              if (data) {
                setForm((prev) => ({
                  ...prev,
                  challenge: data.challenge || prev.challenge,
                  solution: data.solution || prev.solution,
                }));
              }
            }}
          />
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextArea
            label="Client Challenge"
            id="challenge"
            value={form.challenge}
            onChange={(e) => updateField("challenge", e.target.value)}
            rows={4}
            placeholder="What problems was the client facing with their previous website?"
            action={
              <HdAiContentImprover
                text={form.challenge}
                context={`Client challenge for ${form.title}`}
                onApply={(improved) => updateField("challenge", improved)}
              />
            }
          />
          <TextArea
            label="Our Solution"
            id="solution"
            value={form.solution}
            onChange={(e) => updateField("solution", e.target.value)}
            rows={4}
            placeholder="How did HD Web Studios engineer a solution to solve their challenge?"
            action={
              <HdAiContentImprover
                text={form.solution}
                context={`Engineered solution for ${form.title}`}
                onApply={(improved) => updateField("solution", improved)}
              />
            }
          />
        </div>
      </Section>

      <Section title="Technologies & Services" description="Tag all tools, frameworks, and services provided.">
        <div className="grid gap-4 md:grid-cols-2">
          <TagInput
            label="Technologies Used"
            tags={form.technologies}
            onChange={(tags) => updateField("technologies", tags)}
            placeholder="Type tech (e.g. Next.js) and press Enter..."
            suggestions={["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary", "TypeScript"]}
          />
          <TagInput
            label="Services Provided"
            tags={form.services}
            onChange={(tags) => updateField("services", tags)}
            placeholder="Type service and press Enter..."
            suggestions={["Business Website Development", "Local SEO", "Custom Web Application", "E-Commerce"]}
          />
        </div>
      </Section>

      <Section
        title="Outcomes & Key Features"
        description="Highlight measurable results and key delivered features."
        action={
          <div className="flex items-center gap-2">
            <HdAiSectionRegenerate
              sectionType="features"
              entityType="project"
              entityTitle={form.title}
              fullDocumentContext={form}
              currentData={form.features}
              label="Regenerate Features"
              onApply={(data) => {
                if (Array.isArray(data)) setForm((prev) => ({ ...prev, features: data }));
              }}
            />
            <HdAiSectionRegenerate
              sectionType="results"
              entityType="project"
              entityTitle={form.title}
              fullDocumentContext={form}
              currentData={form.results}
              label="Regenerate Results"
              onApply={(data) => {
                if (Array.isArray(data)) setForm((prev) => ({ ...prev, results: data }));
              }}
            />
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TagInput
            label="Key Results / Outcomes (Factual Only)"
            tags={form.results}
            onChange={(tags) => updateField("results", tags)}
            placeholder="Type result (e.g. Sub-second load times) and press Enter..."
            suggestions={["Sub-second load times", "100% Core Web Vitals", "WhatsApp lead integration"]}
          />
          <TagInput
            label="Delivered Features"
            tags={form.features}
            onChange={(tags) => updateField("features", tags)}
            placeholder="Type feature (e.g. Live Inquiry Form) and press Enter..."
            suggestions={["Mobile-first UI", "Honeypot spam filter", "Schema markup", "Admin dashboard"]}
          />
        </div>
      </Section>

      <Section title="Media & Visual Assets" description="Select featured cover and thumbnail images.">
        <div className="grid gap-4 md:grid-cols-2">
          <MediaPicker
            label="Featured Cover Image"
            value={form.featuredImage}
            onChange={(url) => updateField("featuredImage", url)}
          />
          <MediaPicker
            label="Card Thumbnail"
            value={form.thumbnail}
            onChange={(url) => updateField("thumbnail", url)}
          />
        </div>
      </Section>

      <Section title="Links & URLs" description="Live site and demo references.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Live Website URL"
            id="liveUrl"
            value={form.liveUrl}
            onChange={(e) => updateField("liveUrl", e.target.value)}
            placeholder="https://example.com"
          />
          <AdminInput
            label="Demo / Staging URL"
            id="demoUrl"
            value={form.demoUrl}
            onChange={(e) => updateField("demoUrl", e.target.value)}
            placeholder="https://staging.example.com"
          />
          <AdminInput
            label="GitHub / Source URL (Optional)"
            id="githubUrl"
            value={form.githubUrl}
            onChange={(e) => updateField("githubUrl", e.target.value)}
          />
          <AdminInput
            label="External Case Study URL (Optional)"
            id="caseStudyUrl"
            value={form.caseStudyUrl}
            onChange={(e) => updateField("caseStudyUrl", e.target.value)}
          />
        </div>
      </Section>

      <Section title="Client Testimonial (Optional)" description="Quote from the business owner or stakeholder.">
        <TextArea
          label="Testimonial Quote"
          id="testimonialQuote"
          value={form.testimonial?.quote || ""}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              testimonial: { ...prev.testimonial, quote: e.target.value },
            }))
          }
          rows={3}
          placeholder="e.g. HD Web Studios delivered our portal ahead of schedule with flawless mobile speed."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Author Name"
            id="testimonialAuthor"
            value={form.testimonial?.author || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                testimonial: { ...prev.testimonial, author: e.target.value },
              }))
            }
            placeholder="e.g. Gurpreet Singh"
          />
          <AdminInput
            label="Author Role & Company"
            id="testimonialRole"
            value={form.testimonial?.role || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                testimonial: { ...prev.testimonial, role: e.target.value },
              }))
            }
            placeholder="e.g. Managing Director"
          />
        </div>
      </Section>

      <Section title="SEO & OpenGraph" description="Search engine optimization and social preview.">
        <AdminInput
          label="SEO Title"
          id="seoTitle"
          value={form.seoTitle}
          onChange={(e) => updateField("seoTitle", e.target.value)}
          placeholder="e.g. Solar Customer Portal Case Study | HD Web Studios"
        />
        <TextArea
          label="SEO Meta Description"
          id="seoDescription"
          value={form.seoDescription}
          onChange={(e) => updateField("seoDescription", e.target.value)}
          rows={2}
          placeholder="e.g. Discover how HD Web Studios built a high-speed customer portal for SunPower Punjab."
        />
        <MediaPicker
          label="OpenGraph Social Image"
          value={form.ogImage}
          onChange={(url) => updateField("ogImage", url)}
        />
      </Section>

      <Section title="Publishing & Visibility">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput
            label="Sort Order"
            id="order"
            type="number"
            min="0"
            value={form.order}
            onChange={(e) => updateField("order", Number(e.target.value) || 0)}
          />
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => updateField("published", e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-semibold text-slate-700">
              Published (Visible on site)
            </label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-slate-700">
              Featured on Homepage
            </label>
          </div>
        </div>
      </Section>

      {/* Sticky Save / Actions Bar */}
      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          {form.slug && (
            <a
              href={`/work/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              <ExternalLink size={13} /> View Live
            </a>
          )}
          <HdAiQualityReviewer
            title={form.title}
            content={form}
            contentType="project"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <AdminButton type="submit" loading={submitting} loadingText="Saving Project...">
            {mode === "create" ? "Create Project" : "Save Changes"}
          </AdminButton>
        </div>
      </div>
    </form>
  );
}
