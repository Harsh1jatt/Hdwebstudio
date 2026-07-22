"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

/**
 * services: [{ href, label, description?, icon?: LucideIcon }]
 * icon/description optional — cards fall back to a simpler look without them.
 */
export default function MegaMenu({ services }) {
  return (
    <motion.div
      role="region"
      aria-label="Services"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      // Key overflow fixes:
      // - w-[min(94vw,760px)] caps the width to whichever is smaller: 94% of
      //   the viewport, or 760px. It can never exceed the screen.
      // - left-1/2 -translate-x-1/2 centers the panel on its trigger instead
      //   of growing rightward from left-0, so it can't run off either edge.
      className="absolute left-1/2 top-full z-50 mt-3 w-[min(94vw,760px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-900/[0.10] ring-1 ring-slate-900/[0.04]"
    >
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Our Services
          </p>
          <span className="hidden items-center gap-1 text-[11px] font-medium text-slate-400 sm:flex">
            <Sparkles size={12} aria-hidden="true" />
            Pick what fits, or let us guide you
          </span>
        </div>

        {/* Card grid */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group relative flex h-full flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md hover:shadow-blue-900/[0.06]"
                >
                  {Icon && (
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="flex items-start justify-between gap-1 text-[13.5px] font-semibold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-blue-600">
                      {service.label}
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    {service.description && (
                      <span className="mt-1 block text-[12px] leading-relaxed text-slate-500">
                        {service.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA banner */}
        <div className="relative mt-4 flex flex-col items-start justify-between gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-4 sm:flex-row sm:items-center sm:p-5">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="text-[13.5px] font-semibold text-white">
              Not sure where to start?
            </p>
            <p className="mt-0.5 text-[12.5px] text-slate-300">
              Tell us what you&apos;re building — we&apos;ll help you scope it.
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-slate-900 transition-colors duration-150 hover:bg-blue-50"
          >
            Let&apos;s talk
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <Link
        href="/services"
        className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-[13px] font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-blue-600 sm:px-6"
      >
        View all services
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </motion.div>
  );
}