"use client";

import { useRouter } from "next/navigation";
import {
  Eye,
  Trash2,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  Tag,
} from "lucide-react";

import LeadStatusBadge from "./LeadStatusBadge";

const SOURCE_LABELS = {
  "contact-page": "Contact Page",
  "audit-form": "Free Audit",
  "whatsapp": "WhatsApp",
  "website": "Website",
  "referral": "Referral",
};

const PRIORITY_STYLES = {
  low: "bg-slate-100 text-slate-600",
  normal: "bg-blue-50 text-blue-600",
  high: "bg-amber-50 text-amber-700",
  urgent: "bg-rose-50 text-rose-700 font-bold",
};

export default function LeadTable({
  leads = [],
  onDelete,
  onStatusChange,
}) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Lead
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Business / Source
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Received
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      No leads found
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Enquiries matching your search or filters will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const sourceLabel =
                  SOURCE_LABELS[lead.source] || lead.source || "Website";
                const priorityClass =
                  PRIORITY_STYLES[lead.priority] || PRIORITY_STYLES.normal;

                return (
                  <tr
                    key={lead._id}
                    className="transition hover:bg-slate-50/80"
                  >
                    {/* Lead Name & ID */}
                    <td className="px-6 py-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">
                            {lead.name}
                          </p>
                          {lead.priority && lead.priority !== "normal" && (
                            <span
                              className={`rounded-md px-1.5 py-0.5 text-[10px] uppercase font-semibold ${priorityClass}`}
                            >
                              {lead.priority}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-400">
                          Lead #{String(lead._id).slice(-6)}
                        </p>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-blue-600"
                          >
                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                            {lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600"
                          >
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            {lead.email}
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Business & Source */}
                    <td className="px-6 py-5">
                      <div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span>{lead.business || "Individual"}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Tag className="h-3 w-3" />
                          <span>{sourceLabel}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status with inline selector */}
                    <td className="px-6 py-5">
                      <LeadStatusBadge
                        status={lead.status || "new"}
                        onStatusChange={
                          onStatusChange
                            ? (newStatus) => onStatusChange(lead._id, newStatus)
                            : undefined
                        }
                      />
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <CalendarDays className="h-4 w-4 text-slate-400" />
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => router.push(`/admin/leads/${lead._id}`)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete?.(lead._id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 lg:hidden">
        {leads.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Mail className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-700">
              No leads found
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Website enquiries will appear here.
            </p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead._id} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {lead.business || "Individual"} &bull;{" "}
                    {SOURCE_LABELS[lead.source] || lead.source || "Website"}
                  </p>
                </div>
                <LeadStatusBadge
                  status={lead.status || "new"}
                  onStatusChange={
                    onStatusChange
                      ? (newStatus) => onStatusChange(lead._id, newStatus)
                      : undefined
                  }
                />
              </div>

              <div className="space-y-1 text-sm text-slate-600">
                {lead.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {lead.phone}
                  </p>
                )}
                {lead.email && (
                  <p className="flex items-center gap-2 text-xs">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {lead.email}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => router.push(`/admin/leads/${lead._id}`)}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  View details
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(lead._id)}
                  className="rounded-xl border border-red-200 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}