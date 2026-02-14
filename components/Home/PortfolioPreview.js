"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Raretech Institute Management System",
    category: "Full Website + Admin Panel + Exam Portal",
    img: "/projects/raretech.png",
    link: "http://raretech.co.in/",
    featured: true,
  },
  {
    title: "JMD Solar Energy Website",
    category: "WordPress Business Website",
    img: "/projects/jmdsolar.png",
    link: "https://jmdsolarenergy.ct.ws/",
  },
  {
    title: "Luxury Jewelry E-Commerce UI",
    category: "Premium Frontend Demo",
    img: "/projects/luxe.png",
    link: "https://luxe-jewel-blueprint.vercel.app/",
  },
  {
    title: "Restaurant Website Demo",
    category: "Conversion Focused Landing",
    img: "/projects/restaurant.png",
    link: "https://restrorantdemo1.vercel.app/",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* Small Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest text-blue-600 font-medium mb-4"
        >
          Selected Client Work
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Real Projects. Real Business Impact.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
        >
          Websites and systems built for performance, security, and
          measurable business growth.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10"
        >
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden group border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >
              {/* Featured Badge */}
              {p.featured && (
                <span className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                  Featured Project
                </span>
              )}

              {/* Image */}
              <div className="relative w-full h-72 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>

              {/* Content */}
              <div className="p-6 text-left">
                <span className="text-sm text-blue-600 font-medium">
                  {p.category}
                </span>

                <h3 className="text-xl font-semibold mt-2 flex items-center justify-between group-hover:text-blue-600 transition">
                  {p.title}
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
                </h3>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <a
            href="/contact"
            className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Let’s Build Your Business Website →
          </a>

          <p className="text-sm text-gray-500 mt-4">
            Direct WhatsApp Support • Fast Delivery • Custom Solutions
          </p>
        </div>
      </div>
    </section>
  );
}
