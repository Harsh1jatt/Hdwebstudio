"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  MessageSquare,
  Globe,
  MapPin,
  Trash2,
  StickyNote,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import AdminLoader from "@/components/Admin/common/AdminLoader";
import LeadStatusBadge from "@/components/Admin/leads/LeadStatusBadge";

const sourceLabels = {
  "contact-form": "Contact Form",
  "audit-form": "Audit Form",
  "whatsapp": "WhatsApp",
  "direct": "Direct",
  "referral": "Referral",
};

export default function LeadDetailClient({ leadId }) {
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    async function fetchLead() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/leads/${leadId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load lead.");
        setLead(data.lead);
        setNotes(data.lead?.notes || "");
      } catch (err) {
        setError(err.message || "Failed to load lead.");
      } finally {
        setLoading(false);
      }
    }
    if (leadId) fetchLead();
  }, [leadId]);

  async function handleStatusChange(newStatus) {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      setLead((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      alert(err.message || "Update failed.");
    }
  }

  async function handleSaveNotes() {
    setNotesSaving(true);
    setNotesSaved(false);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save notes.");
      setLead((prev) => (prev ? { ...prev, notes } : prev));
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    } catch (err) {
      alert(err.message || "Failed to save notes.");
    } finally {
      setNotesSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      router.push("/admin/leads");
    } catch (err) {
      alert(err.message || "Delete failed.");
    }
  }

  if (loading) return <AdminLoader />;

  if (error) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => router.push("/admin/leads")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </button>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => router.push("/admin/leads")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </button>

        <div className="flex items-center gap-3">
          <LeadStatusBadge
            status={lead.status || "new"}
            onStatusChange={handleStatusChange}
          />
          <button
            onClick={handleDelete}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            title="Delete lead"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lead Header Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Lead details
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">{lead.name}</h1>
          {lead.business && (
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Building2 className="h-4 w-4" />
              {lead.business}
            </p>
          )}
        </div>

        {/* Contact Info Grid */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Mail className="h-4 w-4" />
              Email
            </div>
            {lead.email ? (
              <a
                href={`mailto:${lead.email}`}
                className="mt-2 flex items-center gap-1.5 break-all text-sm font-medium text-blue-600 hover:underline"
              >
                {lead.email}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            ) : (
              <p className="mt-2 text-sm text-slate-400">Not provided</p>
            )}
          </div>

          {/* Phone */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Phone className="h-4 w-4" />
              Phone
            </div>
            {lead.phone ? (
              <a
                href={`tel:${lead.phone}`}
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                {lead.phone}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            ) : (
              <p className="mt-2 text-sm text-slate-400">Not provided</p>
            )}
          </div>

          {/* WhatsApp */}
          {lead.whatsapp && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Phone className="h-4 w-4" />
                WhatsApp
              </div>
              <a
                href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium text-green-600 hover:underline"
              >
                {lead.whatsapp}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </div>
          )}

          {/* Website */}
          {lead.website && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Globe className="h-4 w-4" />
                Website
              </div>
              <a
                href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 break-all text-sm font-medium text-blue-600 hover:underline"
              >
                {lead.website}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </div>
          )}

          {/* Source */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <MapPin className="h-4 w-4" />
              Source
            </div>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {sourceLabels[lead.source] || lead.source || "Unknown"}
            </p>
          </div>

          {/* Received Date */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <CalendarDays className="h-4 w-4" />
              Received
            </div>
            <p className="mt-2 text-sm font-medium text-slate-800">
              {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {" at "}
              {new Date(lead.createdAt).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <MessageSquare className="h-4 w-4" />
          Message / Project Details
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
          {lead.message || "No message provided."}
        </p>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <StickyNote className="h-4 w-4" />
          Internal Notes
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Add private notes about this lead..."
          className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleSaveNotes}
            disabled={notesSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {notesSaving ? "Saving..." : "Save Notes"}
          </button>
          {notesSaved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Saved
            </span>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        )}
        {lead.phone && (
          <a
            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
        )}
        {lead.email && (
          <a
            href={`mailto:${lead.email}?subject=RE: Your enquiry to HD Web Studios`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" />
            Reply via Email
          </a>
        )}
      </div>
    </div>
  );
}
