"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Gauge,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: CheckCircle2,
    value: "3+",
    label: "Projects Delivered",
    description: "Real-world digital projects",
  },
  {
    icon: Gauge,
    value: "Fast",
    label: "Performance Focused",
    description: "Built for speed and usability",
  },
  {
    icon: Clock3,
    value: "7–14 Days",
    label: "Typical Launch",
    description: "For standard business websites",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Project Ownership",
    description: "Your website, content and data",
  },
];

export default function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid grid-cols-2 divide-x divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 md:grid-cols-4 md:divide-y-0"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group relative px-5 py-6 transition-colors duration-200 hover:bg-white sm:px-6"
              >
                {/* Subtle hover indicator */}
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-blue-600 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:border-blue-200 group-hover:bg-blue-100">
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                      {item.value}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {item.label}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

