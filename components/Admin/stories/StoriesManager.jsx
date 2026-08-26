"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, Trash2, BookOpen } from "lucide-react";

import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminLoader from "@/components/Admin/common/AdminLoader";

const defaultPerPage = 20;

function StatusBadge({ status }) {
  const styles = {
    published: "bg-emerald-50 text-emerald-700",
    draft: "bg-amber-50 text-amber-700",
    archived: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || styles.draft}`}>
      {status === "published" ? "Published" : status === "archived" ? "Archived" : "Draft"}
    </span>
  );
}

export default function StoriesManager() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionMessage, setActionMessage] = useState("");

  const loadStories = useCallback(
    async (search = query, pageNumber = page) => {
      setLoading(true);
      setError("");
      setActionMessage("");

      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNumber));
        params.set("perPage", String(defaultPerPage));
        if (search.trim()) params.set("q", search.trim());
        if (statusFilter !== "all") params.set("status", statusFilter);

        const res = await fetch(`/api/admin/stories?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to load stories.");

        setStories(data.stories || []);
        setTotal(data.total || 0);
        setPage(data.page || pageNumber);
      } catch (err) {
        setError(err.message || "Unable to load stories.");
      } finally {
        setLoading(false);
      }
    },
    [query, page, statusFilter]
  );

  useEffect(() => {
    loadStories(query, 1);
  }, [query, statusFilter, loadStories]);

  async function handleToggleStatus(story) {
    const nextStatus = story.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/stories/${story.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      setActionMessage(`"${story.title}" is now ${nextStatus}.`);
      await loadStories(query, page);
    } catch (err) {
      alert(err.message || "Update failed.");
    }
  }

  async function handleDelete(story) {
    if (!window.confirm(`Delete "${story.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/stories/${story.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setActionMessage(`Deleted "${story.title}".`);
      await loadStories(query, page);
    } catch (err) {
      alert(err.message || "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Web Stories</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage stories</h2>
          <p className="mt-2 text-sm text-slate-500">Create visual web stories optimized for Google discovery.</p>
        </div>
        <Link href="/admin/stories/new">
          <AdminButton className="w-full sm:w-auto">
            <Plus className="h-4 w-4" /> New story
          </AdminButton>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminInput
          id="story-search"
          label="Search stories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, slug, or description"
        />
        <div>
          <label className="mb-2 block text-[13px] font-semibold text-slate-700">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {actionMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{actionMessage}</div>
      )}

      {loading && <AdminLoader />}
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {!loading && !error && stories.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <BookOpen className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">No stories yet</h3>
          <p className="mt-2 text-sm text-slate-500">Create your first web story to reach audiences through Google Discover.</p>
        </div>
      )}

      {!loading && stories.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Slides</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Published</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story.id} className="border-b border-slate-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{story.title}</div>
                      <div className="text-xs font-mono text-slate-500">{story.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{story.category || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{story.slideCount}</td>
                    <td className="px-4 py-3"><StatusBadge status={story.status} /></td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/stories/${story.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(story)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          {story.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        {story.status === "published" && (
                          <a
                            href={`/stories/${story.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> View
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(story)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
            <div>{Math.min(1 + (page - 1) * defaultPerPage, total)} – {Math.min(page * defaultPerPage, total)} of {total} stories</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => loadStories(query, Math.max(1, page - 1))} disabled={page <= 1} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              <button type="button" onClick={() => loadStories(query, page + 1)} disabled={page * defaultPerPage >= total} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
