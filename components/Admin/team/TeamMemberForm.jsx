"use client";

import { useState } from "react";
import Link from "next/link";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import MediaPicker from "@/components/Admin/media/MediaPicker";

const defaults = {
  name: "",
  role: "",
  bio: "",
  image: "",
  imageAlt: "",
  email: "",
  linkedin: "",
  github: "",
  order: 0,
  featured: false,
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

export default function TeamMemberForm({ initialData = {}, onSubmit, loading, error }) {
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

      <Section title="Basic information" description="Team member identity.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput id="name" label="Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          <AdminInput id="role" label="Role" value={form.role} onChange={(e) => updateField("role", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Bio</FieldLabel>
          <textarea
            id="bio"
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] font-medium text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.03)] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </Section>

      <Section title="Image" description="Profile photo.">
        <div className="grid gap-4 md:grid-cols-2">
          <MediaPicker label="Profile image" value={form.image} onChange={(url) => updateField("image", url)} />
          <AdminInput id="imageAlt" label="Image alt text" value={form.imageAlt} onChange={(e) => updateField("imageAlt", e.target.value)} />
        </div>
      </Section>

      <Section title="Links" description="Contact and social media.">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput id="email" label="Email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          <AdminInput id="linkedin" label="LinkedIn URL" value={form.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} />
          <AdminInput id="github" label="GitHub URL" value={form.github} onChange={(e) => updateField("github", e.target.value)} />
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
          {initialData._id || initialData.id ? "Save changes" : "Add member"}
        </AdminButton>
        <Link href="/admin/team" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</Link>
      </div>
    </form>
  );
}
