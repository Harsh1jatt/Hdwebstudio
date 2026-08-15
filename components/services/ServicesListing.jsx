"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import ServiceIcon from "@/components/common/ServiceIcon";

const accentMap = {
  blue: {
    wrapper: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    icon: "text-blue-600",
  },
  emerald: {
    wrapper: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    icon: "text-emerald-600",
  },
  purple: {
    wrapper: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    icon: "text-purple-600",
  },
  orange: {
    wrapper: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    icon: "text-orange-600",
  },
};

export default function ServicesListing({ services = [] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-pink-100/30 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
        >
          Our Services
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-lg text-gray-600"
        >
          End-to-end digital solutions designed to help your business establish
          credibility, reach more customers, and operate better online.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {services.map((service, index) => {
            const accentKey = service.accent || "blue";
            const accent = accentMap[accentKey] || accentMap.blue;

            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-lg transition hover:shadow-2xl"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${accent.wrapper}`}
                >
                  <ServiceIcon
                    name={service.icon}
                    className={`h-7 w-7 ${accent.icon}`}
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <p className="text-xs font-bold tracking-widest text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                  {service.eyebrow}
                </h2>

                <p className="mt-2 text-sm font-semibold text-blue-600">
                  {service.tagline}
                </p>

                <p className="mt-4 leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  View service details
                  <ArrowUpRight size={16} />
                </Link>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-16 text-white shadow-xl"
        >
          <h3 className="mb-4 text-3xl font-bold">Ready to Work With Us?</h3>
          <p className="mx-auto mb-6 max-w-2xl text-lg">
            Tell us what you&apos;re trying to achieve and we&apos;ll help you
            choose the right service.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
          >
            Book a Free Consultation
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
