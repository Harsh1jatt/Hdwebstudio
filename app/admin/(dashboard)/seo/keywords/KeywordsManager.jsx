"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  Plus,
  ArrowLeft,
  Tag,
  Target,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Layers,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";

export default function KeywordsManager() {
  const [keywords, setKeywords] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("all");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    keyword: "",
    searchIntent: "Commercial",
    cluster: "Local Web Services",
    stage: "BOFU (Decision)",
    assignedPageUrl: "/services/business-website-development",
    geoTarget: "Ludhiana",
    localModifiers: ["in ludhiana", "punjab"],
    semanticEntities: ["web design", "website development"],
    priority: "HIGH",
    status: "Published",
  });

  async function loadKeywords() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/seo/keywords?intent=${selectedIntent}&cluster=${selectedCluster}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      if (data.success) {
        setKeywords(data.keywords || []);
        setClusters(data.clusters || []);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKeywords();
  }, [selectedIntent, selectedCluster]);

  async function handleSearch(e) {
    e?.preventDefault?.();
    loadKeywords();
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `/api/admin/seo/keywords/${editingItem._id}` : "/api/admin/seo/keywords";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setEditingItem(null);
        loadKeywords();
      } else {
        alert(data.error || "Failed to save keyword");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this keyword target?")) return;
    try {
      const res = await fetch(`/api/admin/seo/keywords/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) loadKeywords();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    setForm({
      keyword: "",
      searchIntent: "Commercial",
      cluster: "Local Web Services",
      stage: "BOFU (Decision)",
      assignedPageUrl: "/services/business-website-development",
      geoTarget: "Ludhiana",
      localModifiers: ["in ludhiana"],
      semanticEntities: ["web design"],
      priority: "HIGH",
      status: "Published",
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
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/seo"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-2"
          >
            <ArrowLeft size={13} /> Back to SEO Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Keyword Clustering &amp; Intent Architecture</h1>
          <p className="text-xs text-slate-500 mt-1">
            Map high-intent search queries to specific canonical landing pages across informational, commercial, and transactional funnels.
          </p>
        </div>
        <AdminButton onClick={openCreateModal}>
          <Plus size={14} /> Add Keyword Target
        </AdminButton>
      </div>

      {/* Cluster Overview Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCluster("all")}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
            selectedCluster === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          All Clusters ({totalCount})
        </button>
        {clusters.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCluster(c)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              selectedCluster === c
                ? "bg-blue-600 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Search & Intent Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keyword target..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Search Intent:</span>
          {["all", "Transactional", "Commercial", "Informational", "Navigational"].map((intent) => (
            <button
              key={intent}
              onClick={() => setSelectedIntent(intent)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                selectedIntent === intent
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {intent === "all" ? "All Intents" : intent}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Table */}
      {loading ? (
        <AdminLoader rows={6} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-5">Target Query</th>
                  <th className="py-3.5 px-4">Cluster / Funnel</th>
                  <th className="py-3.5 px-4">Search Intent</th>
                  <th className="py-3.5 px-4">Geo Target</th>
                  <th className="py-3.5 px-4">Assigned Landing Page</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {keywords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                      No keywords found in this cluster. Click "Add Keyword Target" to map one.
                    </td>
                  </tr>
                ) : (
                  keywords.map((kw) => (
                    <tr key={kw._id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-5">
                        <p className="font-bold text-slate-900">{kw.keyword}</p>
                        {kw.semanticEntities?.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {kw.semanticEntities.map((ent, i) => (
                              <span key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-600 font-medium">
                                {ent}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">{kw.cluster}</span>
                        <p className="text-[10px] text-slate-400">{kw.stage}</p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            kw.searchIntent === "Transactional"
                              ? "bg-emerald-100 text-emerald-800"
                              : kw.searchIntent === "Commercial"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {kw.searchIntent}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <MapPin size={12} className="text-red-500" /> {kw.geoTarget}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <a
                          href={kw.assignedPageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-blue-600 hover:underline inline-flex items-center gap-0.5"
                        >
                          {kw.assignedPageUrl} <ExternalLink size={10} />
                        </a>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`font-bold text-[11px] ${
                            kw.priority === "HIGH" ? "text-red-600" : "text-slate-600"
                          }`}
                        >
                          {kw.priority}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(kw)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(kw._id)}
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? "Edit Keyword Target" : "Add Keyword Target"}
            </h3>

            <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
              <AdminInput
                id="keyword"
                label="Target Search Query"
                value={form.keyword}
                onChange={(e) => setForm({ ...form, keyword: e.target.value })}
                placeholder="e.g. website development company in ludhiana"
                required
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <AdminInput
                  id="cluster"
                  label="Topic Cluster"
                  value={form.cluster}
                  onChange={(e) => setForm({ ...form, cluster: e.target.value })}
                  placeholder="e.g. Local Web Services"
                  required
                />
                <div>
                  <label className="mb-1.5 block font-semibold text-slate-700">Search Intent</label>
                  <select
                    value={form.searchIntent}
                    onChange={(e) => setForm({ ...form, searchIntent: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Informational">Informational</option>
                    <option value="Navigational">Navigational</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <AdminInput
                  id="assignedPageUrl"
                  label="Assigned Canonical URL"
                  value={form.assignedPageUrl}
                  onChange={(e) => setForm({ ...form, assignedPageUrl: e.target.value })}
                  placeholder="/services/business-website-development"
                  required
                />
                <AdminInput
                  id="geoTarget"
                  label="Geo Target"
                  value={form.geoTarget}
                  onChange={(e) => setForm({ ...form, geoTarget: e.target.value })}
                  placeholder="e.g. Ludhiana / Punjab / National"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-semibold text-slate-700">Semantic Entities (comma separated)</label>
                <input
                  type="text"
                  value={(form.semanticEntities || []).join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      semanticEntities: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. web design, next.js, responsive"
                  className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
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
                <AdminButton type="submit">Save Target</AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
