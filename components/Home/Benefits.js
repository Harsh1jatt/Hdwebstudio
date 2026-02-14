"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { CheckCircle2, Zap, ShieldCheck, HeartHandshake, Award } from "lucide-react";

const benefits = [
  {
    title: "More Leads",
    desc: "Conversion-focused layouts with persuasive CTAs and trust-building elements.",
    icon: <Zap className="w-7 h-7 text-blue-600" />,
  },
  {
    title: "Lightning Fast",
    desc: "Optimized for speed and performance, giving you higher SEO rankings and conversions.",
    icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
  },
  {
    title: "SEO Ready",
    desc: "Technical hygiene, schema markup, and best on-page practices from the start.",
    icon: <Award className="w-7 h-7 text-pink-600" />,
  },
  {
    title: "Full Ownership",
    desc: "You own the code, content, and assets — no lock-in, always future-proof.",
    icon: <CheckCircle2 className="w-7 h-7 text-indigo-600" />,
  },
  {
    title: "Long-Term Support",
    desc: "We don’t disappear after delivery — updates and improvements when you need them.",
    icon: <HeartHandshake className="w-7 h-7 text-orange-600" />,
  },
];

export default function Benefits() {
  return (
    <section className="py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl text-center mx-auto mb-16"
        >
          We don’t just build websites — we create growth engines that scale with your business.
        </motion.p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {benefits.map((b, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-start p-8 bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-100 to-emerald-100 mb-5">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-600 leading-relaxed">{b.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
