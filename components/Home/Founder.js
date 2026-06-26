"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { ArrowRight, Award, Briefcase, Code2 } from "lucide-react";

export default function Founder() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src="/founder.png"
                alt="Harshdeep Singh"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg border border-slate-200 px-6 py-5">
              <p className="text-3xl font-bold text-blue-600">5+</p>
              <p className="text-sm text-slate-500">
                Real World
                <br />
                Projects
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
              Meet The Founder
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Hi, I'm <span className="text-blue-600">Harshdeep Singh</span>
            </h2>

            <p className="text-slate-600 leading-8 mb-6">
              I'm a MERN Stack & Next.js Developer helping businesses
              establish a modern online presence through fast, scalable,
              and conversion-focused websites.
            </p>

            <p className="text-slate-600 leading-8 mb-8">
              As the founder of <strong>HD Web Studios</strong>, I've built
              institute management systems, business websites, online exam
              portals, CRM solutions, and custom web applications for
              clients across Punjab. My goal is simple—deliver websites
              that not only look great but also generate real business.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <Code2 className="w-8 h-8 text-blue-600 mb-3" />
                <p className="font-semibold text-slate-900">
                  MERN Stack
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Full Stack Development
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <Briefcase className="w-8 h-8 text-blue-600 mb-3" />
                <p className="font-semibold text-slate-900">
                  Client Projects
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Business Websites & Apps
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <Award className="w-8 h-8 text-blue-600 mb-3" />
                <p className="font-semibold text-slate-900">
                  Quality
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Clean Code & SEO Ready
                </p>
              </div>

            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-full font-semibold transition"
            >
              Let's Build Your Website
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}