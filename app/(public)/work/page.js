import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Sparkles, Layers, CheckCircle2, Zap, ShieldCheck, Smartphone, Search, MessageCircle } from "lucide-react";
import { getPublishedProjects } from "@/lib/projects";
import { absoluteUrl, siteConfig, whatsAppUrl } from "@/config/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Web Development Case Studies & Portfolio | HD Web Studios" },
  description:
    "Explore real-world Next.js website development, ecommerce, and custom software case studies built by HD Web Studios in Ludhiana, Punjab.",
  alternates: {
    canonical: absoluteUrl("/work"),
  },
  openGraph: {
    title: "Web Development Case Studies & Portfolio | HD Web Studios",
    description: "Explore digital solutions engineered for speed, clean UX, and business acquisition in Punjab.",
    url: absoluteUrl("/work"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Case Studies | HD Web Studios",
    description: "Explore real-world web application and SEO case studies from HD Web Studios.",
  },
};

const workFaqs = [
  {
    q: "Can you build custom features tailored to my specific industry in Punjab?",
    a: "Yes. From machine telemetry catalogs for manufacturers in Focal Point to online booking intake funnels for clinics and clean energy calculators for EPC contractors, we architect bespoke digital workflows from scratch.",
  },
  {
    q: "Do your client websites meet Google Core Web Vitals standards?",
    a: "Yes. Every website we launch achieves green Core Web Vitals with sub-second page loads, responsive WebP/AVIF media delivery, and zero cumulative layout shift.",
  },
  {
    q: "Do clients own 100% of their project code upon launch?",
    a: "Yes, 100%. We provide complete source code transfer, GitHub repository ownership, and database credentials with zero vendor lock-in.",
  },
];

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  const workJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HD Web Studios Portfolio & Case Studies",
    description: "Featured web development, ecommerce, and software case studies.",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/work/${p.slug}`),
      name: p.title,
    })),
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }}
      />

      {/* Header */}
      <section className="relative border-b border-slate-200 bg-slate-50/70 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Selected Work & Case Studies" }]} />

          <div className="max-w-3xl mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              <Sparkles size={13} className="text-blue-600" />
              Verified Case Studies
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Selected Work &amp; Case Studies
            </h1>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 sm:text-base">
              Explore how we engineer custom Next.js web architectures, ecommerce platforms, and digital acquisition systems that deliver verified commercial results.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-12 text-center">
              <Layers className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">Case Studies Coming Soon</h3>
              <p className="mt-2 text-xs text-slate-500">We are currently documenting recent client deployments. Contact us to view live portfolio samples.</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700"
              >
                Discuss Your Project
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id || project.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
                >
                  {/* Thumbnail */}
                  <Link href={`/work/${project.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block">
                    <Image
                      src={project.featuredImage || project.thumbnail || siteConfig.assets.projectPlaceholder}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.category && (
                      <span className="absolute left-4 top-4 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-sm backdrop-blur-md">
                        {project.category}
                      </span>
                    )}
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7 justify-between">
                    <div>
                      {project.client && (
                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                          {project.client}
                        </p>
                      )}
                      <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                        <Link href={`/work/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                        {project.shortDescription || project.description}
                      </p>

                      {/* Tech Badges */}
                      {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
                      >
                        Read Case Study
                        <ArrowRight size={13} />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700"
                          title="Visit Live Site"
                        >
                          <ExternalLink size={13} />
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

      {/* Engineering Standards */}
      <section className="bg-slate-50/60 py-16 sm:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              Quality Assurance
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Engineering Principles Behind Every Deployment
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              We never use bloated WordPress themes or slow drag-and-drop builders. Every client project is custom-engineered.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <Zap size={20} />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-950">Sub-Second Load Times</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">Server-rendered Next.js components and edge image optimization delivering sub-second response.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <Smartphone size={20} />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-950">Mobile-First Touch UX</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">Tailored for smartphone ergonomics with thumb-friendly tap targets and zero layout shifts.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <Search size={20} />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-950">Local SEO Schema</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">Built-in LocalBusiness, Product, and Service JSON-LD schemas for top Google visibility.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-slate-950">100% IP Ownership</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">Complete source code and database ownership transferred upon milestone completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study FAQs */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Case Study &amp; Project FAQs
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Frequently asked questions about our past client work and execution methodology.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {workFaqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-sm font-bold text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light CTA */}
      <section className="bg-gradient-to-r from-blue-50/80 via-white to-cyan-50/80 py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Ready to Engineer Your Business Acquisition Platform?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Let us engineer a custom, high-speed website or application tailored to your business goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/audit"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get Free Website Audit
            </Link>
            <a
              href={whatsAppUrl("Hi Harshdeep, I'm reviewing the case studies on hdwebstudios.in and would like to discuss my project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-800 transition hover:bg-emerald-100"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
