"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Link2,
  ExternalLink,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  ShieldCheck,
  Globe,
  Trash2,
  Edit2,
  X,
  Building,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";

export default function BacklinksManager() {
  const [backlinks, setBacklinks] = useState([]);
  const [stats, setStats] = useState({ total: 0, verified: 0, published: 0, prospects: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    websiteName: "",
    domain: "",
    targetUrl: "https://hdwebstudios.in",
    opportunityUrl: "",
    type: "Business Directory",
    category: "Agency Directory",
    country: "India",
    niche: "Web & IT",
    linkType: "nofollow",
    pricing: "Free",
    status: "Prospect",
    anchorText: "HD Web Studios",
    notes: "",
  });

  async function loadBacklinks() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/seo/backlinks?status=${statusFilter}&type=${typeFilter}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setBacklinks(data.backlinks || []);
        setStats(data.stats || { total: 0, verified: 0, published: 0, prospects: 0 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBacklinks();
  }, [statusFilter, typeFilter]);

  async function handleSearch(e) {
    e?.preventDefault?.();
    loadBacklinks();
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `/api/admin/seo/backlinks/${editingItem._id}` : "/api/admin/seo/backlinks";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setEditingItem(null);
        loadBacklinks();
      } else {
        alert(data.error || "Save failed");
      }
    } catch (err) {
      alert("Error saving backlink opportunity: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to remove this backlink opportunity?")) return;
    try {
      const res = await fetch(`/api/admin/seo/backlinks/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) loadBacklinks();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    setForm({
      websiteName: "",
      domain: "",
      targetUrl: "https://hdwebstudios.in",
      opportunityUrl: "",
      type: "Business Directory",
      category: "Agency Directory",
      country: "India",
      niche: "Web & IT",
      linkType: "nofollow",
      pricing: "Free",
      status: "Prospect",
      anchorText: "HD Web Studios",
      notes: "",
    });
    setModalOpen(true);
  }

  function openEditModal(item) {
    setEditingItem(item);
    setForm({ ...item });
    setModalOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/seo"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2"
          >
            <ArrowLeft size={13} /> Back to SEO Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Backlink Resource Center &amp; Outreach CRM</h1>
          <p className="text-xs text-slate-500 mt-1">
            Curated database of verified local citations, developer directories, and industry profiles with automated safety grading.
          </p>
        </div>
        <AdminButton onClick={openCreateModal}>
          <Plus size={14} /> Add Opportunity
        </AdminButton>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Opportunities</span>
          <p className="mt-2 text-2xl font-black text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Verified Active</span>
          <p className="mt-2 text-2xl font-black text-emerald-900">{stats.verified}</p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">Submitted / Published</span>
          <p className="mt-2 text-2xl font-black text-blue-900">{stats.published}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Prospects in Pipeline</span>
          <p className="mt-2 text-2xl font-black text-amber-900">{stats.prospects}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search domain or directory..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Prospect">Prospect</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Published">Published</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Types</option>
            <option value="Local Citation">Local Citation</option>
            <option value="Business Directory">Business Directory</option>
            <option value="Profile">Profile Platform</option>
            <option value="Resource Page">Resource Page</option>
            <option value="Guest Post">Guest Post</option>
          </select>
        </div>
      </div>

      {/* Opportunities Table */}
      {loading ? (
        <AdminLoader rows={5} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-5">Target Domain &amp; Directory</th>
                  <th className="py-3.5 px-4">Type / Category</th>
                  <th className="py-3.5 px-4">Link Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Safety</th>
                  <th className="py-3.5 px-4">Anchor</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {backlinks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                      No backlink opportunities found. Click "Add Opportunity" to create one.
                    </td>
                  </tr>
                ) : (
                  backlinks.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-bold">
                            <Globe size={15} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.websiteName}</p>
                            <a
                              href={item.opportunityUrl || `https://${item.domain}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5"
                            >
                              {item.domain} <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-900">{item.type}</p>
                        <p className="text-[10px] text-slate-400">{item.category}</p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                            item.linkType === "dofollow" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.linkType}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            item.status === "Verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.status === "Published"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "Prospect"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                            item.safetyScore === "SAFE"
                              ? "text-emerald-700"
                              : item.safetyScore === "REVIEW"
                              ? "text-amber-700"
                              : "text-red-700"
                          }`}
                        >
                          {item.safetyScore === "SAFE" ? (
                            <CheckCircle2 size={13} className="text-emerald-600" />
                          ) : (
                            <AlertTriangle size={13} />
                          )}
                          {item.safetyScore}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-600 truncate max-w-[150px]">
                        {item.anchorText || "Brand Name"}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg border border-slate-200 p-1.5 text-red-500 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
        <span>
          <strong>Backlink Quality Standard:</strong> HD Web Studios practices ethical, organic backlink acquisition through verified business citations, official profiles, and genuine high-value content. Automated spam submissions and manipulative PBN links are strictly prohibited.
        </span>
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? "Edit Backlink Opportunity" : "Add Backlink Opportunity"}
            </h3>

            <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <AdminInput
                  id="websiteName"
                  label="Platform / Directory Name"
                  value={form.websiteName}
                  onChange={(e) => setForm({ ...form, websiteName: e.target.value })}
                  placeholder="e.g. Clutch.co"
                  required
                />
                <AdminInput
                  id="domain"
                  label="Domain Name"
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  placeholder="e.g. clutch.co"
                  required
                />
              </div>

              <AdminInput
                id="opportunityUrl"
                label="Direct Submission / Profile URL"
                value={form.opportunityUrl}
                onChange={(e) => setForm({ ...form, opportunityUrl: e.target.value })}
                placeholder="https://clutch.co/get-listed"
              />

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block font-semibold text-slate-700">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
                  >
                    <option value="Local Citation">Local Citation</option>
                    <option value="Business Directory">Business Directory</option>
                    <option value="Profile">Profile Platform</option>
                    <option value="Resource Page">Resource Page</option>
                    <option value="Guest Post">Guest Post</option>
                    <option value="Podcast">Podcast / Interview</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-semibold text-slate-700">Link Type</label>
                  <select
                    value={form.linkType}
                    onChange={(e) => setForm({ ...form, linkType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
                  >
                    <option value="dofollow">dofollow</option>
                    <option value="nofollow">nofollow</option>
                    <option value="ugc">ugc</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-semibold text-slate-700">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
                  >
                    <option value="Prospect">Prospect</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Published">Published</option>
                    <option value="Verified">Verified</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <AdminInput
                  id="anchorText"
                  label="Target Anchor Text"
                  value={form.anchorText}
                  onChange={(e) => setForm({ ...form, anchorText: e.target.value })}
                  placeholder="e.g. HD Web Studios"
                />
                <AdminInput
                  id="targetUrl"
                  label="Destination URL"
                  value={form.targetUrl}
                  onChange={(e) => setForm({ ...form, targetUrl: e.target.value })}
                  placeholder="https://hdwebstudios.in"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-slate-700">Outreach / Verification Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none focus:border-blue-500"
                  placeholder="Add login credentials, submission dates, or outreach email details..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <AdminButton type="submit">
                  Save Opportunity
                </AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
