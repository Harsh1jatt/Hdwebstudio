import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import {
  getPublishedProjects,
  getProjectBySlug,
} from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found | HD Web Studios",
    };
  }

  return {
    title: project.seoTitle || `${project.title} Case Study | HD Web Studios`,
    description:
      project.seoDescription ||
      project.shortDescription ||
      `${project.category} case study by HD Web Studios.`,
    alternates: {
      canonical: absoluteUrl(`/portfolio/${project.slug}`),
    },
    openGraph: {
      title: project.seoTitle || `${project.title} Case Study | HD Web Studios`,
      description: project.seoDescription || project.shortDescription || project.challenge,
      images: [
        {
          url: absoluteUrl(project.ogImage || project.featuredImage || siteConfig.assets.projectPlaceholder),
          alt: `${project.title} case study`,
        },
      ],
    },
  };
}

export default async function PortfolioCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const imageSrc =
    project.featuredImage || project.thumbnail || siteConfig.assets.projectPlaceholder;
  const relatedProjects = (await getPublishedProjects())
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {project.projectType === "concept"
                  ? "Concept Project"
                  : "Client Case Study"}
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                {project.category || project.industry}
              </p>

              <p className="mt-6 text-base leading-7 text-slate-600">
                {project.shortDescription || project.challenge}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Visit Live Project
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/10">
              <Image
                src={imageSrc}
                alt={`${project.title} website case study`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Project Overview
          </p>
          <p className="mt-5 text-xl leading-9 text-slate-700">
            {project.description || project.shortDescription}
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            The Challenge
          </h2>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm leading-7 text-slate-600">{project.challenge || "Challenge details coming soon."}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Our Solution
          </h2>
          <div className="mt-8 rounded-2xl border border-slate-200 p-6">
            <p className="text-sm leading-7 text-slate-600">{project.solution || "Solution details coming soon."}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            What We Built
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Key Features
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {(project.features || []).map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-400"
                />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Technology & Capabilities
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            {(project.technologies || []).map((technology) => (
              <span
                key={technology}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Project Result
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            Built to Support the Business
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {(project.results || []).join(" ")}
          </p>
        </div>
      </section>

      {project.gallery?.length ? (
        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          {project.testimonial?.quote ? (
            <blockquote className="text-lg leading-8 text-slate-600">
              “{project.testimonial.quote}”
              {project.testimonial.author ? (
                <footer className="mt-3 text-sm font-semibold text-slate-900">
                  {project.testimonial.author}
                  {project.testimonial.role ? ` — ${project.testimonial.role}` : ""}
                </footer>
              ) : null}
            </blockquote>
          ) : null}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Start Your Project
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-950">Related Projects</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedProjects.map((item) => (
                <Link key={item.slug} href={`/portfolio/${item.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{item.category || item.industry || "Project"}</p>
                  <h3 className="mt-2 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.shortDescription || item.challenge}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
