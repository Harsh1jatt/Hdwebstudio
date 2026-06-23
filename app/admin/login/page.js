"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/Admin/AdminLayout.client';
import GlassCard from '../../../components/common/GlassCard';
import AuthInput from '../../../components/common/AuthInput.client';
import PasswordInput from '../../../components/common/PasswordInput.client';
import { motion } from 'framer-motion';

export default function LoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e){
    e.preventDefault(); setLoading(true); setError(null);
    try{
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password }) });
      const j = await res.json();
      if(!res.ok) throw new Error(j?.error || 'Invalid credentials');
      router.push('/admin');
    }catch(err){ setError(err.message || String(err)); setLoading(false); }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen flex items-center justify-center py-20">
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }} className="w-full max-w-md px-4">
          <GlassCard>
            <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
            <p className="text-sm text-slate-300 mb-4">Sign in to manage leads and projects</p>

            <form onSubmit={submit} className="space-y-4" aria-describedby="login-error">
              <AuthInput label="Email" id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" required />
              <PasswordInput label="Password" id="password" value={password} onChange={e=>setPassword(e.target.value)} required />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="w-4 h-4" aria-label="Remember me" /> <span>Remember me</span>
                </label>
                <a className="text-sm text-blue-300/90">Forgot password?</a>
              </div>

              {error && <div id="login-error" role="alert" className="text-red-400 text-sm">{error}</div>}

              <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold ${loading? 'opacity-70' : 'hover:scale-105'}`}>
                {loading? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
