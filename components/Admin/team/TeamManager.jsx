"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import AdminLoader from "../common/AdminLoader";

const defaultPerPage = 20;

function StatusBadge({ active, activeText = "Yes", inactiveText = "No" }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {active ? activeText : inactiveText}
    </span>
  );
}

export default function TeamManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionMessage, setActionMessage] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page, perPage: defaultPerPage });
      if (search.trim()) params.set("q", search.trim());
      if (publishedFilter === "published") params.set("published", "true");
      if (publishedFilter === "draft") params.set("published", "false");
      const res = await fetch(`/api/admin/team?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load team members.");
      setItems(data.items || data.members || []);
      setTotal(data.total || 0);
      setPage(data.page || page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, search, publishedFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function handleToggle(item, field) {
    try {
      const res = await fetch(`/api/admin/team/${item._id || item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !item[field] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      setActionMessage(`Team member "${item.name}" updated.`);
      await fetchItems();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete team member "${item.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/team/${item._id || item.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setActionMessage(`Deleted team member "${item.name}".`);
      await fetchItems();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Team CMS</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage team members</h2>
          <p className="mt-2 text-sm text-slate-500">Create, edit, and publish team member profiles.</p>
        </div>
        <Link href="/admin/team/new">
          <AdminButton className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New member
          </AdminButton>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminInput
          id="team-search"
          label="Search team"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name or role"
        />
        <div>
          <label className="mb-2 block text-[13px] font-semibold text-slate-700">Status filter</label>
          <select
            value={publishedFilter}
            onChange={(e) => { setPublishedFilter(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 md:min-w-[180px]"
          >
            <option value="all">All members</option>
            <option value="published">Published only</option>
            <option value="draft">Drafts only</option>
          </select>
        </div>
      </div>

      {actionMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{actionMessage}</div>
      ) : null}

      {loading ? <AdminLoader /> : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No team members yet</h3>
          <p className="mt-2 text-sm text-slate-500">Add your first team member to get started.</p>
          <div className="mt-6">
            <Link href="/admin/team/new"><AdminButton>Add member</AdminButton></Link>
          </div>
        </div>
      ) : null}

      {!loading && items.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Published</th>
                  <th className="px-4 py-3 font-semibold">Featured</th>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id || item.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.role || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge active={item.published} activeText="Published" inactiveText="Draft" /></td>
                    <td className="px-4 py-3"><StatusBadge active={item.featured} activeText="Featured" inactiveText="No" /></td>
                    <td className="px-4 py-3 text-slate-600">{item.order ?? 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/admin/team/${item._id || item.id}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                          <Pencil className="h-3.5 w-3.5" />Edit
                        </Link>
                        <button type="button" onClick={() => handleToggle(item, "published")} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                          {item.published ? "Unpublish" : "Publish"}
                        </button>
                        <button type="button" onClick={() => handleToggle(item, "featured")} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                          {item.featured ? "Unfeature" : "Feature"}
                        </button>
                        <button type="button" onClick={() => handleDelete(item)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" />Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
            <div>{Math.min(1 + (page - 1) * defaultPerPage, total)} - {Math.min(page * defaultPerPage, total)} of {total} members</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              <button type="button" onClick={() => setPage((p) => p + 1)} disabled={page * defaultPerPage >= total} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
