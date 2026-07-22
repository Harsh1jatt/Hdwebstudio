"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Star, Phone, ClipboardCheck, MessageCircle } from "lucide-react";
import Link from "next/link";

const TRUST_SIGNALS = [
  "3 Real Client Projects Delivered",
  "7-Day Fast Launch",
  "Mobile-First Design",
  "Zero Hidden Charges",
  "Direct WhatsApp Support",
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
  };

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.92, behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-24 text-center text-slate-900 sm:px-6"
      aria-label="Hero section"
    >
      {/* ================= DECORATIVE BACKGROUND (CSS-only, no image request) ================= */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Drifting gradient blobs — transform/opacity only, GPU-composited */}
        <div className="blob-one absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/40 blur-3xl motion-reduce:animate-none" />
        <div className="blob-two absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-blue-300/40 blur-3xl motion-reduce:animate-none" />
        <div className="blob-three absolute bottom-0 left-1/3 hidden h-[30rem] w-[30rem] rounded-full bg-indigo-200/40 blur-3xl motion-reduce:animate-none sm:block" />

        {/* Subtle dot-grid texture, faded top and bottom */}
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

        {/* Soft white wash so text stays crisp over the color blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-slate-50" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-4xl"
      >
        {/* Google Rating Badge */}
        <motion.div variants={fadeUp} className="mb-5 flex justify-center">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
            <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/10 motion-safe:animate-pulse motion-reduce:hidden" />
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </span>
            <span className="font-medium text-slate-800">5.0 on Google</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">Ludhiana, Punjab</span>
          </div>
        </motion.div>

        {/* H1 — Primary SEO Keyword */}
        <motion.h1
          variants={fadeUp}
          className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Website Designer in Ludhiana
          <span className="mt-2 block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl lg:text-5xl">
            Websites That Get Your Business More Calls, Clients &amp; Revenue
          </span>
        </motion.h1>

        {/* H2 — Supporting SEO */}
        <motion.h2
          variants={fadeUp}
          className="mx-auto mb-5 max-w-2xl text-base font-medium text-slate-600 sm:text-lg md:text-xl"
        >
          Professional Web Design &amp; SEO Services for Clinics, Coaching Institutes,
          Manufacturers &amp; Local Businesses in Ludhiana &amp; Punjab
        </motion.h2>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base"
        >
          If your website isn't bringing you enquiries every week, it isn't
          working hard enough. I design and develop fast, mobile-first,
          SEO-optimized websites — and get them live in as few as 7 days.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/40 active:translate-y-0 active:bg-blue-700 sm:text-base"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            <span className="relative">Get My Free Website Audit</span>
          </Link>
          <a
            href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%27d%20like%20a%20free%20website%20audit%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-green-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/40 active:translate-y-0 active:bg-green-600 sm:text-base"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="relative">Chat on WhatsApp</span>
          </a>
        </motion.div>

        {/* Micro-copy */}
        <motion.p variants={fadeUp} className="mb-7 text-xs text-slate-400">
          No commitment required. Just honest advice about your online presence.
        </motion.p>

        {/* Trust Signals Row */}
        <motion.ul
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm"
        >
          {TRUST_SIGNALS.map((signal) => (
            <li
              key={signal}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 shadow-sm transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {signal}
            </li>
          ))}
        </motion.ul>

        {/* Location */}
        <motion.p variants={fadeUp} className="mt-4 text-xs text-slate-400">
          Serving Ludhiana · Amritsar · Jalandhar · Chandigarh · Patiala &amp; all of Punjab
        </motion.p>

        {/* Phone numbers */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex flex-wrap justify-center gap-5 text-xs text-slate-500 sm:text-sm"
        >
          <a
            href="tel:+917589434135"
            className="flex items-center gap-1.5 transition-colors hover:text-blue-600"
          >
            <Phone className="h-3.5 w-3.5" /> 75894 34135
          </a>
          <a
            href="tel:+916284004413"
            className="flex items-center gap-1.5 transition-colors hover:text-blue-600"
          >
            <Phone className="h-3.5 w-3.5" /> 62840 04413
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — a real interactive control */}
      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="group absolute bottom-8 z-10 flex flex-col items-center gap-1 rounded-full p-2 text-slate-400 transition-colors duration-200 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <span className="text-xs">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 motion-safe:animate-bounce motion-reduce:animate-none" />
      </button>

      {/* Scoped keyframes for the drifting background blobs */}
      <style jsx>{`
        @keyframes drift-one {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, 30px);
          }
        }
        @keyframes drift-two {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 40px);
          }
        }
        @keyframes drift-three {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -30px);
          }
        }
        .blob-one {
          animation: drift-one 14s ease-in-out infinite;
        }
        .blob-two {
          animation: drift-two 16s ease-in-out infinite;
        }
        .blob-three {
          animation: drift-three 18s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .blob-one,
          .blob-two,
          .blob-three {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}