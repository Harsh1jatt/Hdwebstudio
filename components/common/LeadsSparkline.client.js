"use client";
import React from 'react';

export default function LeadsSparkline({ leads = [], days = 14 }){
  // compute counts per day for the last `days`
  const buckets = [];
  const today = new Date();
  for(let i = days-1; i>=0; i--){
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    buckets.push({ date: d.toDateString(), count: 0 });
  }

  for(const l of leads){
    const d = new Date(l.createdAt).toDateString();
    const b = buckets.find(x=>x.date === d);
    if(b) b.count++;
  }

  const max = Math.max(1, ...buckets.map(b=>b.count));
  const points = buckets.map((b, i) => {
    const x = (i/(buckets.length-1))*100;
    const y = 100 - (b.count/max)*100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-28">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <polyline fill="none" stroke="url(#g)" strokeWidth="2" points={points} />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-xs text-slate-300 mt-2">Leads in last {days} days</div>
    </div>
  )
}
