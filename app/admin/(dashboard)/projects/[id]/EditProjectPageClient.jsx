"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/Admin/projects/ProjectForm";
import AdminLoader from "@/components/Admin/common/AdminLoader";

export default function EditProjectPageClient({ projectId }) {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/projects/${projectId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to load project.");
        setProject(data.project);
      } catch (err) {
        setError(err.message || "Unable to load project.");
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [projectId]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to save project.");
      setProject(data.project);
      setSuccess("Project saved successfully.");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to save project.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <AdminLoader />;
  if (!project && error) return <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Projects CMS</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Edit project</h2>
      </div>
      <ProjectForm mode="edit" initialData={project} onSubmit={handleSubmit} submitting={submitting} error={error} success={success} />
    </div>
  );
}
