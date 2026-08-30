import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Gauge,
  SearchCheck,
  KeyRound,
  MessageCircle,
  Zap,
  Smartphone,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { absoluteUrl, siteConfig, whatsAppUrl, defaultWhatsAppMessage } from "@/config/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata = {
  title: { absolute: "About HD Web Studios | Web Developers in Ludhiana" },
  description:
    "HD Web Studios is a founder-led website development and digital agency in Ludhiana, Punjab. We engineer high-speed Next.js websites, custom cloud software, and Local SEO systems.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About HD Web Studios | Web Developers in Ludhiana",
    description:
      "Founder-led website development agency in Ludhiana, Punjab. High-speed Next.js websites, local SEO, and full code ownership.",
    url: absoluteUrl("/about"),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/founder.png"),
        width: 800,
        height: 1000,
        alt: "Harshdeep, Founder of HD Web Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About HD Web Studios | Web Developers in Ludhiana",
    description:
      "Founder-led website development agency in Ludhiana, Punjab.",
    images: [absoluteUrl("/images/founder.png")],
  },
};

const principles = [
  {
    icon: Code2,
    title: "Built With Purpose",
    desc: "Every website is architected around your commercial goals, target audience, and customer journey.",
  },
  {
    icon: Zap,
    title: "Sub-Second Performance",
    desc: "Lightning-fast Next.js pages that maintain sub-0.8s load times across mobile networks.",
  },
  {
    icon: SearchCheck,
    title: "Deterministic SEO",
    desc: "Structured schema data that gives your website strong starting visibility in Google search.",
  },
];

const values = [
  {
    icon: Code2,
    title: "Direct Developer Access",
    desc: "You communicate directly with Harshdeep throughout your project. Zero layers, zero confusion.",
  },
  {
    icon: Gauge,
    title: "Sub-Second Speed Guarantee",
    desc: "Clean server code, optimized images, and zero layout shift are standard on every delivery.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ergonomics",
    desc: "Over 75% of your customers visit on mobile. We build seamless touch-optimized interfaces.",
  },
  {
    icon: SearchCheck,
    title: "Local SEO Foundations",
    desc: "Semantic structure, JSON-LD schema, metadata, and fast crawlability baked in from day one.",
  },
  {
    icon: KeyRound,
    title: "100% Code Ownership",
    desc: "Your source code, database, domain, and content belong entirely to you without vendor lock-in.",
  },
  {
    icon: MessageCircle,
    title: "Continuous Support",
    desc: "We provide dedicated post-launch maintenance, security monitoring, and performance updates.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About HD Web Studios",
  description: "HD Web Studios is a founder-led digital agency in Ludhiana, Punjab. We build professional websites, local SEO, and digital growth solutions for businesses across India.",
  url: absoluteUrl("/about"),
  mainEntity: {
    "@type": "Person",
    name: "Harshdeep",
    jobTitle: "Founder & Lead Developer",
    worksFor: {
      "@type": "Organization",
      name: "HD Web Studios",
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kakka Rd, Subhash Nagar",
        addressLocality: "Ludhiana",
        addressRegion: "Punjab",
        postalCode: "141007",
        addressCountry: "IN",
      },
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-slate-50/70 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About Studio" }]} />

          <div className="mx-auto max-w-3xl text-center mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              Founder-Led Web Engineering Studio
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Engineering Digital Platforms That{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Drive Measurable Growth.
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
              We help ambitious businesses build high-performance websites, custom web applications, and local search systems that establish authority and convert visitors into high-ticket clients.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/audit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Get Free Website Audit
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition hover:bg-slate-50"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 sm:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">
                <Image
                  src="/images/founder.png"
                  alt="Harshdeep, Lead Developer and Founder of HD Web Studios"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Contact</p>
                <p className="text-xs font-extrabold text-slate-900">Harshdeep &bull; Lead Engineer</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Meet the Founder
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                High-Performance Code Built by an Engineer, Not an Agency Bureaucracy.
              </h2>
              <div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                <p>
                  I founded HD Web Studios in Ludhiana because I saw business owners continually frustrated by traditional agency setups. Clients were paying high retainer fees, waiting weeks for simple copy changes, and receiving slow WordPress sites loaded with fragile third-party plugins.
                </p>
                <p>
                  At HD Web Studios, we operate differently. You collaborate directly with me. There are no layers of salespeople or account managers relaying messages back and forth. You get clear technical scoping, fixed milestones, and rapid delivery.
                </p>
                <p>
                  Every website and web application is built on modern Next.js 16 with React 19, TypeScript architecture, and Tailwind CSS. We prioritize sub-second load times, mobile touch ergonomics, and clean LocalBusiness structured data.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {principles.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <div
                      key={principle.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-xs"
                    >
                      <Icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
                      <h3 className="mt-3 text-xs font-bold text-slate-950">
                        {principle.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                        {principle.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Values Grid */}
      <section className="bg-slate-50/60 py-16 sm:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              Studio Benchmarks
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Why Forward-Thinking Businesses Choose HD Web Studios.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              We eliminate template bloat and replace it with bespoke engineering, transparent communication, and 100% source code ownership.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-slate-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local Office & NAP Information */}
      <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <MapPin size={16} />
                Ludhiana Headquarters
              </div>
              <h3 className="mt-2 text-2xl font-black text-slate-950">
                Operating Locally in Punjab, Delivering Nationally
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
                Registered office located at Kakka Rd, Subhash Nagar, Ludhiana, Punjab 141007. We serve industrial manufacturers, medical clinics, and growth companies locally and globally.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <a
                href={whatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs transition hover:bg-emerald-700"
              >
                <MessageCircle size={15} />
                Chat with Harshdeep
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Let&apos;s Engineer Your Digital Growth Engine.
          </h2>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl mx-auto">
            Ready to upgrade your website to a high-speed Next.js architecture that captures more inbound inquiries? Let&apos;s discuss your requirements.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/audit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get Free Website Audit
              <ArrowRight size={15} />
            </Link>
            <a
              href={whatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition hover:bg-slate-50"
            >
              <MessageCircle size={15} />
              Direct WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
