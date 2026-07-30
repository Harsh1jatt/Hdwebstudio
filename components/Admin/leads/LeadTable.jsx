"use client";

import {
  Eye,
  Trash2,
  Mail,
  Phone,
  Building2,
  CalendarDays,
} from "lucide-react";

export default function LeadTable({
  leads = [],
  onDelete,
  onSelect,
}) {
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
                Business
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
                <td
                  colSpan="5"
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto max-w-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      No leads found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      New enquiries from your website will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="transition hover:bg-slate-50"
                >
                  {/* Lead */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {lead.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Lead #{String(lead._id).slice(-6)}
                      </p>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-5">
                    <div className="space-y-1.5">
                      {lead.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          {lead.email}
                        </div>
                      )}

                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Business */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 className="h-4 w-4 text-slate-400" />

                      <span>
                        {lead.business || "Not provided"}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      {new Date(
                        lead.createdAt
                      ).toLocaleDateString("en-GB", {
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
                        onClick={() => onSelect?.(lead)}
                        className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
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
              ))
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
            <div
              key={lead._id}
              className="p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {lead.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {lead.business || "No business name"}
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                  New
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {lead.email && (
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {lead.email}
                  </p>
                )}

                {lead.phone && (
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {lead.phone}
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelect?.(lead)}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  View details
                </button>

                <button
                  type="button"
                  onClick={() => onDelete?.(lead._id)}
                  className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
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