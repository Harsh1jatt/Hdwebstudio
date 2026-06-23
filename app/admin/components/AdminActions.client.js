"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminActions(){
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  async function exportFile(format){
    setDownloading(true);
    const url = '/api/admin/export-leads' + (format?`?format=${format}`:'');
    const res = await fetch(url);
    if (!res.ok) { setDownloading(false); alert('Export failed'); return; }
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = format === 'xlsx' ? 'leads.xlsx' : 'leads.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    setDownloading(false);
  }

  async function logout(){
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
  }

  return (
    <div className="flex gap-3 items-center">
      <button onClick={()=>exportFile()} className="px-3 py-2 bg-slate-100 rounded">{downloading? 'Preparing…' : 'Export CSV'}</button>
      <button onClick={()=>exportFile('xlsx')} className="px-3 py-2 bg-slate-100 rounded">{downloading? 'Preparing…' : 'Export XLSX'}</button>
      <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded">Sign out</button>
    </div>
  )
}
