"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/common/ServiceIcon";
import { CONTAINER, SECTION_Y, SectionHeading, PrimaryCTA, CheckItem } from "./ui";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const accentMap = {
  blue: { wrapper: "bg-blue-50 text-blue-600 group-hover:bg-blue-100", icon: "text-blue-600" },
  emerald: { wrapper: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100", icon: "text-emerald-600" },
  purple: { wrapper: "bg-purple-50 text-purple-600 group-hover:bg-purple-100", icon: "text-purple-600" },
  orange: { wrapper: "bg-orange-50 text-orange-600 group-hover:bg-orange-100", icon: "text-orange-600" },
};

export default function ServicesSection({ services }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className={`relative overflow-hidden bg-white ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Websites & Web Experiences
              <br className="hidden md:block" />
              <span className="text-slate-500"> Built Around Your Business.</span>
            </>
          }
          description="From professional business websites to custom web applications, we build fast, modern digital experiences that help businesses establish credibility, reach more customers, and operate better online."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16"
        >
          {services.map((service, index) => {
            const accent = accentMap[service.accent || "blue"] || accentMap.blue;
            const outcomes = service.whatYouGet?.slice(0, 4).map((item) => item.title);

            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${accent.wrapper}`}>
                    <ServiceIcon name={service.icon} className={`h-7 w-7 ${accent.icon}`} size={28} strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{service.eyebrow}</h3>
                <p className="mt-2 text-sm font-semibold text-blue-600">{service.tagline}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>

                {outcomes?.length > 0 && (
                  <div className="mt-7 border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What You Get</p>
                    <ul className="mt-3 space-y-2.5">
                      {outcomes.map((outcome) => (
                        <CheckItem key={outcome}>{outcome}</CheckItem>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>

                <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 text-center lg:mt-20"
        >
          <p className="text-sm font-medium text-slate-500">Not sure what your business needs?</p>
          <h3 className="mx-auto mt-2 max-w-2xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Tell us what you&apos;re trying to achieve.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            We&apos;ll help you figure out whether you need a website, web application, SEO, or ongoing support.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCTA href="/contact">Get a Free Audit</PrimaryCTA>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              View All Services
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-400">Fast Delivery · Direct Developer Support · Transparent Pricing</p>
        </motion.div>
      </div>
    </section>
  );
}
