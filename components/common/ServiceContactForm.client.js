"use client";
import { useState } from "react";

export default function ServiceContactForm({ service }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service })
      });
      if (!res.ok) throw new Error('network');
      setStatus('sent');
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required placeholder="Your name" className="w-full p-3 rounded bg-white/5" />
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required type="email" placeholder="Email" className="w-full p-3 rounded bg-white/5" />
      <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone (optional)" className="w-full p-3 rounded bg-white/5" />
      <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required placeholder={`How can we help with ${service}?`} className="w-full p-3 rounded bg-white/5 min-h-[120px]" />
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-purple-500 text-white" type="submit">Request Proposal</button>
        {status === 'sending' && <span>Sending…</span>}
        {status === 'sent' && <span className="text-green-400">Sent — we’ll contact you soon.</span>}
        {status === 'error' && <span className="text-red-400">Failed to send. Try again.</span>}
      </div>
    </form>
  );
}
