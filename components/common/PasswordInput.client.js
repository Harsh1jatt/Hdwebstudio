"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ label, id, value, onChange, placeholder }){
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <div className="mt-2 relative">
        <input id={id} type={visible ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full rounded-lg px-4 py-3 bg-white/4 border border-white/8 focus:outline-none focus:ring-2 focus:ring-blue-400/60" />
        <button type="button" aria-label={visible? 'Hide password':'Show password'} onClick={()=>setVisible(v=>!v)} className="absolute right-3 top-3 text-slate-200/80">
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  )
}
