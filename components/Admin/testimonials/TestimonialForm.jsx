"use client";

import { useState } from "react";
import Link from "next/link";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";

const defaults = {
  name: "",
  role: "",
  company: "",
  content: "",
  rating: 5,
  image: "",
  imageAlt: "",
  location: "",
  featured: false,
  published: true,
  order: 0,
};

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-[13px] font-semibold text-slate-700">
      {children}
    </label>
  );
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

export default function TestimonialForm({ initialData = {}, onSubmit, loading, error }) {
  const [form, setForm] = useState({ ...defaults, ...initialData });

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      <Section title="Client information" description="Who provided this testimonial.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="name" label="Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          <AdminInput id="role" label="Role" value={form.role} onChange={(e) => updateField("role", e.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="company" label="Company" value={form.company} onChange={(e) => updateField("company", e.target.value)} />
          <AdminInput id="location" label="Location" value={form.location} onChange={(e) => updateField("location", e.target.value)} />
        </div>
      </Section>

      <Section title="Testimonial content" description="The review or feedback.">
        <div>
          <FieldLabel>Content</FieldLabel>
          <textarea
            id="content"
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <FieldLabel>Rating</FieldLabel>
            <select
              value={form.rating}
              onChange={(e) => updateField("rating", Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      <Section title="Image" description="Client photo or avatar.">
        <div className="grid gap-4 md:grid-cols-2">
          <MediaPicker label="Profile image" value={form.image} onChange={(url) => updateField("image", url)} />
          <AdminInput id="imageAlt" label="Image alt text" value={form.imageAlt} onChange={(e) => updateField("imageAlt", e.target.value)} />
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
              <input id="featured" type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured</label>
            </div>
          </div>
        </div>
      </Section>

      <div className="flex flex-wrap items-center gap-3">
        <AdminButton type="submit" loading={loading} loadingText="Saving...">
          {initialData._id || initialData.id ? "Save changes" : "Create testimonial"}
        </AdminButton>
        <Link href="/admin/testimonials" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}
