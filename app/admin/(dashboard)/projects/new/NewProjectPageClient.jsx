"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/Admin/projects/ProjectForm";

export default function NewProjectPageClient() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to create project.");
      router.push(`/admin/projects/${data.project.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to create project.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Projects CMS</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create project</h2>
      </div>
      <ProjectForm mode="create" onSubmit={handleSubmit} submitting={submitting} error={error} />
    </div>
  );
}
