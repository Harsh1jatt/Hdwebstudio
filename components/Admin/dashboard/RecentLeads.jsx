export default function RecentLeads({ leads }) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent leads</h2>
        <p className="text-sm text-slate-400">Latest enquiries</p>
      </div>
      <div className="mt-5 space-y-4">
        {leads.length === 0 ? (
          <p className="text-sm text-slate-400">No leads yet.</p>
        ) : (
          leads.slice(0, 5).map((lead) => (
            <div key={lead._id} className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{lead.name}</p>
                  <p className="text-sm text-slate-400">{lead.email || lead.phone || 'No contact details'}</p>
                </div>
                <p className="text-sm text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="mt-3 text-sm text-slate-300">{lead.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
