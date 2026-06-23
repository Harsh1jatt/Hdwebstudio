"use client";
import { motion } from "framer-motion";
import { Rocket, Code, ShieldCheck, Smartphone } from "lucide-react";

const items = [
  {
    text: "Successfully Developed & Launched Complete Institute Website for Raretech, Ludhiana",
    icon: Rocket,
  },
  {
    text: "Built Custom Admin Panel for Student Management & Online Exam Processing",
    icon: Code,
  },
  {
    text: "Implemented Secure Login System with Real-Time Result & Data Protection",
    icon: ShieldCheck,
  },
  {
    text: "Mobile-First Responsive Design Optimized for All Devices & Fast Loading",
    icon: Smartphone,
  },
];

export default function ProofStrip() {
  return (
    <section className="py-20 md:py-24 bg-white border-t border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">

        {/* SEO Optimized Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-4"
        >
          Proven Web Development Results for Businesses in Ludhiana
        </motion.h2>

        {/* Supporting Line */}
        <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
          Real client work demonstrating our expertise in website development,
          admin systems, and scalable digital platforms.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-4 px-4"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>

                <p className="text-slate-800 font-medium text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
