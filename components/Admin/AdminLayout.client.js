"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }){
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#021024] via-[#07142a] to-[#031428] text-slate-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 opacity-30 rounded-full blur-3xl animate-blob" />
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-400 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000" />
      </div>

      <header className="z-10 relative py-6 px-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-center">HD</div>
          <div>
            <h1 className="font-bold text-lg">Harshdeep — Admin</h1>
            <p className="text-sm text-slate-300/70">Premium dashboard</p>
          </div>
        </div>
      </header>

      <main className="z-10 relative max-w-6xl mx-auto p-6">{children}</main>

      <footer className="relative max-w-6xl mx-auto p-6 text-sm text-slate-400">© {new Date().getFullYear()} Harshdeep Web Studios</footer>
    </div>
  )
}
