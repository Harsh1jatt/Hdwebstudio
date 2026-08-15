"use client";

import { motion } from "framer-motion";
import { Icon, Container, SectionHeading } from "./shared/ui";
import { techStack } from "@/lib/services-data";

export default function TechStack() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Technologies We Use"
          title="A Modern, Battle-Tested Stack."
          description="We build with tools chosen for performance and long-term maintainability — not whatever's trending this month."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.04 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600">
                <Icon name={tech.icon} className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-slate-600">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
