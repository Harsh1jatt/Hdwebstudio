import React from 'react'

export default function GlassCard({ children, className = '' }){
  return (
    <div className={`rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md shadow-xl p-6 ${className}`}>
      {children}
    </div>
  )
}
