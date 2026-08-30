"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CONTAINER, SECTION_Y, SectionHeading, PrimaryCTA, CheckItem } from "./ui";

function TechnologyTag({ children }) {
  return (
    <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
      {children}
    </span>
  );
}

function ProjectTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
      {children}
    </span>
  );
}

function ProjectActions({ project, featured = false }) {
  return (
    <div className={featured ? "mt-8 flex flex-wrap gap-3" : "mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5"}>
      <Link
        href={`/work/${project.slug}`}
        className={
          featured
            ? "inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            : "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 transition hover:text-blue-800"
        }
      >
        Read Case Study
        <ArrowRight size={featured ? 15 : 14} />
      </Link>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            featured
              ? "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              : "inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
          }
        >
          Visit Live
          <ExternalLink size={featured ? 15 : 14} />
        </a>
      )}
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
      className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:border-blue-200"
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="relative block min-h-[300px] overflow-hidden bg-slate-100 lg:min-h-[520px]"
        >
          <Image
            src={project.featuredImage || project.thumbnail || project.img || siteConfig.assets.projectPlaceholder}
            alt={`${project.title} website project by HD Web Studios`}
            fill
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-md backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Featured Deployment
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              {project.industry || project.tag || "Enterprise Client"}
            </p>
            <h3 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">{project.title}</h3>
          </div>
        </Link>

        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
          <div>
            <ProjectTag>{project.category || "Web Architecture"}</ProjectTag>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{project.title}</h3>
          </div>

          {(project.shortDescription || project.challenge) && (
            <div className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">The Business Problem</p>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">{project.shortDescription || project.challenge}</p>
            </div>
          )}

          {(project.results || project.outcomes || []).length > 0 && (
            <div className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Engineered Deliverables</p>
              <ul className="mt-2.5 space-y-2">
                {(project.results || project.outcomes || []).slice(0, 3).map((outcome) => (
                  <CheckItem key={outcome}>{outcome}</CheckItem>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
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
      className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200"
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View ${project.title} case study`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-sm backdrop-blur-md">
          {project.industry || project.category || "Client"}
        </span>
      </Link>

      <div className="p-6 sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">{project.category}</p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600">{project.shortDescription || project.challenge}</p>

        {(project.technologies || []).length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
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
    <section id="work" className={`relative overflow-hidden bg-slate-50/60 border-b border-slate-200/80 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Verified Case Studies"
          title="Digital Platforms Engineered for High-Velocity Acquisition."
          description="Explore real-world Next.js web applications, ecommerce stores, and digital client acquisition systems built for businesses in Ludhiana and India."
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
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Ready to build your digital presence?</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Let&apos;s engineer a high-speed platform tailored for your business.
          </h3>
          <div className="mt-6 flex justify-center">
            <PrimaryCTA href="/audit">Get Free Website Audit</PrimaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
