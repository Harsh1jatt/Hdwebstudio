"use client";
import { motion } from "framer-motion";
import { Rocket, Search, Code, ShieldCheck } from "lucide-react";

const items = [
  { text: "12+ Projects Delivered", icon: Rocket },
  { text: "SEO Optimized Builds", icon: Search },
  { text: "MERN Stack Expertise", icon: Code },
  { text: "Trusted by Clients", icon: ShieldCheck },
];

export default function ProofStrip() {
  return (
    <section className="py-12 border-t border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <Icon className="w-7 h-7 text-blue-600" />
              <span className="text-slate-800 font-medium text-sm md:text-base">
                {item.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
