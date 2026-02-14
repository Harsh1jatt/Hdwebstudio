"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 text-center bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 text-white overflow-hidden">
      {/* background glow */}
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
        {/* Glassy card for focus */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 leading-snug md:leading-tight">
            Ready to grow with a{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-emerald-300 bg-clip-text text-transparent">
              high-performing
            </span>{" "}
            website?
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-8 md:mb-10">
            Let’s craft a stunning, modern site that turns visitors into loyal
            customers. Book your free consultation today.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:bg-slate-100 transition text-base sm:text-lg"
          >
            Book Your Free Call
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
