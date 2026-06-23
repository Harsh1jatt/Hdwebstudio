import React from 'react'

export default function PageHeader({ title, subtitle, actions }){
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-slate-300/80">{subtitle}</p>}
      </div>
      <div>{actions}</div>
    </div>
  )
}
