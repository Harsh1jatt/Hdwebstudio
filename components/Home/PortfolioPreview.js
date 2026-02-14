"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { 
    title: "E-commerce Store", 
    category: "E-commerce",
    img: "https://images.unsplash.com/photo-1556742400-b5b7c5121f1d?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Portfolio Website", 
    category: "Personal Branding",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Business Landing", 
    category: "Corporate",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* floating blobs for luxury feel */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
        >
          Portfolio Preview
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
        >
          A glimpse of projects crafted with precision — blending design, performance, and conversion.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.04, rotate: 0.5 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
              />

              {/* category badge */}
              <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-sm px-3 py-1 rounded-full font-medium shadow">
                {p.category}
              </span>

              {/* glassy overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <button className="mt-2 inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300">
                      View Project <ArrowUpRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
