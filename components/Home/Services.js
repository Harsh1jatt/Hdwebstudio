"use client";

import { motion } from "framer-motion";
import { Globe, Settings, TrendingUp } from "lucide-react";

const services = [
  {
    title: "Business Website Development",
    desc: "Modern, mobile-first websites designed to attract customers and generate real business inquiries.",
    points: ["Mobile Optimized", "Conversion Focused", "Fast Loading"],
    icon: <Globe className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Custom Admin Panels & Portals",
    desc: "Secure dashboards, student portals, exam systems, and custom business tools tailored to your workflow.",
    points: ["Secure Access", "Role Based System", "Custom Workflow"],
    icon: <Settings className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "SEO & Performance Optimization",
    desc: "Speed optimization, on-page SEO, and technical improvements to help your website rank and convert better.",
    points: ["90+ Lighthouse Score", "Technical SEO", "Core Web Vitals"],
    icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
  },
];

export default function Services() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">

        {/* Small Label */}
        <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4">
          What I Offer
        </p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        >
          Complete Website Solutions <br className="hidden md:block" />
          for Growing Businesses
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg text-gray-600 mb-16"
        >
          From professional business websites to custom admin systems — 
          I build digital solutions that help you scale faster and operate smarter.
        </motion.p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Feature Points */}
                <ul className="space-y-2 text-sm text-gray-500">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">

            <a
              href="/contact"
              className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-300"
            >
              Get a Free Project Consultation →
            </a>

            <a
              href="https://wa.me/917589434135"
              target="_blank"
              className="px-8 py-4 rounded-full border border-gray-300 font-semibold hover:bg-gray-100 transition duration-300"
            >
              Chat on WhatsApp
            </a>

          </div>

          <p className="text-sm text-gray-500 mt-6">
            ⚡ Fast Delivery • 👨‍💻 Direct Developer Support • 💰 Transparent Pricing
          </p>
        </div>

      </div>
    </section>
  );
}
