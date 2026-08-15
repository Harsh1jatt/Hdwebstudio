"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { Icon, Container, Eyebrow, PrimaryButton, SecondaryButton, GradientBlob } from "./shared/ui";
import { defaultWhatsAppMessage, whatsAppUrl } from "@/config/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function ServiceHero({ service }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-40 sm:pb-32">
      {/* Ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-white" />
      <GradientBlob className="left-[-10%] top-[-10%] h-[28rem] w-[28rem] bg-blue-300/30" />
      <GradientBlob className="right-[-15%] top-[10%] h-[26rem] w-[26rem] bg-cyan-300/30" />
      <GradientBlob className="bottom-[-15%] left-[20%] h-[22rem] w-[22rem] bg-blue-200/20" />

      {/* Floating decorative shapes */}
      <FloatingShape className="left-[6%] top-[22%] hidden lg:block" duration={7} size="h-3 w-3 bg-blue-400/60" />
      <FloatingShape className="right-[8%] top-[32%] hidden lg:block" duration={9} size="h-4 w-4 bg-cyan-400/50" delay={1.2} />
      <FloatingShape className="left-[14%] bottom-[18%] hidden lg:block" duration={8} size="h-2.5 w-2.5 bg-blue-300/70" delay={0.6} />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={item}>
              <Eyebrow>
                <Icon name={service.icon} className="h-3.5 w-3.5" />
                {service.eyebrow}
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]"
            >
              {service.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {service.title.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h1>

            <motion.p variants={item} className="max-w-xl text-lg font-medium text-slate-600">
              {service.tagline}
            </motion.p>

            <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-slate-500">
              {service.description}
            </motion.p>

            <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-4">
              <PrimaryButton href="/contact">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </PrimaryButton>
              <SecondaryButton href={whatsAppUrl(defaultWhatsAppMessage)}>
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </SecondaryButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-100 pt-6"
            >
              {service.heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                  <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: illustration */}
          <HeroIllustration service={service} />
        </div>
      </Container>
    </section>
  );
}

function FloatingShape({ className, size, duration = 6, delay = 0 }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute rounded-full ${size} ${className}`}
      animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function HeroIllustration({ service }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
    >
      {/* glow behind the mock panel */}
      <div className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-400/30 to-cyan-300/30 blur-2xl" />

      {/* main glass panel */}
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.25)] backdrop-blur-xl sm:p-8">
        {/* abstract grid pattern */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* fake browser chrome */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <div className="ml-3 h-6 flex-1 rounded-full bg-slate-100/80" />
        </div>

        {/* central icon medallion */}
        <div className="relative flex flex-1 items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl shadow-blue-500/30 sm:h-32 sm:w-32"
          >
            <Icon name={service.icon} className="h-14 w-14 text-white sm:h-16 sm:w-16" strokeWidth={1.5} />
          </motion.div>

          {/* pulsing ring */}
          <motion.span
            aria-hidden="true"
            className="absolute h-28 w-28 rounded-3xl border border-blue-400/40 sm:h-32 sm:w-32"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* floating card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -10, y: -10 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ opacity: { duration: 0.6, delay: 0.8 }, x: { duration: 0.6, delay: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            className="absolute -left-2 top-3 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-lg shadow-slate-900/10 backdrop-blur-md sm:-left-6"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-slate-700">Deployed</span>
          </motion.div>

          {/* floating card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
            transition={{ opacity: { duration: 0.6, delay: 1 }, x: { duration: 0.6, delay: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
            className="absolute -right-2 bottom-6 flex flex-col gap-1 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-md sm:-right-6"
          >
            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Performance</span>
            <div className="flex items-end gap-1">
              {[8, 14, 10, 18, 22].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400"
                  style={{ height: h }}
                  animate={{ scaleY: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* bottom summary row */}
        <div className="flex items-center justify-between rounded-2xl bg-slate-900/[0.03] px-4 py-3">
          <div className="flex -space-x-2">
            {["from-blue-400 to-blue-500", "from-cyan-400 to-cyan-500", "from-blue-500 to-cyan-400"].map((g, i) => (
              <span key={i} className={`h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br ${g}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">Built for growth</span>
        </div>
      </div>
    </motion.div>
  );
}
