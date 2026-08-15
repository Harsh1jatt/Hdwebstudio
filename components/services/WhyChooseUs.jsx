"use client";

import { motion } from "framer-motion";
import { Icon, Container, SectionHeading, GradientBlob } from "./shared/ui";
import { whyChooseUs } from "@/lib/services-data";

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <GradientBlob className="left-1/2 top-0 h-[26rem] w-[36rem] -translate-x-1/2 bg-blue-50" />
      <Container>
        <SectionHeading
          eyebrow="Why Choose HD Web Studios"
          title="A Better Way To Build Your Digital Presence."
          description="We combine thoughtful design, modern development, performance, and SEO fundamentals — built for your business, not from a template."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white/80 p-7 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
