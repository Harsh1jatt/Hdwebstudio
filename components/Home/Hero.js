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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl"
      >

        {/* Authority Label */}
        <motion.p
          variants={fadeUp}
          className="text-sm uppercase tracking-widest text-cyan-400 mb-4"
        >
          Ludhiana’s Growth-Focused Web Agency
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          We Build High-Converting Websites That{" "}
          <span className="text-cyan-400">
            Help Ludhiana Businesses Grow Faster
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-white/90 mb-8"
        >
          Strategy-driven design, high-speed development, and SEO optimization 
          tailored for ambitious local brands.
        </motion.p>

        {/* Trust Line */}
        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base text-white/70 mb-8"
        >
          20+ Projects Delivered • 7–10 Day Launch • Direct Strategy Support
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">

          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition"
          >
            Book Free Strategy Call
          </Link>

          <Link
            href="/portfolio"
            className="px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition font-semibold"
          >
            View Case Studies
          </Link>

        </motion.div>
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
        <span className="text-sm text-white/70 mb-2">Scroll</span>
        <ChevronDown className="w-6 h-6 text-white/80" />
      </motion.div>
    </section>
  );
}
