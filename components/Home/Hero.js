"use client";
import { motion } from "framer-motion";
import { ChevronDown, Star, Phone } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 text-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing_img.webp')" }}
        role="img"
        aria-label="Professional web developer workspace"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/85" />

      {/* Main Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl w-full mx-auto"
      >
        {/* Google Rating Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </span>
            <span className="text-white/90 font-medium">5.0 on Google</span>
            <span className="text-white/40">·</span>
            <span className="text-white/65">Ludhiana, Punjab</span>
          </div>
        </motion.div>

        {/* H1 — Primary SEO Keyword */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4"
        >
          Website Designer in Ludhiana
          <span className="block text-cyan-400 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Websites That Get Your Business More Calls, Clients &amp; Revenue
          </span>
        </motion.h1>

        {/* H2 — Supporting SEO */}
        <motion.h2
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl font-medium text-white/75 mb-5 max-w-2xl mx-auto"
        >
          Professional Web Design &amp; SEO Services for Clinics, Coaching Institutes,
          Manufacturers &amp; Local Businesses in Ludhiana &amp; Punjab
        </motion.h2>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base text-white/65 mb-8 max-w-xl mx-auto leading-relaxed"
        >
          If your website isn't bringing you enquiries every week, it isn't
          working hard enough. I design and develop fast, mobile-first,
          SEO-optimized websites — and get them live in as few as 7 days.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/25 transition-all duration-200 text-sm sm:text-base"
          >
            📋 Get My Free Website Audit
          </Link>
          <a
            href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%27d%20like%20a%20free%20website%20audit%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-green-500 hover:bg-green-400 active:bg-green-600 text-white font-bold shadow-lg shadow-green-500/25 transition-all duration-200 text-sm sm:text-base"
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>

        {/* Micro-copy */}
        <motion.p variants={fadeUp} className="text-xs text-white/40 mb-7">
          No commitment required. Just honest advice about your online presence.
        </motion.p>

        {/* Trust Signals Row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/60"
        >
          <span>✔ 3 Real Client Projects Delivered</span>
          <span>✔ 7-Day Fast Launch</span>
          <span>✔ Mobile-First Design</span>
          <span>✔ Zero Hidden Charges</span>
          <span>✔ Direct WhatsApp Support</span>
        </motion.div>

        {/* Location */}
        <motion.p variants={fadeUp} className="text-xs text-white/35 mt-3">
          Serving Ludhiana · Amritsar · Jalandhar · Chandigarh · Patiala &amp; all of Punjab
        </motion.p>

        {/* Phone numbers */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-5 mt-5 text-xs sm:text-sm text-white/50"
        >
          <a
            href="tel:+917589434135"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> 75894 34135
          </a>
          <a
            href="tel:+916284004413"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> 62840 04413
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-xs text-white/40">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-white/50" />
      </motion.div>
    </section>
  );
}