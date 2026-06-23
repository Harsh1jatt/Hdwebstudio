"use client";
import React, { useState } from 'react';
import GlassCard from '../../components/common/GlassCard';
import AuthInput from '../../components/common/AuthInput.client';
import PasswordInput from '../../components/common/PasswordInput.client';
import { motion } from 'framer-motion';

function passwordStrength(p){
  let score = 0;
  if(!p) return 0;
  if(p.length > 7) score++; if(/[A-Z]/.test(p)) score++; if(/[0-9]/.test(p)) score++; if(/[^A-Za-z0-9]/.test(p)) score++;
  return score;
}

export default function SetupAdminForm(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(null);

  async function submit(e){
    e.preventDefault(); setLoading(true); setError(null);
    if(password !== confirm){ setError('Passwords do not match'); setLoading(false); return; }
    try{
      const res = await fetch('/api/admin/setup', { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      if(!res.ok) throw new Error('Failed to setup admin');
      setSuccess(true);
    }catch(err){ setError(err.message || String(err)); }
    setLoading(false);
  }

  if(success) return (
    <div className="max-w-md mx-auto">
      <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }} className="text-center">
        <GlassCard>
          <h2 className="text-2xl font-bold">Setup Complete</h2>
          <p className="mt-3 text-slate-300">Admin user registered. You can now <a href="/admin/login" className="text-blue-300">sign in</a>.</p>
        </GlassCard>
      </motion.div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto">
      <motion.div initial={{ y:10, opacity:0 }} animate={{ y:0, opacity:1 }}>
        <GlassCard>
          <h2 className="text-2xl font-bold mb-2">Create Admin Account</h2>
          <p className="text-sm text-slate-300 mb-4">One-time setup to register the admin account.</p>

          <form onSubmit={submit} className="space-y-4">
            <AuthInput label="Email" id="sa_email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <PasswordInput label="Password" id="sa_password" value={password} onChange={e=>setPassword(e.target.value)} />
            <PasswordInput label="Confirm Password" id="sa_confirm" value={confirm} onChange={e=>setConfirm(e.target.value)} />

            <div className="text-sm">
              <div className="text-slate-300">Password strength:</div>
              <div className="h-2 mt-2 bg-white/6 rounded-full overflow-hidden">
                <div style={{ width: `${(passwordStrength(password)/4) * 100}%` }} className="h-full bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 transition-all" />
              </div>
            </div>

            {error && <div role="alert" className="text-red-400 text-sm">{error}</div>}

            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold">{loading? 'Creating...' : 'Create Admin'}</button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
