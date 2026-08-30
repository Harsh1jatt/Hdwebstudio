import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Globe, ShoppingBag, Code, TrendingUp, Zap, ShieldCheck, Smartphone, Layers, HelpCircle, MessageSquare } from "lucide-react";
import { whatsAppUrl } from "@/config/site";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const CATEGORY_META = {
  Websites: {
    icon: Globe,
    title: "Websites & Modernization",
    subtitle: "Custom business websites and redesign architectures engineered for sub-second speed, mobile UX, and high conversion.",
  },
  "E-Commerce": {
    icon: ShoppingBag,
    title: "Ecommerce & D2C Stores",
    subtitle: "Scalable online storefronts with Indian payment gateways (Razorpay, UPI) and 1-click mobile checkout funnels.",
  },
  "Web Applications": {
    icon: Code,
    title: "Custom Software & Web Apps",
    subtitle: "Full-stack Next.js, Node.js & MongoDB portals, SaaS applications, and internal workflow automation systems.",
  },
  "SEO & Growth": {
    icon: TrendingUp,
    title: "Local SEO & Acquisition",
    subtitle: "Google Business Profile optimization and Google Maps 3-Pack search dominance for businesses in Ludhiana and Punjab.",
  },
};

const serviceFaqs = [
  {
    q: "Why should we choose HD Web Studios over traditional web agencies?",
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
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative border-b border-slate-200 bg-slate-50/70 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Services & Capabilities" }]} />

          <div className="max-w-3xl mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              <Sparkles size={13} className="text-blue-600" />
              Engineered Web Capabilities
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Web Development &amp; Digital Solutions
            </h1>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 sm:text-base">
              We design and engineer high-speed, modern, conversion-focused websites, ecommerce storefronts, and custom software systems in Ludhiana, Punjab.
            </p>
          </div>
        </div>
      </section>

      {/* Grouped Services */}
      <section className="py-16 sm:py-24 border-b border-slate-200">
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
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                      <Icon size={18} />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
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
                      className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-600/10"
                    >
                      <div>
                        {service.eyebrow && (
                          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                            {service.eyebrow}
                          </p>
                        )}
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
                          <Link href={`/services/${service.slug}`}>
                            {service.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {service.shortDescription || service.description}
                        </p>

                        {/* Deliverables snippet */}
                        {service.whatYouGet?.length > 0 && (
                          <div className="mt-5 space-y-2 border-t border-slate-200/70 pt-4">
                            {service.whatYouGet.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                                <span className="line-clamp-1">{item.title || item.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 border-t border-slate-200/70 pt-4">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700"
                        >
                          Explore Service Details
                          <ArrowRight size={13} />
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
      <section className="bg-slate-50/60 py-16 sm:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
              Delivery Methodology
            </span>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Our 6-Step Engineering Process
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              From requirement discovery to production launch, here is how we engineer high-performance digital systems.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lifecycleSteps.map((s, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-xs">
                  {s.step}
                </div>
                <h3 className="mt-4 text-base font-extrabold text-slate-950">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Services Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Learn about our development standards, code ownership, and support models.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {serviceFaqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-sm font-bold text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light Audit CTA */}
      <section className="bg-gradient-to-r from-blue-50/80 via-white to-cyan-50/80 py-16 sm:py-20 text-center border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Not sure which service fits your current stage?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Run a free digital audit or speak directly with our engineering team for an honest assessment of your digital presence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/audit"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get Free Website Audit
            </Link>
            <a
              href={whatsAppUrl("Hi Harshdeep, I'm reviewing the services on hdwebstudios.in and would like to discuss my project.")}
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
