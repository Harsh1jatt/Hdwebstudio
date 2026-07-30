import {
  Mail,
  Phone,
  Building2,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

export default function LeadDetails({ lead }) {
  if (!lead) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <div>
          <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />

          <p className="mt-3 text-sm font-semibold text-slate-700">
            Select a lead
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Choose an enquiry from the list to view its details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Lead details
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {lead.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Website enquiry
            </p>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            New
          </span>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid gap-3 p-6 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Mail className="h-4 w-4" />
            Email
          </div>

          <p className="mt-2 break-all text-sm font-medium text-slate-800">
            {lead.email || "Not provided"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Phone className="h-4 w-4" />
            Phone
          </div>

          <p className="mt-2 text-sm font-medium text-slate-800">
            {lead.phone || "Not provided"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Building2 className="h-4 w-4" />
            Business
          </div>

          <p className="mt-2 text-sm font-medium text-slate-800">
            {lead.business || "Not provided"}
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="px-6 pb-6">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <MessageSquare className="h-4 w-4" />
            Project details
          </div>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {lead.message || "No message provided."}
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="border-t border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays className="h-4 w-4" />

          Received{" "}
          {new Date(lead.createdAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}