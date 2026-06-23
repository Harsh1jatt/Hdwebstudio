import React from 'react'

export default function DashboardCard({ title, value, delta, children }){
  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-white/3 to-white/2 border border-white/6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-slate-300">{title}</h3>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
        {delta && <div className="text-sm text-green-400">{delta}</div>}
      </div>
      {children}
    </div>
  )
}
