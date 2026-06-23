"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Raretech Institute",
    category: "Institute Website + Admin Panel + Exam Portal",
    img: "/projects/raretech.png",
    link: "http://raretech.co.in/",
    featured: true,
    challenge: "Needed to manage 500+ students, run online exams, and generate new admissions — all digitally.",
    outcomes: [
      "Admissions enquiries moved fully online",
      "Student management automated end-to-end",
      "Online exam portal launched for 500+ students",
    ],
    tag: "Coaching Institute",
  },
  {
    title: "JMD Solar Energy",
    category: "Business Website — Solar Industry",
    img: "/projects/jmdsolar.png",
    link: "https://jmdsolarenergy.ct.ws/",
    featured: false,
    challenge: "No professional online presence — losing customers to competitors who showed up on Google.",
    outcomes: [
      "Professional credibility established online",
      "Now visible on Google for Punjab solar searches",
      "Customer enquiries started within first month",
    ],
    tag: "Solar / Manufacturing",
  },
  {
    title: "Vastu Divine",
    category: "Business Website",
    img: "/projects/luxe.png",
    link: "https://luxe-jewel-blueprint.vercel.app/",
    featured: false,
    challenge: "Needed a professional digital presence to attract new clients and build authority.",
    outcomes: [
      "Premium brand presence established online",
      "New client enquiries via website form",
      "Google-indexed and mobile-optimized",
    ],
    tag: "Service Business",
  },
  {
    title: "Restaurant Demo",
    category: "Conversion-Focused Landing Page",
    img: "/projects/restaurant.png",
    link: "https://restrorantdemo1.vercel.app/",
    featured: false,
    challenge: "Showcase a high-converting restaurant website with online menu and reservation CTA.",
    outcomes: [
      "Mobile-first responsive design",
      "Menu display + table booking CTA",
      "Fast-loading with 90+ performance score",
    ],
    tag: "Food & Hospitality",
  },
];

function ProjectCard({ project }) {
  const { title, category, img, link, featured, challenge, outcomes, tag } = project;
  return (
    <motion.div
      variants={fadeUp}
      className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500"
    >
      {featured && (
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          Featured Project
        </span>
      )}

      {/* Image */}
      <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} live`}>
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={img}
            alt={`${title} website screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        </div>
      </a>

      {/* Content */}
      <div className="p-7">
        {/* Tag */}
        <span className="inline-block text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-3">
          {tag}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 mb-4">{category}</p>

        {/* Challenge */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          <span className="font-semibold text-slate-800">Challenge: </span>
          {challenge}
        </p>

        {/* Outcomes */}
        <ul className="space-y-2 mb-5">
          {outcomes.map((outcome, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              {outcome}
            </li>
          ))}
        </ul>

        {/* Link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          View Live Site
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function PortfolioPreview() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3"
          >
            Client Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-5"
          >
            Real Projects. Measurable Business Impact.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Every website we build solves a real business problem. Here's the proof.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 text-sm mb-5 font-medium">
            Ready to be our next success story?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
          >
            📞 Get Your Free Website Audit →
          </a>
          <p className="text-xs text-slate-400 mt-4">
            Direct WhatsApp Support · Fast Delivery · Custom Solutions
          </p>
        </motion.div>

      </div>
    </section>
  );
}