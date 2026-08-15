"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container, SectionHeading, GradientBlob } from "./shared/ui";

export default function TestimonialsPreview({ testimonials = [] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 to-white py-24 sm:py-28">
      <GradientBlob className="right-[-8%] bottom-[-10%] h-[24rem] w-[24rem] bg-cyan-100/60" />
      <Container>
        <SectionHeading
          eyebrow="Client Feedback"
          title="Trusted By The Businesses We Work With."
          description="The best measure of our work is the experience of the people we build it for."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-7 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.15)] backdrop-blur-xl"
            >
              <Quote className="h-8 w-8 text-blue-200" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed text-slate-600">&ldquo;{t.content || t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
