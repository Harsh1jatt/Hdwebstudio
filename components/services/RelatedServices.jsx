"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Icon, Container, SectionHeading } from "./shared/ui";

export default function RelatedServices({ currentSlug, services = [] }) {
  const related = services.filter((s) => s.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Related Services"
          title="Explore More Ways We Can Help."
          align="left"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{s.eyebrow}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
