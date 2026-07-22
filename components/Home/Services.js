"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
Globe2,
LayoutDashboard,
SearchCheck,
Wrench,
ArrowRight,
CheckCircle2,
} from "lucide-react";
import Link from "next/link";

import { fadeUp, staggerContainer } from "../../lib/motion";

const services = [
{
title: "Business Website Development",
tagline: "A professional website built to represent your business.",
desc: "We design and develop fast, modern, mobile-first websites for businesses that want a stronger digital presence. Every website is built with clean UX, SEO fundamentals, performance, and clear conversion paths in mind.",
idealFor: [
"Local & service businesses",
"Clinics & professionals",
"Coaching institutes",
"Manufacturers & growing brands",
],
outcomes: [
"Professional online presence",
"Mobile-first user experience",
"SEO-ready technical foundation",
"Clear enquiry and conversion paths",
],
icon: Globe2,
accent: "blue",
},
{
title: "Web App Development",
tagline: "Turn complex business workflows into simple web experiences.",
desc: "We build custom web applications that run directly in the browser — from student portals and examination systems to booking platforms, dashboards, and other custom digital experiences tailored to your business requirements.",
idealFor: [
"Student & examination portals",
"Booking & enquiry systems",
"Customer dashboards",
"Custom business workflows",
],
outcomes: [
"Accessible from any modern device",
"Custom functionality around your workflow",
"Secure user authentication",
"Scalable architecture for future growth",
],
icon: LayoutDashboard,
accent: "emerald",
},
{
title: "SEO & Website Growth",
tagline: "Build visibility where your customers are searching.",
desc: "We optimize websites for search engines and real users — from technical SEO and on-page optimization to local search visibility, content structure, and performance improvements.",
idealFor: [
"Local businesses",
"Service providers",
"Growing brands",
"Businesses targeting Google search",
],
outcomes: [
"Search-engine-friendly website structure",
"Improved technical SEO foundations",
"Better local search visibility",
"Content and page structure built for discoverability",
],
icon: SearchCheck,
accent: "purple",
},
{
title: "Website Maintenance & Support",
tagline: "Keep your website secure, updated, and performing.",
desc: "Your website should continue working after launch. We provide ongoing maintenance and support for updates, content changes, bug fixes, performance improvements, and technical assistance when you need it.",
idealFor: [
"Existing business websites",
"Growing companies",
"Businesses without an in-house developer",
"Websites requiring ongoing updates",
],
outcomes: [
"Regular website updates and changes",
"Technical issues handled efficiently",
"Performance and security maintenance",
"Direct developer support when needed",
],
icon: Wrench,
accent: "orange",
},
];

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

export default function Services() {
const shouldReduceMotion = useReducedMotion();

return ( <section
   id="services"
   className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
 > <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

```
    {/* Header */}
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={
          shouldReduceMotion
            ? undefined
            : { opacity: 1, y: 0 }
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
          {" "}Built Around Your Business.
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
      >
        From professional business websites to custom web applications,
        we build fast, modern digital experiences that help businesses
        establish credibility, reach more customers, and operate better
        online.
      </motion.p>
    </div>

    {/* Services Grid */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16"
    >
      {services.map((service) => {
        const Icon = service.icon;
        const accent = accentMap[service.accent];

        return (
          <motion.article
            key={service.title}
            variants={fadeUp}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -4 }
            }
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-5">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${accent.wrapper}`}
              >
                <Icon
                  className={`h-7 w-7 ${accent.icon}`}
                  strokeWidth={1.8}
                />
              </div>

              <span className="text-xs font-bold tracking-widest text-slate-300">
                {String(
                  services.findIndex(
                    (item) => item.title === service.title
                  ) + 1
                ).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
              {service.title}
            </h3>

            <p className="mt-2 text-sm font-semibold text-blue-600">
              {service.tagline}
            </p>

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {service.desc}
            </p>

            {/* Ideal For */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ideal For
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {service.idealFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="mt-7 border-t border-slate-100 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What You Get
              </p>

              <ul className="mt-3 space-y-2.5">
                {service.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Accent */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
          </motion.article>
        );
      })}
    </motion.div>

    {/* CTA */}
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 20 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
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
        We&apos;ll help you figure out whether you need a website,
        web application, SEO, or ongoing support.
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

        <a
          href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%27d%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
        >
          Chat on WhatsApp
        </a>
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Fast Delivery&nbsp; · &nbsp;Direct Developer Support&nbsp; · &nbsp;Transparent Pricing
      </p>
    </motion.div>

  </div>
</section>

);
}
