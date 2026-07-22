"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  LineChart,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    label: "Websites",
  },
  {
    icon: Code2,
    label: "Software",
  },
  {
    icon: LineChart,
    label: "Growth",
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          {/* Left Content */}
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>

                Digital Products & Growth Agency
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              We Build Digital Experiences That{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Grow Businesses.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
            >
              We design and develop high-performance websites, custom software
              and digital growth solutions that help ambitious businesses
              attract customers, streamline operations and scale online.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Start Your Project

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Explore Our Work
              </Link>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Performance-focused
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Mobile-first
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Built for growth
              </div>
            </motion.div>

            {/* SEO Supporting Copy */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-sm leading-6 text-slate-500"
            >
              Web development, custom software and SEO solutions for businesses
              in Ludhiana, Punjab and across India.
            </motion.p>
          </div>

          {/* Right Visual */}
          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-xl lg:ml-auto"
          >
            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  </div>

                  <span className="ml-2 text-xs font-medium text-slate-400">
                    hdwebstudios.in
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Live
                </div>
              </div>

              {/* Visual Content */}
              <div className="relative mt-5 overflow-hidden rounded-2xl bg-slate-950 p-5 sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/30 blur-3xl"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        DIGITAL GROWTH SYSTEM
                      </p>

                      <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Build. Launch. Grow.
                      </h2>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <Sparkles
                        size={20}
                        className="text-blue-400"
                      />
                    </div>
                  </div>

                  {/* Service Cards */}
                  <div className="mt-7 grid grid-cols-3 gap-2.5 sm:gap-3">
                    {services.map((service, index) => {
                      const Icon = service.icon;

                      return (
                        <motion.div
                          key={service.label}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 12 }
                          }
                          animate={
                            shouldReduceMotion
                              ? {}
                              : { opacity: 1, y: 0 }
                          }
                          transition={{
                            delay: shouldReduceMotion
                              ? 0
                              : 0.5 + index * 0.1,
                            duration: 0.5,
                          }}
                          className="rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm sm:p-4"
                        >
                          <Icon
                            size={19}
                            className="text-blue-400"
                          />

                          <p className="mt-3 text-xs font-medium text-slate-200 sm:text-sm">
                            {service.label}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Growth Bar */}
                  <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Business Growth
                      </span>

                      <span className="text-xs font-semibold text-emerald-400">
                        Optimized
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{
                          width: shouldReduceMotion ? "82%" : "0%",
                        }}
                        animate={{
                          width: "82%",
                        }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.8,
                          duration: shouldReduceMotion ? 0 : 1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 pt-5">
                <div className="px-3 text-center">
                  <p className="text-lg font-bold text-slate-950">
                    Fast
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Performance
                  </p>
                </div>

                <div className="px-3 text-center">
                  <p className="text-lg font-bold text-slate-950">
                    SEO
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Ready
                  </p>
                </div>

                <div className="px-3 text-center">
                  <p className="text-lg font-bold text-slate-950">
                    Scale
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                    Focused
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.9, y: 10 }
              }
              animate={
                shouldReduceMotion
                  ? {}
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{
                delay: shouldReduceMotion ? 0 : 1,
                duration: 0.5,
              }}
              className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:block sm:-left-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <CheckCircle2
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Built for business
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Not just another website
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}