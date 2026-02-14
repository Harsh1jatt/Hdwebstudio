"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Globe, Settings, TrendingUp } from "lucide-react";

const services = [
  {
    title: "Business Website Development",
    desc: "Modern, mobile-first websites designed to attract customers and generate real business inquiries.",
    icon: <Globe className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Custom Admin Panels & Portals",
    desc: "Secure dashboards, student portals, exam systems, and custom business tools tailored to your workflow.",
    icon: <Settings className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "SEO & Performance Optimization",
    desc: "Speed optimization, on-page SEO, and technical improvements to help your website rank and convert better.",
    icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
  },
];

export default function Services() {
  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* Small Label */}
        <p className="text-sm uppercase tracking-widest text-blue-600 font-medium mb-4">
          What I Offer
        </p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Complete Website Solutions for Growing Businesses
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg text-gray-600 mb-16"
        >
          From professional business websites to custom admin systems — I build
          digital solutions that help you scale faster and operate smarter.
        </motion.p>

        {/* Grid */}
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
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                {s.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {s.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <a
            href="/contact"
            className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Get a Free Project Consultation →
          </a>

          <p className="text-sm text-gray-500 mt-4">
            Fast Delivery • Direct Developer Support • Transparent Pricing
          </p>
        </div>

      </div>
    </section>
  );
}
