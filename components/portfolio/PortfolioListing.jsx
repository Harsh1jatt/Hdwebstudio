"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { siteConfig } from "@/config/site";

function getProjectImage(project) {
  return project?.img ?? project?.image ?? null;
}

function getProjectShortDescription(project) {
  return project?.shortDescription ?? project?.challenge ?? "";
}

function ProjectCard({ project }) {
  const imageSrc =
    project.featuredImage ||
    project.thumbnail ||
    getProjectImage(project) ||
    siteConfig.assets.projectPlaceholder;

  return (
    <motion.article
      variants={fadeUp}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:shadow-2xl"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <Image
          src={imageSrc}
          alt={`${project.title} project by HD Web Studios`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
          {project.tag}
        </span>
      </Link>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {project.category}
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
          {project.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {getProjectShortDescription(project)}
        </p>

        <ul className="mt-5 space-y-2.5">
          {(project.results || project.outcomes || []).slice(0, 2).map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-2 text-sm text-slate-700"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            View Live
            <ExternalLink size={15} />
          </a>
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600"
          >
            Read Case Study
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioListing({ projects = [] }) {
  const featuredProject = projects.find((project) => project.featured) || projects[0] || null;
  const otherProjects = projects.filter((project) => project.slug !== featuredProject?.slug);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.07),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.07),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-b from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-sm sm:text-5xl md:text-6xl"
        >
          Our Portfolio
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl"
        >
          Real client projects and case studies — blending design, technology,
          and strategy to deliver results.
        </motion.p>
      </div>

      {featuredProject && (
        <div className="relative mx-auto max-w-7xl px-6 pb-12">
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <Link
                href={`/portfolio/${featuredProject.slug}`}
                className="relative block min-h-[280px] overflow-hidden bg-slate-100 lg:min-h-[420px]"
              >
                <Image
                  src={
                    featuredProject.featuredImage ||
                    featuredProject.thumbnail ||
                    getProjectImage(featuredProject) ||
                    siteConfig.assets.projectPlaceholder
                  }
                  alt={`${featuredProject.title} featured project`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </Link>
              <div className="flex flex-col justify-center p-8">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Featured Case Study
                </span>
                <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
                  {featuredProject.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  {featuredProject.category}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {featuredProject.shortDescription || getProjectShortDescription(featuredProject)}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/portfolio/${featuredProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Read Case Study
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {otherProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 p-10 text-center text-white shadow-xl md:p-14"
        >
          <h3 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Start Your Project?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
            Let&apos;s collaborate to design and develop digital solutions that
            make an impact.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-slate-100 sm:text-base"
          >
            Book a Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
