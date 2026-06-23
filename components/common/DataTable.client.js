"use client";
import React, { useMemo, useState, useEffect } from 'react';

function exportCSV(rows, filename='export.csv'){
  const csv = rows.map(r => r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}

export default function DataTable({ columns = [], data = [] }){
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [rows, setRows] = useState(data || []);
  const [downloading, setDownloading] = useState(false);

  useEffect(()=>{ setRows(data || []); setPage(1); },[data]);

  const filtered = useMemo(()=>{
    if(!query) return rows;
    const q = query.toLowerCase();
    return rows.filter(row => columns.some(col => String(row[col.accessor]||'').toLowerCase().includes(q)));
  },[rows,query,columns]);

  const paged = filtered.slice((page-1)*perPage, page*perPage);

  async function handleDelete(id){
    if(!confirm('Delete this lead?')) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    if(!res.ok) return alert('Delete failed');
    setRows(r=>r.filter(x=>x._id !== id));
  }

  async function exportFile(format){
    try{
      setDownloading(true);
      const url = '/api/admin/export-leads' + (format?`?format=${format}`:'');
      const res = await fetch(url);
      if(!res.ok){ setDownloading(false); alert('Export failed'); return; }
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = format === 'xlsx' ? 'leads.xlsx' : 'leads.csv';
      a.click();
      URL.revokeObjectURL(a.href);
      setDownloading(false);
    }catch(e){ setDownloading(false); alert('Export failed'); }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <input aria-label="Search" placeholder="Search leads" value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1)}}
            className="rounded-md px-3 py-2 bg-white/4 border border-white/8" />
          <button onClick={()=>exportCSV([columns.map(c=>c.header), ...filtered.map(r=>columns.map(col=>r[col.accessor]))])} className="px-3 py-2 bg-blue-500 rounded-md">Export CSV</button>
          <button onClick={()=>exportFile()} disabled={downloading} className="px-3 py-2 bg-slate-700 rounded-md">{downloading? 'Preparing…' : 'Export CSV (server)'} </button>
          <button onClick={()=>exportFile('xlsx')} disabled={downloading} className="px-3 py-2 bg-slate-700 rounded-md">{downloading? 'Preparing…' : 'Export XLSX'}</button>
        </div>
        <div className="text-sm text-slate-300">{filtered.length} results</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y divide-white/6">
          <thead>
            <tr className="text-left text-sm text-slate-300/80">
              {columns.map(c=> <th key={c.accessor} className="p-3">{c.header}</th>)}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((row, idx) => (
              <tr key={row._id || idx} className="hover:bg-white/3 transition-colors">
                {columns.map(c=> <td key={c.accessor} className="p-3 align-top text-sm">{c.cell ? c.cell(row) : String(row[c.accessor]||'')}</td>)}
                <td className="p-3 align-top text-sm">
                  <button onClick={()=>handleDelete(row._id)} className="px-2 py-1 bg-red-600 text-white rounded-md mr-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-2 bg-white/6 rounded-md mr-2">Prev</button>
          <button onClick={()=>setPage(p=>p+1)} className="px-3 py-2 bg-white/6 rounded-md">Next</button>
        </div>
        <div className="text-sm text-slate-300">Page {page}</div>
      </div>
    </div>
  )
}
