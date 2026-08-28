import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Globe, ShoppingBag, Code, TrendingUp } from "lucide-react";

const CATEGORY_META = {
  Websites: {
    icon: Globe,
    title: "Websites & Digital Acquisition",
    subtitle: "Custom business websites and redesigns engineered for speed, mobile UX, and high conversion.",
  },
  "E-Commerce": {
    icon: ShoppingBag,
    title: "Ecommerce & Online Stores",
    subtitle: "Scalable D2C and B2B online storefronts with payment gateways and 1-click mobile checkout.",
  },
  "Web Applications": {
    icon: Code,
    title: "Custom Software & Web Apps",
    subtitle: "Tailored Next.js / MERN platforms, client portals, and workflow automation systems.",
  },
  "SEO & Growth": {
    icon: TrendingUp,
    title: "Local SEO & Digital Growth",
    subtitle: "Google Business Profile optimization and search dominance for regional businesses.",
  },
};

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
    if (cat === "E-Commerce") groups["E-Commerce"].push(s);
    else if (cat === "Web Applications" || cat === "Custom Software") groups["Web Applications"].push(s);
    else if (cat === "SEO & Growth" || cat === "SEO") groups["SEO & Growth"].push(s);
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
              Core Capabilities
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Web Development &amp; Digital Solutions
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              We design and build fast, modern, conversion-focused websites and custom software tailored for growing businesses.
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
                  <p className="mt-1 text-sm text-slate-500">{meta.subtitle}</p>
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
                        <p className="mt-2 text-sm leading-6 text-slate-600">
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
                          Explore Service
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

      {/* Audit CTA */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Not sure which service fits your current stage?
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Run a free digital audit or speak directly with our engineering team for an honest assessment.
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
              Talk to Founder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
