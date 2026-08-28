"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CONTAINER, SECTION_Y, SectionHeading, PrimaryCTA, CheckItem } from "./ui";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function TechnologyTag({ children }) {
  return (
    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
      {children}
    </span>
  );
}

function ProjectTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {children}
    </span>
  );
}

function ProjectActions({ project, featured = false }) {
  return (
    <div className={featured ? "mt-8 flex flex-wrap gap-3" : "mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5"}>
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
        href={`/work/${project.slug}`}
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
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-slate-900/10"
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <a
          href={project.liveUrl || project.demoUrl || `/portfolio/${project.slug}`}
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
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{project.title}</h3>
          </div>
        </a>

        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
          <ProjectTag>{project.category}</ProjectTag>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{project.title}</h3>              {(project.shortDescription || project.challenge) && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">The Challenge</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{project.shortDescription || project.challenge}</p>
            </div>
          )}

          {(project.results || project.outcomes || []).length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Built</p>
              <ul className="mt-3 space-y-3">
                {(project.results || project.outcomes || []).map((outcome) => (
                  <CheckItem key={outcome}>{outcome}</CheckItem>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-2">
            {(project.technologies || []).map((technology) => (
              <TechnologyTag key={technology}>{technology}</TechnologyTag>
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
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{project.category}</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{project.shortDescription || project.challenge}</p>

        {(project.results || project.outcomes || []).length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {(project.results || project.outcomes || []).slice(0, 2).map((outcome) => (
              <CheckItem key={outcome}>{outcome}</CheckItem>
            ))}
          </ul>
        )}

        {(project.technologies || []).length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {(project.technologies || []).slice(0, 3).map((technology) => (
              <TechnologyTag key={technology}>{technology}</TechnologyTag>
            ))}
          </div>
        )}

        <ProjectActions project={project} />
      </div>
    </motion.article>
  );
}

export default function PortfolioSection({ projects = [] }) {
  const shouldReduceMotion = useReducedMotion();
  if (!projects.length) return null;
  const featuredProject = projects.find((project) => project.featured) || projects[0] || null;
  const otherProjects = projects.filter((project) => project.slug !== featuredProject?.slug);

  return (
    <section id="work" className={`relative overflow-hidden bg-gradient-to-b from-slate-50 to-white ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Selected Work"
          title="Digital Experiences Built Around Real Business Needs."
          description="From business websites to custom digital systems, we build solutions designed around the goals, challenges and customers of each business."
        />

        {featuredProject && (
          <div className="mt-14 lg:mt-16">
            <FeaturedProject project={featuredProject} shouldReduceMotion={shouldReduceMotion} />
          </div>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {otherProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </div>

        <div className="mt-16 text-center lg:mt-20">
          <p className="text-sm font-medium text-slate-500">Have a project in mind?</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Let&apos;s build something that moves your business forward.
          </h3>
          <div className="mt-6 flex justify-center">
            <PrimaryCTA href="/audit">Get Free Website Audit</PrimaryCTA>
          </div>
          <p className="mt-4 text-xs text-slate-400">Websites · Software · SEO · Digital Growth</p>
        </div>
      </div>
    </section>
  );
}
