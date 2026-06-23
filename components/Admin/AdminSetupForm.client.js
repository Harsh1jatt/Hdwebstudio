"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSetupForm(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);
  const router = useRouter();

  async function submit(e){
    e.preventDefault(); setLoading(true); setErr(null);
    const res = await fetch('/api/setup-admin', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ name, email, password }) });
    const j = await res.json();
    if (res.ok && j.success) router.push('/admin'); else { setErr(j?.error||'Failed'); setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Admin Account</h2>
        <label className="block text-sm mb-1">Full name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" required />
        <label className="block text-sm mb-1">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" required />
        <label className="block text-sm mb-1">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded" required />
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading? 'Creating…':'Create admin'}</button>
        {err && <p className="text-red-600 mt-3">{err}</p>}
      </form>
    </div>
  )
}
