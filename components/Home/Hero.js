"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/landing_img.webp')",
        }}
      />

      {/* Strong Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl"
      >

        {/* Primary H1 - Exact Match Keyword */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6 break-words"
        >
          Website Developer in Ludhiana
          <span className="block text-cyan-400 mt-2">
            High-Converting Business Websites That Generate Leads
          </span>
        </motion.h1>

        {/* Supporting H2 - Semantic Keyword Boost */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-semibold mb-6"
        >
          Professional Web Design & SEO Services for Ludhiana Businesses
        </motion.h2>

        {/* SEO-Optimized Paragraph */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/90 mb-6"
        >
          We design and develop fast, secure, and SEO-optimized websites for
          startups, local businesses, and enterprises in Ludhiana, Punjab.
          Our strategy-focused approach ensures your website not only looks
          premium but also converts visitors into real customers.
        </motion.p>

        {/* Trust Authority Strip */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-white/80 mb-6"
        >
          <span>✔ 20+ Projects Delivered</span>
          <span>✔ 7–10 Day Fast Launch</span>
          <span>✔ Mobile-First Design</span>
          <span>✔ Direct WhatsApp Support</span>
        </motion.div>

        {/* Micro Location Reinforcement */}
        <motion.p
          variants={fadeUp}
          className="text-sm text-white/60 mb-8"
        >
          Serving Ludhiana, Punjab & Nearby Industrial and Commercial Areas
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition"
          >
            Get My Free Website Growth Plan
          </Link>

          <Link
            href="/portfolio"
            className="px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition font-semibold"
          >
            View Case Studies
          </Link>
        </motion.div>

        {/* Objection Remover */}
        <p className="text-xs text-white/50 mt-4">
          No spam. No pressure. Just actionable business growth advice.
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute bottom-10 flex flex-col items-center z-10"
      >
        <span className="text-sm text-white/70 mb-2">
          Scroll to Explore
        </span>
        <ChevronDown className="w-6 h-6 text-white/80" />
      </motion.div>
    </section>
  );
}
