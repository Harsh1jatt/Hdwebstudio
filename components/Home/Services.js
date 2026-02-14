"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Code2, Palette, Rocket } from "lucide-react";

const services = [
  {
    title: "Web Development",
    desc: "Custom full-stack websites built with the latest tech stack for speed, scalability, and conversion.",
    icon: <Code2 className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "UI/UX Design",
    desc: "Pixel-perfect, user-friendly, and minimal designs that leave a lasting impression on your audience.",
    icon: <Palette className="w-10 h-10 text-pink-500" />,
  },
  {
    title: "SEO Optimization",
    desc: "Technical SEO, on-page tweaks, and performance tuning so your website ranks and grows organically.",
    icon: <Rocket className="w-10 h-10 text-emerald-500" />,
  },
];

export default function Services() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-pink-100/30 to-transparent blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg text-gray-600 mb-14"
        >
          We don’t just build websites — we craft digital experiences that boost
          growth and impact.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05, rotate: "-1deg" }}
              className="relative group p-8 rounded-2xl shadow-lg border border-slate-200 bg-white hover:shadow-2xl transition"
            >
              {/* Icon circle with glow */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 group-hover:scale-110 transition">
                {s.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition">
                {s.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>

              {/* subtle bottom border accent */}
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-500 rounded-b-xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
