import Link from "next/link";
import { ArrowRight, Globe, ShoppingBag, Code, TrendingUp, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

const PILLARS = [
  {
    key: "Websites",
    icon: Globe,
    title: "Websites & Modernization",
    description: "High-speed Next.js websites and modernization architectures engineered for sub-second speeds, clean UX, and consistent inbound inquiries.",
    matchCats: ["Web Development", "Websites", "Maintenance"],
  },
  {
    key: "Ecommerce",
    icon: ShoppingBag,
    title: "Ecommerce & D2C Stores",
    description: "Lightning-fast digital storefronts with integrated UPI, Razorpay payments, automated shipping tracking, and 1-click mobile checkout funnels.",
    matchCats: ["E-Commerce", "Ecommerce"],
  },
  {
    key: "Software",
    icon: Code,
    title: "Custom Software & Web Apps",
    description: "Full-stack Next.js, Node.js & MongoDB SaaS platforms, client portals, and administrative business automation platforms.",
    matchCats: ["Web Applications", "Custom Software"],
  },
  {
    key: "Growth",
    icon: TrendingUp,
    title: "Local SEO & Google 3-Pack",
    description: "Google Business Profile optimization, localized search authority, and conversion funnels to capture high-intent buyers in your region.",
    matchCats: ["SEO & Growth", "SEO", "Lead Generation"],
  },
];

export default function ServicesSection({ services = [] }) {
  return (
    <section id="services" className={`relative overflow-hidden bg-white border-b border-slate-200/80 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Core Capabilities"
          title="Digital Growth Frameworks Engineered for Business."
          description="We focus on four foundational engineering pillars to help businesses establish authority, capture high-ticket clients, and scale operations."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const matchingServices = services.filter((s) =>
              pillar.matchCats.some((cat) => (s.category || "").toLowerCase() === cat.toLowerCase())
            );

            return (
              <div
                key={pillar.key}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-600/10"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-blue-600 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>

                  {/* Sample Service Badges */}
                  {matchingServices.length > 0 && (
                    <div className="mt-5 space-y-1.5 border-t border-slate-200/70 pt-3.5">
                      {matchingServices.slice(0, 2).map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                        >
                          &bull; {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-slate-200/70 pt-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700"
                  >
                    View Capabilities <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition hover:bg-slate-50 hover:border-slate-300"
          >
            Explore Complete Service Catalog
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
