"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { ArrowRight, Phone, PhoneForwardedIcon, Clock } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 text-center bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6"
      >
        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border border-white/15">

          {/* Scarcity Banner */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-200 text-xs font-semibold px-4 py-2 rounded-full mb-7">
            <Clock className="w-3.5 h-3.5" />
            We take on only 4 new projects per month — spots are limited
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Get More Customers
            <span className="block bg-gradient-to-r from-yellow-300 to-emerald-300 bg-clip-text text-transparent mt-1">
              From Your Website?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/85 mb-10 max-w-xl mx-auto leading-relaxed">
            Book a free 15-minute strategy call. We'll review your current online presence, identify your biggest opportunity, and give you a clear action plan — no selling, just strategy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-7 py-4 rounded-full shadow-xl hover:bg-slate-100 transition text-base w-full sm:w-auto"
            >
              📞 Book Free 15-Min Strategy Call
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/917589434135?text=Hi%20Harshdeep%2C%20I%27d%20like%20to%20discuss%20my%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-4 rounded-full shadow-xl transition text-base w-full sm:w-auto"
            >
              💬 WhatsApp — Reply in Under 1 Hour
              <PhoneForwardedIcon className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Phone Numbers */}
          <div className="mt-8 text-sm text-white/70 flex flex-col sm:flex-row justify-center items-center gap-5">
            <a href="tel:+917589434135" className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-4 h-4" /> 75894 34135
            </a>
            <a href="tel:+916284004413" className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-4 h-4" /> 62840 04413
            </a>
          </div>

          {/* Reassurance + Founder Signature */}
          <div className="mt-8 pt-7 border-t border-white/15">
            <p className="text-sm text-white/70 mb-2">
              No contracts. No pressure. Just a clear, honest plan for your business.
            </p>
            <p className="text-xs text-white/50 italic">
              — Harshdeep, Founder &amp; Lead Developer, Harshdeep Web Studios, Ludhiana
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}