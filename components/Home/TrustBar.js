"use client";
import { motion } from "framer-motion";

const stats = [
  {
    value: "3",
    label: "Real Client Projects",
    sub: "Raretech · JMD Solar · Vastu Divine",
  },
  {
    value: "⭐ 5.0",
    label: "Google Rating",
    sub: "Verified on Google Business Profile",
  },
  {
    value: "7 Days",
    label: "Average Launch Time",
    sub: "From brief to live website",
  },
  {
    value: "₹0",
    label: "Hidden Charges",
    sub: "Clear quote before work begins",
  },
];

export default function TrustBar() {
  return (
    <section
      className="bg-slate-900 border-b border-slate-800 py-10 sm:py-12"
      aria-label="Agency trust statistics"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
                {s.value}
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-300">
                {s.label}
              </span>
              <span className="text-xs text-slate-500 leading-snug">{s.sub}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-xs mt-8"
        >
          Trusted by clinics, coaching institutes, manufacturers &amp; local service businesses across Ludhiana and Punjab
        </motion.p>
      </div>
    </section>
  );
}