"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import ServiceIcon from "@/components/common/ServiceIcon";

/**
 * services: [{ href, label, description?, icon?: string }]
 * icon is a Lucide icon name resolved client-side via ServiceIcon.
 */
export default function MegaMenu({ services = [] }) {
  return (
    <motion.div
      role="region"
      aria-label="Services"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full z-50 mt-3 w-[min(94vw,760px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/[0.08]"
    >
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Engineered Capabilities
          </p>
          <span className="hidden items-center gap-1 text-[11px] font-semibold text-blue-600 sm:flex">
            <Sparkles size={12} aria-hidden="true" />
            Bespoke Next.js Architectures
          </span>
        </div>

        {/* Card grid */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map((service) => {
            return (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group relative flex h-full flex-col gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-600/10"
                >
                  {service.icon && (
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-blue-600 shadow-xs transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      <ServiceIcon name={service.icon} size={16} strokeWidth={2} />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="flex items-start justify-between gap-1 text-[13px] font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                      {service.label}
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 text-blue-600"
                      />
                    </span>
                    {service.description && (
                      <span className="mt-1 block text-[11.5px] leading-relaxed text-slate-500 line-clamp-2">
                        {service.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Light CTA banner */}
        <div className="relative mt-4 flex flex-col items-start justify-between gap-3 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50/70 p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            <p className="text-[13.5px] font-bold text-slate-900">
              Need technical guidance on your architecture?
            </p>
            <p className="mt-0.5 text-[12px] text-slate-600">
              Speak directly with our lead software engineer to scope your project.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-blue-700"
          >
            Start Discovery
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <Link
        href="/services"
        className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 sm:px-6"
      >
        <span>Explore All Services &amp; Growth Frameworks</span>
        <ArrowRight size={13} aria-hidden="true" />
      </Link>
    </motion.div>
  );
}