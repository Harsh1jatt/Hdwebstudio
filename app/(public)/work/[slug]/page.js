import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Sparkles, Layers, ShieldCheck, MessageCircle } from "lucide-react";
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { absoluteUrl, siteConfig, whatsAppUrl, defaultWhatsAppMessage } from "@/config/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Case Study Not Found | HD Web Studios" };
  }

  const rawTitle = project.seoTitle || `${project.title} Case Study | HD Web Studios`;
  const title = {
    absolute: rawTitle.includes("HD Web Studios")
      ? rawTitle
      : `${rawTitle} | HD Web Studios`,
  };
  const description = project.seoDescription || project.shortDescription || `${project.title} case study by HD Web Studios.`;
  const ogImage = project.ogImage || project.featuredImage || siteConfig.assets.projectPlaceholder;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/work/${project.slug}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/work/${project.slug}`),
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: `${project.title} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const imageSrc = project.featuredImage || project.thumbnail || siteConfig.assets.projectPlaceholder;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteConfig.url}/work/${project.slug}#case-study`,
    name: project.title,
    headline: project.title,
    description: project.seoDescription || project.shortDescription || project.description || "",
    creator: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: absoluteUrl(imageSrc),
    url: absoluteUrl(`/work/${project.slug}`),
    ...(project.client ? { client: { "@type": "Organization", name: project.client } } : {}),
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-slate-50/70 py-4">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Work", href: "/work" },
              { label: project.title },
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="max-w-3xl">
            {project.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
                <Sparkles size={12} className="text-blue-600" />
                {project.category}
              </span>
            )}
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 sm:text-base">
              {project.shortDescription || project.description}
            </p>

            {/* Quick Meta Pills */}
            <div className="mt-8 flex flex-wrap gap-4 border-y border-slate-200/80 py-4 text-xs">
              {project.client && (
                <div>
                  <span className="text-slate-400 font-medium">Client: </span>
                  <span className="font-bold text-slate-900">{project.client}</span>
                </div>
              )}
              {project.industry && (
                <div>
                  <span className="text-slate-400 font-medium">Industry: </span>
                  <span className="font-bold text-slate-900">{project.industry}</span>
                </div>
              )}
              {project.location && (
                <div>
                  <span className="text-slate-400 font-medium">Location: </span>
                  <span className="font-bold text-slate-900">{project.location}</span>
                </div>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                >
                  Visit Live Site <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Hero Media */}
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-md bg-slate-100">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>

          {/* Main Case Study Content */}
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              {/* Challenge */}
              {project.challenge && (
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">The Challenge</h2>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">Our Solution</h2>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {project.features?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">Key Deliverables</h2>
                  <ul className="mt-4 space-y-2.5">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery if present */}
              {project.gallery?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">Project Gallery</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Meta */}
            <div className="space-y-6">
              {/* Tech Stack */}
              {project.technologies?.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Technology Stack
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Card */}
              <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-cyan-50/50 p-6 shadow-xs">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
                <h3 className="mt-3 text-base font-extrabold text-slate-950">Need a similar architecture?</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  We engineer modern digital platforms tailored specifically around your commercial requirements.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-blue-700"
                >
                  Start Discovery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
