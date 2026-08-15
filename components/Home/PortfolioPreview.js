"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

function ProjectTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {children}
    </span>
  );
}

function TechnologyTag({ children }) {
  return (
    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
      {children}
    </span>
  );
}

function ProjectActions({ project, featured = false }) {
  return (
    <div
      className={
        featured
          ? "mt-8 flex flex-wrap gap-3"
          : "mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5"
      }
    >
      <a
        href={project.liveUrl || project.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={
          featured
            ? "inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            : "inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
        }
      >
        View Live
        <ExternalLink size={featured ? 16 : 15} />
      </a>

      <Link
        href={`/portfolio/${project.slug}`}
        className={
          featured
            ? "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            : "inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600"
        }
      >
        Read Case Study
        <ArrowRight size={featured ? 16 : 15} />
      </Link>
    </div>
  );
}

function FeaturedProject({ project, shouldReduceMotion }) {
  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-slate-900/10"
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} live website`}
          className="relative block min-h-[300px] overflow-hidden bg-slate-100 lg:min-h-[540px]"
        >
          <Image
            src={project.featuredImage || project.thumbnail || project.img || siteConfig.assets.projectPlaceholder}
            alt={`${project.title} website project by HD Web Studios`}
            fill
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Featured Case Study
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {project.industry || project.tag || "Client Project"}
            </p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
          </div>
        </a>

        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
          <ProjectTag>{project.category}</ProjectTag>

          <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {project.title}
          </h3>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              The Challenge
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {project.shortDescription || project.challenge}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              What We Built
            </p>

            <ul className="mt-3 space-y-3">
              {(project.results || project.outcomes || []).map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2.5 text-sm leading-5 text-slate-700"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {(project.technologies || []).map((technology) => (
              <TechnologyTag key={technology}>
                {technology}
              </TechnologyTag>
            ))}
          </div>

          <ProjectActions project={project} featured />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, shouldReduceMotion }) {
  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
    >
      <a
        href={project.liveUrl || project.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} live website`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <Image
            src={project.thumbnail || project.featuredImage || project.img || siteConfig.assets.projectPlaceholder}
          alt={`${project.title} website project by HD Web Studios`}
          fill
          loading="lazy"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
          {project.projectType === "concept" ? "Concept Project" : project.industry || project.tag || "Client"}
        </span>
      </a>

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {project.category}
        </p>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {project.shortDescription || project.challenge}
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

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((technology) => (
            <TechnologyTag key={technology}>
              {technology}
            </TechnologyTag>
          ))}
        </div>

        <ProjectActions project={project} />
      </div>
    </motion.article>
  );
}

export default function PortfolioPreview({ projects = [] }) {
  const shouldReduceMotion = useReducedMotion();

  const featuredProject = projects.find((project) => project.featured) || projects[0] || null;
  const otherProjects = projects.filter((project) => project.slug !== featuredProject?.slug);

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Selected Work
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
            Digital Experiences Built Around Real Business Needs.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            From business websites to custom digital systems, we build
            solutions designed around the goals, challenges and customers
            of each business.
          </p>
        </div>

        {/* Featured */}
        {featuredProject && (
          <div className="mt-14 lg:mt-16">
            <FeaturedProject
              project={featuredProject}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        )}

        {/* Other Projects */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center lg:mt-20">
          <p className="text-sm font-medium text-slate-500">
            Have a project in mind?
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Let&apos;s build something that moves your business forward.
          </h3>

          <div className="mt-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Start Your Project

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Websites · Software · SEO · Digital Growth
          </p>
        </div>
      </div>
    </section>
  );
}