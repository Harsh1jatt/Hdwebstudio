import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Globe, ShoppingBag, Code, TrendingUp, Zap, ShieldCheck, Smartphone, Layers, HelpCircle, MessageSquare } from "lucide-react";
import { whatsAppUrl } from "@/config/site";

const CATEGORY_META = {
  Websites: {
    icon: Globe,
    title: "Websites & Digital Acquisition",
    subtitle: "Custom business websites and modernization engineered for sub-second speed, mobile UX, and high conversion.",
  },
  "E-Commerce": {
    icon: ShoppingBag,
    title: "Ecommerce & Online Stores",
    subtitle: "Scalable D2C and B2B online storefronts with Indian payment gateways (Razorpay, UPI) and 1-click checkout.",
  },
  "Web Applications": {
    icon: Code,
    title: "Custom Software & Web Apps",
    subtitle: "Tailored Next.js / MERN platforms, client portals, and workflow automation systems.",
  },
  "SEO & Growth": {
    icon: TrendingUp,
    title: "Local SEO & Digital Growth",
    subtitle: "Google Business Profile optimization and search dominance for businesses in Ludhiana and Punjab.",
  },
};

const serviceFaqs = [
  {
    q: "Why should we choose HD Web Studios over other web development agencies?",
    a: "We operate on a founder-led engineering model where you communicate directly with senior software engineers. We build custom Next.js web applications rather than fragile WordPress themes, ensuring sub-second load times, 100% intellectual property ownership, and technical SEO from day one.",
  },
  {
    q: "What is your typical project delivery timeline?",
    a: "Starter business websites launch in 7 to 10 days. Comprehensive Business Acquisition websites take 10 to 14 days. Custom software, SaaS MVPs, and complex ecommerce stores take 3 to 6 weeks depending on scope.",
  },
  {
    q: "Do you build mobile-friendly websites?",
    a: "Yes. Every single screen is designed mobile-first for modern smartphones and tablets, ensuring thumb-friendly navigation, instant touch response, and flawless layout stability.",
  },
  {
    q: "Do we own the full source code and database?",
    a: "Yes, 100%. Upon project milestone completion and full payment, you receive complete GitHub repository ownership, database credentials, and production deployment control with zero vendor lock-in.",
  },
];

const lifecycleSteps = [
  { step: "01", title: "Discovery & Strategy", desc: "Understanding your business model, target market in Ludhiana/Punjab, and key competitors." },
  { step: "02", title: "Information Architecture", desc: "Mapping page hierarchies, high-intent content clusters, and conversion funnels." },
  { step: "03", title: "UI/UX Prototype Design", desc: "Creating bespoke, mobile-first layouts aligned with your brand's unique positioning." },
  { step: "04", title: "Server Component Build", desc: "Writing performant, clean Next.js code with LocalBusiness Schema and API endpoints." },
  { step: "05", title: "QA & Performance Testing", desc: "Cross-device verification, Core Web Vitals tuning, and accessibility testing." },
  { step: "06", title: "Zero-Downtime Launch", desc: "Deploying to production cloud hosting with SSL, XML sitemaps, and GA4 event tracking." },
];

export default function ServicesListing({ services = [] }) {
  // Group services into 4 pillars
  const groups = {
    Websites: [],
    "E-Commerce": [],
    "Web Applications": [],
    "SEO & Growth": [],
  };

  for (const s of services) {
    const cat = s.category || "Web Development";
    if (cat === "E-Commerce" || s.slug?.includes("ecommerce")) groups["E-Commerce"].push(s);
    else if (cat === "Web Applications" || cat === "Custom Software" || s.slug?.includes("application")) groups["Web Applications"].push(s);
    else if (cat === "SEO & Growth" || cat === "SEO" || s.slug?.includes("seo")) groups["SEO & Growth"].push(s);
    else groups.Websites.push(s);
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative border-b border-slate-100 bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <Sparkles size={13} className="text-blue-600" />
              Full-Stack Engineering Capabilities
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Web Development &amp; Digital Solutions
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              We design and engineer high-speed, modern, conversion-focused websites, ecommerce storefronts, and custom software systems in Ludhiana, Punjab.
            </p>
          </div>
        </div>
      </section>

      {/* Grouped Services */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 space-y-16">
          {Object.entries(groups).map(([catKey, catServices]) => {
            if (catServices.length === 0) return null;
            const meta = CATEGORY_META[catKey] || CATEGORY_META.Websites;
            const Icon = meta.icon;

            return (
              <div key={catKey} className="space-y-6">
                {/* Category Header */}
                <div className="border-b border-slate-200/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={18} />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                      {meta.title}
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{meta.subtitle}</p>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {catServices.map((service) => (
                    <div
                      key={service.slug}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                    >
                      <div>
                        {service.eyebrow && (
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            {service.eyebrow}
                          </p>
                        )}
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                          <Link href={`/services/${service.slug}`}>
                            {service.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          {service.shortDescription || service.description}
                        </p>

                        {/* Deliverables snippet */}
                        {service.whatYouGet?.length > 0 && (
                          <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                            {service.whatYouGet.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-blue-600" />
                                <span className="line-clamp-1">{item.title || item.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-4">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700"
                        >
                          Explore Service Details
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Lifecycle */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Our 6-Step Engineering Process
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              From requirement discovery to production launch, here is how we engineer high-performance digital systems.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lifecycleSteps.map((s, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-xs">
                  {s.step}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-950">{s.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Services Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Learn about our development standards, code ownership, and support models.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {serviceFaqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-base font-bold text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit CTA */}
      <section className="border-t border-slate-100 bg-slate-900 py-16 sm:py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Not sure which service fits your current stage?
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base max-w-xl mx-auto">
            Run a free digital audit or speak directly with our engineering team for an honest assessment of your digital presence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/audit"
              className="rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-blue-500"
            >
              Get Free Website Audit
            </Link>
            <a
              href={whatsAppUrl("Hi Harshdeep, I'm reviewing the services on hdwebstudios.in and would like to discuss my project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:bg-slate-700"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
