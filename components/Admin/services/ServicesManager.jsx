"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "../common/AdminButton";
import AdminInput from "../common/AdminInput";
import AdminLoader from "../common/AdminLoader";

const defaultPerPage = 20;

function StatusBadge({ published }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        published
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionMessage, setActionMessage] = useState("");

  const loadServices = useCallback(
    async (search = query, pageNumber = page, filter = publishedFilter) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNumber));
        params.set("perPage", String(defaultPerPage));
        params.set("sort", "order");
        if (search.trim()) params.set("q", search.trim());
        if (filter === "published") params.set("published", "true");
        if (filter === "draft") params.set("published", "false");

        const res = await fetch(`/api/admin/services?${params.toString()}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load services.");
        }

        setServices(data.services || []);
        setTotal(data.total || 0);
        setPage(data.page || pageNumber);
      } catch (err) {
        setError(err.message || "Unable to load services.");
      } finally {
        setLoading(false);
      }
    },
    [query, page, publishedFilter]
  );

  useEffect(() => {
    loadServices(query, 1, publishedFilter);
  }, [query, publishedFilter, loadServices]);

  async function handleTogglePublished(service) {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !service.published }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      setActionMessage(
        `Service "${service.eyebrow}" is now ${data.service.published ? "published" : "a draft"}.`
      );
      await loadServices(query, page, publishedFilter);
    } catch (err) {
      alert(err.message || "Update failed.");
    }
  }

  async function handleOrderChange(service, nextOrder) {
    const order = Number(nextOrder);
    if (!Number.isInteger(order) || order < 0) return;

    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Order update failed.");
      await loadServices(query, page, publishedFilter);
    } catch (err) {
      alert(err.message || "Order update failed.");
    }
  }

  async function handleDelete(service) {
    const confirmed = window.confirm(
      `Delete "${service.eyebrow}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setActionMessage(`Deleted "${service.eyebrow}".`);
      await loadServices(query, page, publishedFilter);
    } catch (err) {
      alert(err.message || "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Services CMS
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Manage services
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create, edit, publish, and reorder services shown on the public
            website.
          </p>
        </div>

        <Link href="/admin/services/new">
          <AdminButton className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New service
          </AdminButton>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <AdminInput
          id="service-search"
          label="Search services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, slug, or category"
        />
        <div>
          <label className="mb-2 block text-[13px] font-semibold text-slate-700">
            Status filter
          </label>
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 md:min-w-[180px]"
          >
            <option value="all">All services</option>
            <option value="published">Published only</option>
            <option value="draft">Drafts only</option>
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

      {!loading && !error && services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No services yet</h3>
          <p className="mt-2 text-sm text-slate-500">
            Create your first service or run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              npm run seed:services
            </code>{" "}
            to import static data.
          </p>
          <div className="mt-6">
            <Link href="/admin/services/new">
              <AdminButton>Create service</AdminButton>
            </Link>
          </div>
        </div>
      ) : null}

      {!loading && services.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-slate-100">
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        defaultValue={service.order}
                        onBlur={(e) =>
                          handleOrderChange(service, e.target.value)
                        }
                        className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">
                        {service.eyebrow}
                      </div>
                      <div className="text-xs text-slate-500">
                        {service.tagline}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">
                      {service.slug}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge published={service.published} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {service.updatedAt
                        ? new Date(service.updatedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(service)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          {service.published ? "Unpublish" : "Publish"}
                        </button>
                        {service.published ? (
                          <a
                            href={`/services/${service.slug}`}
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
                          onClick={() => handleDelete(service)}
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
              {Math.min(page * defaultPerPage, total)} of {total} services
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadServices(query, Math.max(1, page - 1), publishedFilter)}
                disabled={page <= 1}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => loadServices(query, page + 1, publishedFilter)}
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
