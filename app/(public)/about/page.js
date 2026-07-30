// app/about/page.jsx
"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  Rocket,
  ShieldCheck,
  Handshake,
  Gauge,
  Award,
  Clock,
  CheckCircle2,
  PhoneCall,
  Palette,
  Code2,
  Search,
} from "lucide-react";

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(34,197,94,0.15),transparent_60%)]" />

      {/* --- HERO --- */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-emerald-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm"
          >
            Crafting Digital Experiences That Drive Growth
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg md:text-xl text-slate-600"
          >
            Harshdeep Web Studios is a Ludhiana-based agency delivering{" "}
            <span className="font-semibold text-slate-800">
              modern, high-performance, SEO-ready websites
            </span>{" "}
            for businesses across India & beyond.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
            >
              Book a Free Consultation
            </a>
            <a
              href="/portfolio"
              className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              See Our Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* --- STORY --- */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
              alt="Design collaboration"
              className="w-full h-[420px] object-cover"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Story
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We started with one goal: help businesses turn websites into{" "}
              <span className="font-semibold">real growth engines</span>. From
              one-page sites to custom solutions, we ship with clean UI, strong
              performance, and scalable architecture.
            </p>
            <p className="text-slate-600 leading-relaxed">
              As a nimble team led by{" "}
              <span className="font-semibold">Harshdeep</span>, we work like a
              product partner — aligning with your vision, shipping fast, and
              delivering measurable results.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {[
                { icon: <Gauge className="w-5 h-5 text-blue-600" />, label: "Performance First" },
                { icon: <Search className="w-5 h-5 text-emerald-600" />, label: "SEO-Ready Builds" },
                { icon: <ShieldCheck className="w-5 h-5 text-cyan-600" />, label: "Secure Code" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2"
                >
                  {item.icon}
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- WHY CHOOSE US --- */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
        >
          Why Choose Us
        </motion.h3>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: <Rocket className="w-8 h-8 text-blue-600" />,
              title: "Modern Stack",
              desc: "MERN, Tailwind, Next.js — fast, scalable, future-ready.",
            },
            {
              icon: <Handshake className="w-8 h-8 text-emerald-600" />,
              title: "Client-Centric",
              desc: "Your growth = our roadmap. We focus on outcomes.",
            },
            {
              icon: <Award className="w-8 h-8 text-pink-600" />,
              title: "Quality First",
              desc: "Pixel-perfect UI, Core Web Vitals, clean code.",
            },
            {
              icon: <Clock className="w-8 h-8 text-amber-600" />,
              title: "On-Time Delivery",
              desc: "Clear timelines, proactive updates, zero surprises.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="mb-4">{card.icon}</div>
              <h4 className="text-lg font-semibold text-slate-900 mb-1">{card.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- PROCESS --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
        >
          Our Process — Simple & Transparent
        </motion.h3>

        <div className="max-w-3xl mx-auto">
          {[
            {
              icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
              title: "1) Discovery Call",
              desc: "We understand your goals, audience, and success metrics.",
            },
            {
              icon: <Palette className="w-6 h-6 text-rose-600" />,
              title: "2) Design & Content",
              desc: "Clean UI/UX, modern layouts, persuasive copywriting.",
            },
            {
              icon: <Code2 className="w-6 h-6 text-emerald-600" />,
              title: "3) Development",
              desc: "Performance-first build with SEO & accessibility hygiene.",
            },
            {
              icon: <CheckCircle2 className="w-6 h-6 text-cyan-600" />,
              title: "4) Review & Revisions",
              desc: "Up to 3 revisions included before final launch.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative pl-12 pb-10 last:pb-0"
            >
              <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {step.icon}
              </div>
              {i < 3 && (
                <div className="absolute left-4 top-10 h-full w-px bg-slate-200" />
              )}
              <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
              <p className="text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FOUNDER --- */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop"
              alt="Founder workspace"
              className="w-full h-[360px] object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="md:col-span-3"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              A Note from the Founder
            </h3>
            <p className="text-slate-600 leading-relaxed">
              I’m <span className="font-semibold">Harshdeep</span>. I started Harshdeep Web
              Studios to empower businesses in Ludhiana and across India with{" "}
              <span className="font-semibold">modern, honest, and impactful</span>{" "}
              web solutions. We keep things simple: clear communication,
              transparent pricing, and websites that convert.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              We’re not just builders — we’re your long-term partners.
              Let’s build something great together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- TECH STRIP --- */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-center text-sm uppercase tracking-wider text-slate-500 mb-6">
            Tools & Technologies We Love
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 items-center opacity-90">
            {[
              "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NextJS-Light.svg",
              "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Light.svg",
              "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TailwindCSS-Light.svg",
              "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Light.svg",
              "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg",
              "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Wordpress.svg",
            ].map((src, i) => (
              <div key={i} className="flex items-center justify-center p-3">
                <img src={src} alt="Tech logo" className="h-10 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA --- */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-center bg-gradient-to-r from-blue-600 via-emerald-500 to-cyan-500 text-white p-10 md:p-14 rounded-3xl shadow-xl"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Let’s Build Something Great Together
          </h3>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Book a free consultation and discover how we can help you grow your
            business with a modern, high-performing website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-7 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:bg-slate-100 transition"
            >
              Book a Call
            </a>
            <a
              href="/services"
              className="px-7 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
