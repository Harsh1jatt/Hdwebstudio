"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminLoader from "@/components/Admin/common/AdminLoader";

const defaultPerPage = 20;

function StatusBadge({ published }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
      {published ? "Published" : "Draft"}
    </span>
  );
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionMessage, setActionMessage] = useState("");

  const loadProjects = useCallback(async (search = query, pageNumber = 1, filter = publishedFilter) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(pageNumber), perPage: String(defaultPerPage), sort: "order" });
      if (search.trim()) params.set("q", search.trim());
      if (filter === "published") params.set("published", "true");
      if (filter === "draft") params.set("published", "false");

      const res = await fetch(`/api/admin/projects?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to load projects.");
      setProjects(data.projects || []);
      setTotal(data.total || 0);
      setPage(data.page || pageNumber);
    } catch (err) {
      setError(err.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }, [query, publishedFilter]);

  useEffect(() => {
    loadProjects(query, 1, publishedFilter);
  }, [query, publishedFilter, loadProjects]);

  async function handlePatch(project, payload) {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      await loadProjects(query, page, publishedFilter);
    } catch (err) {
      setActionMessage(err.message || "Update failed.");
    }
  }

  async function handleDelete(project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setActionMessage(`Deleted "${project.title}".`);
      await loadProjects(query, page, publishedFilter);
    } catch (err) {
      setActionMessage(err.message || "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Projects CMS</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage portfolio projects</h2>
        </div>
        <Link href="/admin/projects/new"><AdminButton><Plus className="h-4 w-4" />New project</AdminButton></Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminInput id="project-search" label="Search projects" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div>
          <label className="mb-2 block text-[13px] font-semibold text-slate-700">Status filter</label>
          <select value={publishedFilter} onChange={(e) => setPublishedFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 md:min-w-[180px]">
            <option value="all">All projects</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {actionMessage ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{actionMessage}</div> : null}
      {loading ? <AdminLoader /> : null}
      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      {!loading && projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No projects yet</h3>
          <p className="mt-2 text-sm text-slate-500">Create a case study or import sample data.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/admin/projects/new">
              <AdminButton>New Project</AdminButton>
            </Link>
          </div>
        </div>
      ) : null}

      {!loading && projects.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-100">
                    <td className="px-4 py-3">
                      <input type="number" min="0" defaultValue={project.order} onBlur={(e) => handlePatch(project, { order: Number(e.target.value) || 0 })} className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-sm" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{project.title}</div>
                      <div className="text-xs text-slate-500">{project.category || "—"}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{project.slug}</td>
                    <td className="px-4 py-3"><StatusBadge published={project.published} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/admin/projects/${project.id}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700"><Pencil className="h-3.5 w-3.5" />Edit</Link>
                        <button type="button" onClick={() => handlePatch(project, { published: !project.published })} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700">{project.published ? "Unpublish" : "Publish"}</button>
                        {project.published ? <a href={`/work/${project.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700"><ExternalLink className="h-3.5 w-3.5" />View</a> : null}
                        <button type="button" onClick={() => handleDelete(project)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="h-3.5 w-3.5" />Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
            <div>{Math.min(1 + (page - 1) * defaultPerPage, total)} - {Math.min(page * defaultPerPage, total)} of {total} projects</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => loadProjects(query, Math.max(1, page - 1), publishedFilter)} disabled={page <= 1} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:opacity-40">Previous</button>
              <button type="button" onClick={() => loadProjects(query, page + 1, publishedFilter)} disabled={page * defaultPerPage >= total} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:opacity-40">Next</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
