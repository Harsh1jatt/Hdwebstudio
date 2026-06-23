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
    title: "Growth-Driven Website Strategy",
    desc: "We design websites in Ludhiana with a clear business objective — generating leads, increasing sales, and building long-term brand authority.",
    icon: <TrendingUp className="w-7 h-7 text-blue-600" />,
  },
  {
    title: "High-Performance Web Development",
    desc: "Our websites are optimized for fast loading speeds, technical SEO strength, and scalable architecture for future expansion.",
    icon: <Gauge className="w-7 h-7 text-emerald-600" />,
  },
  {
    title: "Conversion-Focused UI/UX Design",
    desc: "Strategic layouts, compelling CTAs, and user psychology ensure visitors turn into inquiries and paying customers.",
    icon: <Layers className="w-7 h-7 text-purple-600" />,
  },
  {
    title: "Secure & Reliable Infrastructure",
    desc: "Advanced security practices and clean code standards protect your website and customer data.",
    icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
  },
  {
    title: "Transparent Collaboration Process",
    desc: "Clear timelines, structured communication, and milestone-based delivery keep your project efficient and stress-free.",
    icon: <Users className="w-7 h-7 text-orange-600" />,
  },
  {
    title: "Modern & Future-Ready Tech Stack",
    desc: "Built using scalable frameworks and modern web technologies to keep your business competitive in Ludhiana’s digital market.",
    icon: <Rocket className="w-7 h-7 text-pink-600" />,
  },
];

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* SEO Reinforced Label */}
        <p className="text-sm uppercase tracking-widest text-blue-600 font-medium mb-4">
          Why Businesses in Ludhiana Choose Us
        </p>

        {/* Optimized Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Professional Website Development & SEO Services in Ludhiana
        </motion.h2>

        {/* SEO Paragraph Boost */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-16"
        >
          We combine strategy, performance-focused web design, and technical
          SEO to create powerful digital platforms for businesses in Ludhiana,
          Punjab. Our goal is simple — build websites that look premium,
          rank higher on Google, and convert visitors into customers.
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
