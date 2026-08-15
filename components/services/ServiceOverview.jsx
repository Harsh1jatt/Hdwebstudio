"use client";

import { motion } from "framer-motion";
import { Icon, Container, GradientBlob } from "./shared/ui";

export default function ServiceOverview({ service }) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <GradientBlob className="right-[-10%] top-1/3 h-[24rem] w-[24rem] bg-blue-100/50" />
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {service.overview.heading}
            </h2>
            <div className="flex flex-col gap-4">
              {service.overview.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-2 flex flex-col gap-4">
              {service.overview.highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-colors duration-300 hover:border-blue-100 hover:bg-blue-50/50"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-100">
                    <Icon name={h.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{h.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{h.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Side visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-50 to-cyan-50" />
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{service.eyebrow}</p>
                  <p className="text-xs text-slate-400">HD Web Studios</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-5">
                {[92, 78, 96].map((val, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>{["Performance", "SEO Readiness", "Responsiveness"][i]}</span>
                      <span className="text-slate-700">{val}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
