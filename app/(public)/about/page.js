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
} from "lucide-react";
import { absoluteUrl, siteConfig, whatsAppUrl, defaultWhatsAppMessage } from "@/config/site";

export const metadata = {
  title: { absolute: "About HD Web Studios | Web Developers in Ludhiana" },
  description:
    "HD Web Studios is a founder-led website development and digital agency in Ludhiana, Punjab. We engineer high-speed Next.js websites and custom cloud software.",
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
    desc: "Every website is designed around your business goals, audience, and customer journey.",
  },
  {
    icon: Zap,
    title: "Performance First",
    desc: "Fast-loading, responsive experiences that work smoothly across modern devices.",
  },
  {
    icon: SearchCheck,
    title: "SEO Ready",
    desc: "Clean technical foundations that give your website a strong starting point for search visibility.",
  },
];

const values = [
  {
    icon: Code2,
    title: "Direct Developer Communication",
    desc: "You communicate directly with the person building your project. No layers, no handoffs, no confusion.",
  },
  {
    icon: Gauge,
    title: "Performance Comes First",
    desc: "Clean code, optimized assets, responsive layouts, and efficient loading are standard, not optional extras.",
  },
  {
    icon: Smartphone,
    title: "Designed for Every Screen",
    desc: "Your customers discover you from phones, tablets, or desktops. We build for all of them.",
  },
  {
    icon: SearchCheck,
    title: "SEO-Ready From the Start",
    desc: "Semantic structure, metadata, performance, and mobile usability built in from day one.",
  },
  {
    icon: KeyRound,
    title: "You Own Your Digital Assets",
    desc: "Your domain, content, and data belong to you. No lock-in, no dependencies.",
  },
  {
    icon: MessageCircle,
    title: "Support Beyond Launch",
    desc: "Launching your website is not the end. We remain available for updates, fixes, and improvements.",
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
    jobTitle: "Founder & Developer",
    worksFor: {
      "@type": "Organization",
      name: "HD Web Studios",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              About HD Web Studios
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              A Founder-Led Digital Agency
              <span className="text-slate-400"> in Ludhiana.</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We help businesses build a professional digital presence that gets
              them discovered, trusted, and contacted. Not just a website &mdash;
              a complete digital growth system.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Get a Free Audit
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                <Image
                  src="/images/founder.png"
                  alt="Harshdeep, Founder of HD Web Studios"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Meet the Founder
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Hi, I&apos;m Harshdeep.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <p>
                  I started HD Web Studios with a simple belief: a business
                  website should be more than just a digital visiting card. It
                  should communicate your value, build trust with your customers,
                  and make it easier for people to take action.
                </p>
                <p>
                  I work directly with every client. No layers of account managers
                  and developers between you and the person actually building your
                  website. You get clear communication, honest timelines, and a
                  developer who understands your business goals.
                </p>
                <p>
                  My approach combines modern web development, thoughtful design,
                  performance optimization, and SEO fundamentals to create
                  websites that are built around real business requirements &mdash;
                  not from one-size-fits-all templates.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {principles.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <div
                      key={principle.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <Icon className="h-5 w-5 text-blue-600" strokeWidth={1.8} />
                      <h3 className="mt-4 text-sm font-bold text-slate-900">
                        {principle.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
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

      {/* Why HD Web Studios */}
      <section className="border-y border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Why HD Web Studios
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A Better Way to Build
              <span className="text-slate-400"> Your Digital Presence.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We combine thoughtful design, modern development, performance, and
              SEO fundamentals to create digital experiences that are built for
              your business.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 text-base font-bold tracking-tight text-slate-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Let&apos;s Build Something That Moves Your Business Forward.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Whether you need a professional website, better local search
            visibility, or a complete digital presence &mdash; let&apos;s
            discuss what you&apos;re trying to achieve.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/audit"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Get Free Website Audit
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
