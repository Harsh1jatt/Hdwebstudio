import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return {
      title: "Case Study Not Found | HD Web Studios",
    };
  }

  return {
    title: `${project.title} Case Study | HD Web Studios`,
    description: `${project.category} case study by HD Web Studios. Explore the challenge, approach, solution and project outcomes.`,
    alternates: {
      canonical: `https://www.hdwebstudios.in/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study | HD Web Studios`,
      description: project.challenge,
      images: [
        {
          url: project.img,
          alt: `${project.title} case study`,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">

          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Our Work
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {project.type === "concept"
                  ? "Concept Project"
                  : "Client Case Study"}
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                {project.category}
              </p>

              <p className="mt-6 text-base leading-7 text-slate-600">
                {project.challenge}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Visit Live Project
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/10">
              <Image
                src={project.img}
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

      {/* Overview */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Project Overview
          </p>

          <p className="mt-5 text-xl leading-9 text-slate-700">
            {caseStudy.overview}
          </p>

        </div>
      </section>

      {/* Challenge */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">

          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            The Challenge
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {caseStudy.problem.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <p className="text-sm leading-6 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Approach */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">

          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Our Approach
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {caseStudy.approach.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-slate-200 p-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-6 text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Solution */}
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            What We Built
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Solution
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {caseStudy.solution.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span className="text-sm text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Technology */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">

          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Technology & Capabilities
          </h2>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.technologies.map((technology) => (
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

      {/* Result */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Project Result
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            Built to Support the Business
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {caseStudy.result}
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">

          <p className="text-lg leading-8 text-slate-600">
            {caseStudy.conclusion}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Start Your Project
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              View More Work
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}