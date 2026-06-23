"use client";
import { useState, useEffect } from 'react';

export default function LeadsManager({ initial }){
  const [leads, setLeads] = useState(initial || []);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [total, setTotal] = useState(0);

  async function search(term, p = 1){
    setLoading(true);
    const qs = new URLSearchParams();
    if (term) qs.set('q', term);
    qs.set('page', String(p));
    qs.set('perPage', String(perPage));
    const url = '/api/admin/leads?' + qs.toString();
    const res = await fetch(url);
    if (!res.ok) { setLoading(false); alert('Search failed'); return; }
    const j = await res.json();
    setLeads(j.leads || []);
    setTotal(j.total || 0);
    setPage(j.page || p);
    setLoading(false);
  }

  useEffect(()=>{ if (!q) return; const t = setTimeout(()=>search(q,1), 300); return ()=>clearTimeout(t); }, [q]);

  useEffect(()=>{ // initial load
    search('', 1);
  }, []);

  async function del(id){
    if (!confirm('Delete this lead?')) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Delete failed');
    // reload current page
    await search(q, page);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search leads..." className="px-3 py-2 border rounded w-full" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Business</th>
              <th>Message</th>
              <th>Received</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l)=> (
              <tr key={l._id} className="border-b align-top">
                <td className="py-3 pr-4">{l.name}</td>
                <td className="pr-4">{l.phone}</td>
                <td className="pr-4">{l.email || '—'}</td>
                <td className="pr-4">{l.business || '—'}</td>
                <td className="pr-4 max-w-xs truncate">{l.message}</td>
                <td className="pr-4">{new Date(l.createdAt).toLocaleString()}</td>
                <td><button onClick={()=>del(l._id)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <button onClick={()=>{ if(page>1) search(q, page-1); }} className="px-3 py-2 bg-white/6 rounded-md mr-2">Prev</button>
          <button onClick={()=>{ if(page*perPage < total) search(q, page+1); }} className="px-3 py-2 bg-white/6 rounded-md">Next</button>
        </div>
        <div className="text-sm text-slate-300">Page {page} — {total} total</div>
      </div>
    </div>
  )
}
