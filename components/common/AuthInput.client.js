"use client";
import React from 'react'

export default function AuthInput({ label, id, type = 'text', value, onChange, placeholder, autoComplete }){
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-lg px-4 py-3 bg-white/4 border border-white/8 focus:outline-none focus:ring-2 focus:ring-blue-400/60" />
    </label>
  )
}
