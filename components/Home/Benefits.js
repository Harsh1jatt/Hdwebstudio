"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import {
  TrendingUp,
  Gauge,
  ShieldCheck,
  Layers,
  Users,
  Rocket,
} from "lucide-react";

const benefits = [
  {
    title: "Growth-Driven Strategy",
    desc: "We don’t just design websites — we craft digital systems built to generate leads, sales, and measurable business growth.",
    icon: <TrendingUp className="w-7 h-7 text-blue-600" />,
  },
  {
    title: "High-Performance Engineering",
    desc: "Optimized architecture ensures lightning-fast load times, SEO strength, and seamless scalability.",
    icon: <Gauge className="w-7 h-7 text-emerald-600" />,
  },
  {
    title: "Conversion-Focused Design",
    desc: "Every layout, section, and CTA is strategically structured to turn visitors into paying clients.",
    icon: <Layers className="w-7 h-7 text-purple-600" />,
  },
  {
    title: "Secure & Reliable Systems",
    desc: "Modern infrastructure with advanced security practices to protect your business and users.",
    icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
  },
  {
    title: "Collaborative Partnership",
    desc: "We work as an extension of your team — transparent communication, clear timelines, real results.",
    icon: <Users className="w-7 h-7 text-orange-600" />,
  },
  {
    title: "Future-Ready Technology",
    desc: "Built with modern frameworks and scalable stacks to keep your brand ahead of the competition.",
    icon: <Rocket className="w-7 h-7 text-pink-600" />,
  },
];

export default function Benefits() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="text-sm uppercase tracking-widest text-blue-600 font-medium mb-4">
          Why Choose Our Agency
        </p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Digital Solutions Built for Long-Term Growth
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
        >
          We combine strategy, design, and technology to create high-impact
          digital experiences that drive measurable business results.
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
              whileHover={{ y: -6 }}
              className="p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 text-left"
            >
              <div className="mb-5">
                {b.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {b.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {b.desc}
              </p>
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
