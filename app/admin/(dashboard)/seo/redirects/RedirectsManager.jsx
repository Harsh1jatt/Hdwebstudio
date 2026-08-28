"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
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
  RefreshCw,
  Zap,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import AdminButton from "@/components/Admin/common/AdminButton";
import AdminInput from "@/components/Admin/common/AdminInput";

export default function RedirectsManager() {
  const [redirects, setRedirects] = useState([]);
  const [chains, setChains] = useState([]);
  const [loops, setLoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    source: "",
    destination: "",
    statusCode: 301,
    reason: "",
    isActive: true,
  });

  async function loadRedirects() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo/redirects");
      const data = await res.json();
      if (data.success) {
        setRedirects(data.redirects || []);
        setChains(data.chains || []);
        setLoops(data.loops || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRedirects();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `/api/admin/seo/redirects/${editingItem._id}` : "/api/admin/seo/redirects";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setEditingItem(null);
        loadRedirects();
      } else {
        alert(data.error || "Save failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to remove this redirect rule?")) return;
    try {
      const res = await fetch(`/api/admin/seo/redirects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) loadRedirects();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  async function handleFlattenChain(chain) {
    if (!confirm(`Flatten redirect chain to point "${chain.source}" directly to "${chain.finalDestination}"?`)) return;
    try {
      const target = redirects.find((r) => r.source === chain.source);
      if (!target) return;
      const res = await fetch(`/api/admin/seo/redirects/${target._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, destination: chain.finalDestination }),
      });
      const data = await res.json();
      if (data.success) loadRedirects();
    } catch (err) {
      alert("Failed to flatten chain: " + err.message);
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    setForm({
      source: "",
      destination: "",
      statusCode: 301,
      reason: "",
      isActive: true,
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
          <h1 className="text-2xl font-bold text-slate-900">SEO 301/302 Redirect Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Safely manage URL migrations, preserve Google search authority, and prevent multi-hop redirect chains and infinite loops.
          </p>
        </div>
        <AdminButton onClick={openCreateModal}>
          <Plus size={14} /> Add Redirect Rule
        </AdminButton>
      </div>

      {/* Redirect Chain / Loop Warnings */}
      {loops.length > 0 && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-red-900 text-sm">
            <XCircle className="h-5 w-5 text-red-600" />
            <span>Infinite Redirect Loop Detected ({loops.length})</span>
          </div>
          <p className="text-xs text-red-700">
            A circular loop was detected which will prevent users and Googlebot from rendering the page:
          </p>
          <ul className="space-y-1 text-xs font-mono text-red-800">
            {loops.map((l, i) => (
              <li key={i}>• {l.loopChain.join(" → ")}</li>
            ))}
          </ul>
        </div>
      )}

      {chains.length > 0 && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <span>Redirect Chains Detected ({chains.length})</span>
          </div>
          <p className="text-xs text-amber-800">
            Multi-hop redirect chains cause latency and dilute PageRank link equity. Flatten these rules directly:
          </p>
          <div className="space-y-2">
            {chains.map((c, i) => (
              <div key={i} className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-white p-3 text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-900">{c.fullPath}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Length: {c.chainLength} hops</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFlattenChain(c)}
                  className="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-amber-700"
                >
                  <Zap size={12} /> Flatten to 1 Hop
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules Table */}
      {loading ? (
        <AdminLoader rows={5} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-5">Source Path</th>
                  <th className="py-3.5 px-4">Destination Path</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Hits</th>
                  <th className="py-3.5 px-4">Reason / Notes</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {redirects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                      No redirect rules defined.
                    </td>
                  </tr>
                ) : (
                  redirects.map((rule) => (
                    <tr key={rule._id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-5 font-mono font-semibold text-slate-900">
                        {rule.source}
                      </td>

                      <td className="py-4 px-4 font-mono font-semibold text-blue-600">
                        {rule.destination}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            rule.statusCode === 301 ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {rule.statusCode} Permanent
                        </span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-800 whitespace-nowrap">
                        {rule.hits || 0}
                      </td>

                      <td className="py-4 px-4 text-slate-500 max-w-[200px] truncate">
                        {rule.reason || "URL migration"}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                            rule.isActive ? "text-emerald-700" : "text-slate-400"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${rule.isActive ? "bg-emerald-500" : "bg-slate-300"}`} />
                          {rule.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(rule)}
                            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(rule._id)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scaleUp">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? "Edit Redirect Rule" : "Add 301 / 302 Redirect Rule"}
            </h3>

            <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
              <AdminInput
                id="source"
                label="Old Source URL or Path"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                placeholder="/services/old-service-url"
                required
              />

              <AdminInput
                id="destination"
                label="New Target Destination"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                placeholder="/services/new-canonical-service"
                required
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-semibold text-slate-700">Status Code</label>
                  <select
                    value={form.statusCode}
                    onChange={(e) => setForm({ ...form, statusCode: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
                  >
                    <option value={301}>301 (Moved Permanently — Passes SEO)</option>
                    <option value={302}>302 (Found / Temporary)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-semibold text-slate-700">Rule State</label>
                  <select
                    value={form.isActive ? "true" : "false"}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 font-medium outline-none"
                  >
                    <option value="true">Active (Enforced)</option>
                    <option value="false">Disabled (Paused)</option>
                  </select>
                </div>
              </div>

              <AdminInput
                id="reason"
                label="Migration Reason / Notes"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="e.g. Fixed misspelled slug / restructured service pages"
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <AdminButton type="submit">Save Redirect</AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
