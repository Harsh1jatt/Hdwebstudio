"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { ArrowRight, Phone, MessageCircle, PhoneForwardedIcon } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 text-center bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-56 h-56 md:w-96 md:h-96 bg-blue-400/30 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-56 h-56 md:w-96 md:h-96 bg-indigo-400/30 rounded-full blur-2xl md:blur-3xl" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-xl">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 leading-snug md:leading-tight">
            Let’s Build a Website That{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-emerald-300 bg-clip-text text-transparent">
              Brings More Clients
            </span>{" "}
            to Your Business in Ludhiana
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/90 mb-8 md:mb-10">
            We work with a limited number of businesses each month to ensure
            focused strategy, high performance, and measurable growth.
            Book a free consultation and let’s plan your next move.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

            {/* Strategy Call */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:bg-slate-100 transition text-base sm:text-lg w-full sm:w-auto"
            >
              Schedule Free Strategy Call
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/917589434135"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition text-base sm:text-lg w-full sm:w-auto"
            >
              Chat on WhatsApp
              <PhoneForwardedIcon className="w-4 h-4" />
            </motion.a>

          </div>

          {/* Contact Numbers */}
          <div className="mt-8 text-sm text-white/80 flex flex-col sm:flex-row justify-center items-center gap-4">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              75894 34135
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              62840 04413
            </span>
          </div>

          {/* Reassurance Line */}
          <p className="text-xs text-white/70 mt-6">
            No sales pressure. Just a clear strategy roadmap for your business.
          </p>

        </div>
      </motion.div>
    </section>
  );
}
