import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Sparkles, Layers } from "lucide-react";
import { getPublishedProjects } from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Selected Work & Case Studies | HD Web Studios",
  description:
    "Explore real-world website development, ecommerce, and custom software case studies built by HD Web Studios in Ludhiana, Punjab.",
  alternates: {
    canonical: absoluteUrl("/work"),
  },
  openGraph: {
    title: "Selected Work & Case Studies | HD Web Studios",
    description: "Explore digital solutions engineered for speed, clean UX, and business growth.",
    url: absoluteUrl("/work"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative border-b border-slate-100 bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <Sparkles size={13} className="text-blue-600" />
              Proven Work
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Selected Work &amp; Case Studies
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Explore how we engineer custom web architectures, ecommerce stores, and digital acquisition systems that deliver real-world business results.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-12 text-center">
              <Layers className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">Case Studies Coming Soon</h3>
              <p className="mt-2 text-sm text-slate-500">We are currently documenting recent client deployments. Contact us to view live portfolio samples.</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700"
              >
                Discuss Your Project
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id || project.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={project.featuredImage || project.thumbnail || siteConfig.assets.projectPlaceholder}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-md">
                        {project.category}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {project.client && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        {project.client}
                      </p>
                    )}
                    <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {project.shortDescription || project.description}
                    </p>

                    {/* Tech Badges */}
                    {project.technologies?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
                      >
                        Read Case Study
                        <ArrowRight size={14} />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700"
                          title="Visit Live Site"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Let us engineer a custom, high-speed website or application tailored to your business goals.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/audit"
              className="rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-blue-700"
            >
              Get Free Website Audit
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-50"
            >
              Start Discovery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
