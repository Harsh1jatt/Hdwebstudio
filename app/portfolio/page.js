// app/portfolio/page.jsx
"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb } from "react-icons/si";

import {
  Laptop,
  LayoutDashboard,
  GraduationCap,
  Keyboard,
  ArrowUpRight,
  FileText,
  Code,
  Database,
  Server,
  Cpu,
  Settings,
  Zap,
  Heart,
} from "lucide-react";

export default function PortfolioPage() {
  const projects = [
    {
      icon: <Laptop className="w-6 h-6 text-blue-600" />,
      title: "Computer Institute Website",
      desc: "Modern, responsive website for a local institute with service showcase, enquiry form, and SEO-ready setup.",
      tech: ["Next.js", "Tailwind CSS", "Node.js"],
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
      live: "#",
      caseStudy: "#",
    },
    {
      icon: <LayoutDashboard className="w-6 h-6 text-emerald-600" />,
      title: "Institute Admin Panel",
      desc: "Full-featured dashboard to manage students, exams, and reports with secure authentication.",
      tech: ["React", "MongoDB", "Express", "Node.js"],
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
      live: "#",
      caseStudy: "#",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-pink-600" />,
      title: "Exam Portal",
      desc: "Online platform for students to take exams with timer, instant results, and admin tracking.",
      tech: ["React", "Node.js", "MongoDB"],
      img: "https://images.unsplash.com/photo-1603575448364-3c02b0c3c022?q=80&w=1600&auto=format&fit=crop",
      live: "#",
      caseStudy: "#",
    },
    {
      icon: <Keyboard className="w-6 h-6 text-amber-600" />,
      title: "Typing Tutor (Desktop)",
      desc: "Interactive typing practice web app designed for desktops. Helps students improve speed and accuracy.",
      tech: ["HTML", "CSS", "JavaScript"],
      img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600&auto=format&fit=crop",
      live: "#",
      caseStudy: "#",
    },
  ];

  const techList = [
    { name: "Next.js", icon: <Code className="w-6 h-6 text-blue-600" /> },
    { name: "React", icon: <SiReact className="w-6 h-6 text-cyan-500" /> },
    { name: "MongoDB", icon: <Database className="w-6 h-6 text-green-600" /> },
    { name: "Node.js", icon: <Server className="w-6 h-6 text-green-500" /> },
    { name: "Tailwind CSS", icon: <Settings className="w-6 h-6 text-sky-400" /> },
    { name: "Python", icon: <Cpu className="w-6 h-6 text-amber-500" /> },
    { name: "Express.js", icon: <Zap className="w-6 h-6 text-gray-700" /> },
    { name: "Framer Motion", icon: <Heart className="w-6 h-6 text-pink-500" /> },
  ];

  const whyUs = [
    { title: "Quality", desc: "Pixel-perfect design & clean code.", icon: <Code className="w-6 h-6 text-blue-600" /> },
    { title: "Speed", desc: "Fast turnaround without compromising quality.", icon: <Zap className="w-6 h-6 text-amber-500" /> },
    { title: "Support", desc: "Guidance & maintenance after launch.", icon: <Heart className="w-6 h-6 text-pink-500" /> },
    { title: "Scalability", desc: "Solutions that grow with your business.", icon: <Settings className="w-6 h-6 text-sky-500" /> },
  ];

  return (
    <section className="relative overflow-hidden">

      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.07),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.07),transparent_60%)]" />

      {/* HERO */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm bg-gradient-to-b from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Our Portfolio
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto"
        >
          A showcase of impactful projects — blending design, technology, and strategy to deliver results.
        </motion.p>
      </div>

      {/* PROJECT GRID */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 md:h-64 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {project.icon}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{project.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs sm:text-sm rounded-full bg-slate-100 text-slate-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <a
                    href={project.live}
                    className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition text-sm sm:text-base"
                  >
                    View Live <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.caseStudy}
                    className="flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-slate-300 font-medium text-slate-700 hover:bg-slate-100 transition text-sm sm:text-base"
                  >
                    Case Study <FileText size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* TECHNOLOGIES WE USE */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-900"
        >
          Technologies We Use
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 text-center"
        >
          {techList.map((tech, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              variants={fadeUp}
              className="p-6 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/60 to-white/30 border border-slate-200 shadow hover:shadow-xl transition text-center"
            >
              <div className="mb-3">{tech.icon}</div>
              <p className="font-semibold text-slate-800 text-sm sm:text-base">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* WHY WORK WITH US */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-900"
        >
          Why Work With Us
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {whyUs.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, rotate: 1 }}
              variants={fadeUp}
              className="p-6 flex flex-col items-center rounded-2xl bg-gradient-to-br from-white/70 to-white/30 border border-slate-200 shadow hover:shadow-2xl transition text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FINAL CTA */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 text-white p-10 md:p-14 rounded-3xl shadow-xl"
        >
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Start Your Project?</h3>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
            Let’s collaborate to design and develop digital solutions that truly make an impact.
          </p>
          <a
            href="/contact"
            className="px-7 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:bg-slate-100 transition text-sm sm:text-base inline-block"
          >
            Book a Free Consultation
          </a>
        </motion.div>
      </div>

    </section>
  );
}
