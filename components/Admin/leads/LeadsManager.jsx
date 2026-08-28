"use client";

import { useEffect, useState, useCallback } from "react";
import LeadTable from "./LeadTable";
import AdminLoader from "../common/AdminLoader";
import { Download, FileSpreadsheet, RefreshCw, Search } from "lucide-react";

const defaultPerPage = 20;

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "proposal", label: "Proposal" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
  { key: "spam", label: "Spam" },
];

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage] = useState(defaultPerPage);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({
    all: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal: 0,
    won: 0,
    lost: 0,
    spam: 0,
  });

  const loadLeads = useCallback(
    async (search = "", status = "all", pageNumber = 1) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNumber));
        params.set("perPage", String(perPage));
        if (status && status !== "all") params.set("status", status);
        if (search.trim()) params.set("q", search.trim());

        const res = await fetch(`/api/admin/leads?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Unable to load leads.");
        }
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setPage(data.page || pageNumber);
        if (data.counts) setCounts(data.counts);
      } catch (err) {
        setError(err.message || "Unable to load leads.");
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    loadLeads(query, statusFilter, 1);
  }, [query, statusFilter, loadLeads]);

  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Status update failed.");
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
      );
      loadLeads(query, statusFilter, page);
    } catch (err) {
      alert(err.message || "Status update failed.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      await loadLeads(query, statusFilter, page);
    } catch (err) {
      alert(err.message || "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Export Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Leads Manager
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Enquiries & Business Leads
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage prospective client acquisition across all sources.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadLeads(query, statusFilter, page)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            title="Refresh list"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="/api/admin/export-leads?format=csv"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Download className="h-4 w-4 text-slate-500" />
            Export CSV
          </a>
          <a
            href="/api/admin/export-leads?format=xlsx"
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
          {STATUS_TABS.map(({ key, label }) => {
            const count = counts[key] || 0;
            const active = statusFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex w-full max-w-sm items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, phone, email, business..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {loading && leads.length === 0 ? <AdminLoader /> : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <LeadTable
        leads={leads}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
        <div>
          {total === 0
            ? "0 leads"
            : `${Math.min(1 + (page - 1) * perPage, total)} - ${Math.min(
                page * perPage,
                total
              )} of ${total} leads`}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadLeads(query, statusFilter, Math.max(1, page - 1))}
            disabled={page <= 1}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => loadLeads(query, statusFilter, page + 1)}
            disabled={page * perPage >= total}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
