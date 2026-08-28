import AuditClient from "./AuditClient";
import Link from "next/link";
import { Sparkles, Zap, Smartphone, Search, MessageSquare, ShieldCheck, Gauge, CheckCircle2, HelpCircle } from "lucide-react";
import { absoluteUrl, siteConfig, whatsAppUrl } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Free Website Audit & Performance Diagnostic | HD Web Studios" },
  description:
    "Analyze your website speed, mobile responsiveness, on-page SEO foundations, and conversion barriers with HD Web Studios' free instant diagnostic tool.",
  alternates: {
    canonical: absoluteUrl("/audit"),
  },
  openGraph: {
    title: "Free Website Audit & Speed Diagnostic | HD Web Studios",
    description: "Get an instant diagnostic report on your website Core Web Vitals, SEO, and lead conversion readiness.",
    url: absoluteUrl("/audit"),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Audit & Performance Diagnostic | HD Web Studios",
    description: "Analyze your website speed, mobile responsiveness, and SEO in under 5 seconds.",
  },
};

const auditFaqs = [
  {
    q: "How does this free website audit tool analyze my website?",
    a: "Our audit engine evaluates your website across four critical performance pillars: Core Web Vitals speed, mobile viewport configuration, technical SEO tags (title, description, canonicals, Open Graph, Schema), and conversion mechanisms (call-to-action buttons, WhatsApp triggers, contact forms).",
  },
  {
    q: "Why is website speed and Core Web Vitals important for my business?",
    a: "Google uses Core Web Vitals as a primary ranking signal. If your website takes longer than 2.5 seconds to load, over 50% of mobile visitors bounce before seeing your services, resulting in lost inquiries and lower Google rankings.",
  },
  {
    q: "What is LocalBusiness Schema and why do I need it in Ludhiana?",
    a: "LocalBusiness Schema is structured JSON-LD code that tells Google your exact business name, physical address, geo-coordinates, and operating hours. It is essential for ranking in Google Maps and the Local 3-Pack.",
  },
  {
    q: "Can you fix the issues identified in my website audit report?",
    a: "Yes. HD Web Studios specializes in website modernization, speed optimization, and complete technical SEO rebuilds on Next.js to resolve all performance and conversion bottlenecks.",
  },
];

const auditChecks = [
  {
    icon: Zap,
    title: "Core Web Vitals & Speed",
    description: "Evaluates Largest Contentful Paint (LCP), total payload size, render-blocking scripts, and server response latency.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsiveness",
    description: "Tests mobile viewport tags, font readability, tap target spacing, and responsive layout integrity on smartphones.",
  },
  {
    icon: Search,
    title: "On-Page SEO & Schema",
    description: "Audits title tag length, meta descriptions, canonical URLs, Open Graph social tags, and structured JSON-LD data.",
  },
  {
    icon: MessageSquare,
    title: "Conversion Funnels",
    description: "Identifies whether your website has direct WhatsApp click-to-chat triggers, phone links, and frictionless lead forms.",
  },
];

export default function AuditPage() {
  const auditJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/audit#faq`,
    mainEntity: auditFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditJsonLd) }}
      />

      {/* Header */}
      <section className="relative border-b border-slate-100 bg-slate-50/50 py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles size={13} className="text-blue-600" />
            Free Instant Diagnostic
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Free Website Speed & SEO Audit
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg max-w-2xl mx-auto">
            Test your website for Core Web Vitals speed, mobile viewport usability, Google SEO structure, and conversion barriers in under 5 seconds.
          </p>
        </div>
      </section>

      {/* Interactive Audit Tool */}
      <AuditClient />

      {/* What This Audit Checks */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              What Our Free Audit Evaluates
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              We analyze the four foundational pillars required for high Google rankings and consistent customer inquiries.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {auditChecks.map((check, idx) => {
              const Icon = check.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">{check.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{check.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Small Business Websites Fail to Convert */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 sm:p-12 text-white">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
              Why 75% of Small Business Websites Fail to Generate Leads
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Most websites are built like static brochures rather than active business acquisition systems. Without technical optimization, you lose potential clients at every stage of the funnel:
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 text-left">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400">1. High Bounce Rate</div>
                <p className="mt-2 text-sm font-semibold text-white">Slow Mobile Load Times</p>
                <p className="mt-1 text-xs text-slate-400">Over 53% of mobile visitors leave pages that take longer than 3 seconds to render.</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">2. Low Search Visibility</div>
                <p className="mt-2 text-sm font-semibold text-white">Missing Local SEO Schema</p>
                <p className="mt-1 text-xs text-slate-400">Without LocalBusiness JSON-LD markup, Google struggles to verify your location in Ludhiana and Punjab.</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400">3. High Friction</div>
                <p className="mt-2 text-sm font-semibold text-white">No Direct WhatsApp Triggers</p>
                <p className="mt-1 text-xs text-slate-400">Forcing mobile users into long contact forms reduces conversion rates by over 60% in the Indian market.</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">4. Poor Trust Signals</div>
                <p className="mt-2 text-sm font-semibold text-white">Outdated Design & Missing Reviews</p>
                <p className="mt-1 text-xs text-slate-400">Visitors judge business credibility in under 50 milliseconds based on visual modernism.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Book a Free Strategy Consultation
              </Link>
              <a
                href={whatsAppUrl("Hi Harshdeep, I would like to discuss my website audit results and explore an optimization roadmap.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                <MessageSquare size={16} />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Audit FAQs */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Website Audit Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Learn how website performance impacts your business growth.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {auditFaqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
