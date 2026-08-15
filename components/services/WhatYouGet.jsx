"use client";

import { motion } from "framer-motion";
import { Icon, Container, SectionHeading } from "./shared/ui";

export default function WhatYouGet({ service }) {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50/60 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What You Get"
          title="Everything Included, Nothing Half-Built."
          description="A complete, production-ready package designed around this service — not a stripped-down starting point."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.whatYouGet.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="relative mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
