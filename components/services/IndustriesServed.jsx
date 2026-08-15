"use client";

import { motion } from "framer-motion";
import { Icon, Container, SectionHeading } from "./shared/ui";
import { industries } from "@/lib/services-data";

export default function IndustriesServed() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50/60 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Built Around Real Business Needs."
          description="From clinics to manufacturers, we shape every project around the goals and customers of that specific industry."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 transition-colors duration-300 group-hover:from-blue-50/60 group-hover:to-cyan-50/60" />
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <Icon name={ind.icon} className="h-5 w-5" />
              </span>
              <p className="relative mt-4 text-sm font-semibold text-slate-700">{ind.name}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
