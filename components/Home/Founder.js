"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
ArrowRight,
CheckCircle2,
Code2,
SearchCheck,
Zap,
} from "lucide-react";
import Link from "next/link";

import { fadeUp, staggerContainer } from "../../lib/motion";

const principles = [
{
icon: Code2,
title: "Built With Purpose",
desc: "Every website is designed around your business goals, audience, and customer journey.",
},
{
icon: Zap,
title: "Performance First",
desc: "Fast-loading, responsive experiences that work smoothly across modern devices.",
},
{
icon: SearchCheck,
title: "SEO Ready",
desc: "Clean technical foundations that give your website a strong starting point for search visibility.",
},
];

export default function Founder() {
const shouldReduceMotion = useReducedMotion();

return ( <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28">
{/* Subtle Background */} <div className="pointer-events-none absolute inset-0"> <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" /> </div>

```
  <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    {/* Main Content */}
    <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

      {/* Founder Visual */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, x: -30 }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : { opacity: 1, x: 0 }
        }
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-md"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
          {/* 
            Replace this with your actual founder image.

            Example:
            <Image
              src="/images/harshdeep-founder.jpg"
              alt="Harshdeep - Founder of HD Web Studios"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          */}

          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-950">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <span className="text-3xl font-bold text-white">
                  HD
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-400">
                Founder & Full-Stack Developer
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                Harshdeep
              </p>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/10 bg-white px-5 py-4 shadow-xl sm:-right-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            HD Web Studios
          </p>
          <p className="mt-1 text-sm font-bold text-slate-900">
            Built by a Developer
          </p>
        </div>
      </motion.div>

      {/* Founder Content */}
      <div>
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
          Meet the Founder
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl"
        >
          Building Digital Experiences
          <span className="text-slate-400">
            {" "}That Businesses Can Rely On.
          </span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-7 space-y-5 text-base leading-7 text-slate-300"
        >
          <motion.p variants={fadeUp}>
            Hi, I&apos;m{" "}
            <span className="font-semibold text-white">
              Harshdeep
            </span>
            , the founder and developer behind HD Web Studios.
          </motion.p>

          <motion.p variants={fadeUp}>
            I started HD Web Studios with a simple belief: a business
            website should be more than just a digital visiting card.
            It should communicate your value, build trust with your
            customers, and make it easier for people to take action.
          </motion.p>

          <motion.p variants={fadeUp}>
            My approach combines modern web development, thoughtful
            design, performance optimization, and SEO fundamentals to
            create websites and web applications that are built around
            real business requirements.
          </motion.p>

          <motion.p variants={fadeUp}>
            When you work with HD Web Studios, you&apos;re not passed
            between layers of account managers and developers. You get
            direct communication with the person building your digital
            experience.
          </motion.p>
        </motion.div>

        {/* Principles */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-9 grid gap-4 sm:grid-cols-3"
        >
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <motion.div
                key={principle.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <Icon
                  className="h-5 w-5 text-blue-400"
                  strokeWidth={1.8}
                />

                <h3 className="mt-4 text-sm font-bold text-white">
                  {principle.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {principle.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Points */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 space-y-2.5"
        >
          {[
            "Direct communication with the developer",
            "Clear and transparent project communication",
            "Focus on performance, usability, and long-term maintainability",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 text-sm text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-9"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Let&apos;s Talk About Your Project
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </div>

    {/* Bottom Statement */}
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
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-10 text-center"
    >
      <p className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
        &quot;Good websites don&apos;t just look impressive.
        They make it easier for the right people to trust your business
        and take the next step.&quot;
      </p>
    </motion.div>

  </div>
</section>

);
}
