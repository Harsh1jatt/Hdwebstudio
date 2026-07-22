"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
MessageSquareText,
PenTool,
Rocket,
ArrowRight,
CheckCircle2,
} from "lucide-react";
import Link from "next/link";

import { fadeUp, staggerContainer } from "../../lib/motion";

const steps = [
{
step: "01",
icon: MessageSquareText,
title: "Discuss Your Goals",
desc: "We start by understanding your business, audience, goals, and what you want your website or web application to achieve. No technical knowledge is required — we'll help you figure out the right approach.",
points: [
"Understand your requirements",
"Discuss goals and target audience",
"Recommend the right solution",
],
},
{
step: "02",
icon: PenTool,
title: "Design & Development",
desc: "Once the direction is clear, we design and develop your digital experience with a focus on usability, responsive design, performance, and SEO fundamentals.",
points: [
"Design the user experience",
"Develop and integrate functionality",
"Review, test, and refine",
],
},
{
step: "03",
icon: Rocket,
title: "Launch & Support",
desc: "After everything is reviewed and approved, we prepare your website for launch. Once live, we can continue supporting you with updates, improvements, and ongoing maintenance.",
points: [
"Final testing and optimization",
"Deployment and launch",
"Post-launch support available",
],
},
];

export default function Process() {
const shouldReduceMotion = useReducedMotion();

return ( <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28">
{/* Background */} <div className="pointer-events-none absolute inset-0"> <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" /> </div>

```
  <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

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
        className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400"
      >
        How We Work
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl"
      >
        From Idea to Launch,
        <br className="hidden md:block" />
        <span className="text-slate-400">
          {" "}Without the Complexity.
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg"
      >
        A clear, collaborative process that keeps you informed at every
        stage — from the first conversation to launch and beyond.
      </motion.p>
    </div>

    {/* Process Steps */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8"
    >
      {/* Connecting Line - Desktop */}
      <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-14 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

      {steps.map((step) => {
        const Icon = step.icon;

        return (
          <motion.article
            key={step.step}
            variants={fadeUp}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-8"
          >
            {/* Number + Icon */}
            <div className="relative flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                <Icon
                  className="h-5 w-5 text-blue-400"
                  strokeWidth={1.8}
                />
              </div>

              <span className="text-5xl font-black leading-none text-white/[0.06]">
                {step.step}
              </span>
            </div>

            {/* Content */}
            <h3 className="mt-7 text-xl font-bold tracking-tight text-white">
              {step.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {step.desc}
            </p>

            {/* Points */}
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </motion.div>

    {/* CTA */}
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 15 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="mt-14 text-center lg:mt-16"
    >
      <p className="text-sm text-slate-400">
        Have a project in mind?
      </p>

      <Link
        href="/contact"
        className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
      >
        Start a Conversation
        <ArrowRight
          size={17}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>

      <p className="mt-4 text-xs text-slate-500">
        Tell us about your project and we&apos;ll take it from there.
      </p>
    </motion.div>

  </div>
</section>

);
}
