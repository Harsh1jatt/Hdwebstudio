"use client";
import { motion } from "framer-motion";

const stats = [
  { number: "25+", label: "Projects Delivered", emoji: "🚀" },
  { number: "⭐ 5.0", label: "Google Rating", emoji: null },
  { number: "7 Days", label: "Average Launch Time", emoji: "⚡" },
  { number: "₹0", label: "Hidden Charges. Ever.", emoji: "✅" },
];

export default function ProofStrip() {
  return (
    <section className="py-12 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {stat.number}
              </span>
              <span className="text-sm text-slate-400 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          Trusted by clinics, coaching institutes, manufacturers &amp; service businesses across Ludhiana and Punjab
        </motion.p>

      </div>
    </section>
  );
}