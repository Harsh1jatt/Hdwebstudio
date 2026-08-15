"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";

import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";
import AdminLoader from "@/components/Admin/common/AdminLoader";

const defaultPerPage = 20;

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        status === "published"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

export default function PostsManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all|draft|published
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("updated"); // updated|newest|oldest

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [actionMessage, setActionMessage] = useState("");

  const availableSortOptions = useMemo(
    () => [
      { value: "updated", label: "Recently updated" },
      { value: "newest", label: "Newest published" },
      { value: "oldest", label: "Oldest published" },
      { value: "order", label: "Latest changes" },
    ],
    []
  );

  const loadPosts = useCallback(
    async (search = query, pageNumber = page) => {
      setLoading(true);
      setError("");
      setActionMessage("");

      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNumber));
        params.set("perPage", String(defaultPerPage));
        params.set("sort", sort);

        if (search.trim()) params.set("q", search.trim());
        if (category.trim()) params.set("category", category.trim());
        if (statusFilter !== "all") params.set("status", statusFilter);

        const res = await fetch(`/api/admin/posts?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Unable to load posts.");
        }

        setPosts(data.posts || []);
        setTotal(data.total || 0);
        setPage(data.page || pageNumber);
      } catch (err) {
        setError(err.message || "Unable to load posts.");
      } finally {
        setLoading(false);
      }
    },
    [query, page, statusFilter, category, sort]
  );

  useEffect(() => {
    loadPosts(query, 1);
  }, [query, statusFilter, category, sort, loadPosts]);

  async function handleToggleStatus(post) {
    const nextStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");

      setActionMessage(
        `Post "${post.title}" is now ${nextStatus === "published" ? "published" : "a draft"}.`
      );
      await loadPosts(query, page);
    } catch (err) {
      alert(err.message || "Update failed.");
    }
  }

  async function handleDelete(post) {
    const confirmed = window.confirm(
      `Delete "${post.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");

      setActionMessage(`Deleted "${post.title}".`);
      await loadPosts(query, page);
    } catch (err) {
      alert(err.message || "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Blog CMS
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Manage posts
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create, edit, publish, and organize blog posts.
          </p>
        </div>

        <Link href="/admin/blog/new">
          <AdminButton className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New post
          </AdminButton>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <AdminInput
          id="post-search"
          label="Search posts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, slug, author, category"
        />

        <div>
          <label className="mb-2 block text-[13px] font-semibold text-slate-700">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>

        <AdminInput
          id="post-category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. SEO"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-[13px] font-semibold text-slate-700">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            {availableSortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {actionMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {actionMessage}
        </div>
      ) : null}

      {loading ? <AdminLoader /> : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No posts yet</h3>
          <p className="mt-2 text-sm text-slate-500">Create your first blog post.</p>
        </div>
      ) : null}

      {!loading && posts.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Published</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-slate-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{post.title}</div>
                      <div className="text-xs font-mono text-slate-500">{post.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{post.category}</td>
                    <td className="px-4 py-3 text-slate-700">{post.author}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(post)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          {post.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        {post.status === "published" ? (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View
                          </a>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => handleDelete(post)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
            <div>
              {Math.min(1 + (page - 1) * defaultPerPage, total)} -{" "}
              {Math.min(page * defaultPerPage, total)} of {total} posts
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const nextPage = Math.max(1, page - 1);
                  loadPosts(query, nextPage);
                }}
                disabled={page <= 1}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => loadPosts(query, page + 1)}
                disabled={page * defaultPerPage >= total}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

