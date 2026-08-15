"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import ServiceIcon from "@/components/common/ServiceIcon";
import { fadeUp, staggerContainer } from "../../lib/motion";

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

export default function Services({ services = [] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={
              shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600"
          >
            What We Do
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl"
          >
            Websites & Web Experiences
            <br className="hidden md:block" />
            <span className="text-slate-500">
              {" "}
              Built Around Your Business.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            From professional business websites to custom web applications, we
            build fast, modern digital experiences that help businesses
            establish credibility, reach more customers, and operate better
            online.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16"
        >
          {services.map((service, index) => {
            const accentKey = service.accent || "blue";
            const accent = accentMap[accentKey] || accentMap.blue;
            const outcomes = service.whatYouGet
              ?.slice(0, 4)
              .map((item) => item.title);

            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${accent.wrapper}`}
                  >
                    <ServiceIcon
                      name={service.icon}
                      className={`h-7 w-7 ${accent.icon}`}
                      size={28}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  {service.eyebrow}
                </h3>

                <p className="mt-2 text-sm font-semibold text-blue-600">
                  {service.tagline}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>

                {outcomes?.length > 0 && (
                  <div className="mt-7 border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What You Get
                    </p>

                    <ul className="mt-3 space-y-2.5">
                      {outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{outcome}</span>
                        </li>
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
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 20 }
          }
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-16 text-center lg:mt-20"
        >
          <p className="text-sm font-medium text-slate-500">
            Not sure what your business needs?
          </p>

          <h3 className="mx-auto mt-2 max-w-2xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Tell us what you&apos;re trying to achieve.
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            We&apos;ll help you figure out whether you need a website, web
            application, SEO, or ongoing support.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Get a Free Consultation
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              View All Services
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Fast Delivery · Direct Developer Support · Transparent Pricing
          </p>
        </motion.div>
      </div>
    </section>
  );
}
