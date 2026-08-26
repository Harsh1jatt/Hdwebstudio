"use client";

import { useEffect, useState } from 'react';
import LeadTable from './LeadTable';
import LeadDetails from './LeadDetails';
import AdminLoader from '../common/AdminLoader';
import LeadStatusBadge from './LeadStatusBadge';

const defaultPerPage = 20;

export default function LeadsManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(defaultPerPage);
  const [total, setTotal] = useState(0);
  const [selectedLead, setSelectedLead] = useState(null);

  async function loadLeads(search = '', pageNumber = 1) {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      params.set('page', String(pageNumber));
      params.set('perPage', String(perPage));
      if (search.trim()) params.set('q', search.trim());

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Unable to load leads.');
      }
      setLeads(data.leads || []);
      setTotal(data.total || 0);
      setPage(data.page || pageNumber);
      setSelectedLead(data.leads?.[0] || null);
    } catch (err) {
      setError(err.message || 'Unable to load leads.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads(query, 1);
  }, [query]);

  async function handleDelete(id) {
    if (!confirm('Delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Delete failed.');
      await loadLeads(query, page);
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Leads manager</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review inquiries</h2>
          <p className="mt-2 text-sm text-slate-500">Search, paginate, and manage contact submissions.</p>
        </div>
        <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, phone or business"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {loading ? <AdminLoader /> : null}
      {error ? <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          <LeadTable leads={leads} onDelete={handleDelete} onSelect={setSelectedLead} />
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
            <div>{Math.min(1 + (page - 1) * perPage, total)} - {Math.min(page * perPage, total)} of {total} leads</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadLeads(query, Math.max(1, page - 1))}
                disabled={page <= 1}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => loadLeads(query, page + 1)}
                disabled={page * perPage >= total}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Selected lead</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Details panel</h3>
              </div>
              <LeadStatusBadge status="New" />
            </div>
            <div className="mt-5">
              {selectedLead ? <LeadDetails lead={selectedLead} /> : <p className="text-sm text-slate-400">Choose a lead from the list to view details.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
