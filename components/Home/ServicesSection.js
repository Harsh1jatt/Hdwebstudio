import Link from "next/link";
import { ArrowRight, Globe, ShoppingBag, Code, TrendingUp, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

const PILLARS = [
  {
    key: "Websites",
    icon: Globe,
    title: "Websites & Redesigns",
    description: "High-performance business websites and redesigns engineered for speed, mobile responsiveness, and continuous lead conversion.",
    matchCats: ["Web Development", "Websites", "Maintenance"],
  },
  {
    key: "Ecommerce",
    icon: ShoppingBag,
    title: "Ecommerce & D2C",
    description: "Lightning-fast online stores with payment gateway integrations (Razorpay, UPI, Stripe) and friction-free 1-click mobile checkout.",
    matchCats: ["E-Commerce", "Ecommerce"],
  },
  {
    key: "Software",
    icon: Code,
    title: "Custom Software & Web Apps",
    description: "Full-stack Next.js & MERN SaaS applications, client portals, and administrative business automation platforms.",
    matchCats: ["Web Applications", "Custom Software"],
  },
  {
    key: "Growth",
    icon: TrendingUp,
    title: "Local SEO & Acquisition",
    description: "Google Business Profile optimization, localized search ranking, and conversion funnels to capture nearby buyers in your region.",
    matchCats: ["SEO & Growth", "SEO", "Lead Generation"],
  },
];

export default function ServicesSection({ services = [] }) {
  return (
    <section id="services" className={`relative overflow-hidden bg-slate-50/50 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="What We Build"
          title={
            <>
              Modern Web Experiences
              <br className="hidden md:block" />
              <span className="text-slate-500"> Engineered For Measurable Growth.</span>
            </>
          }
          description="We focus on four core digital engineering pillars to help businesses establish authority, attract buyers, and operate efficiently online."
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
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {pillar.description}
                  </p>

                  {/* Sample Service Badges */}
                  {matchingServices.length > 0 && (
                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                      {matchingServices.slice(0, 2).map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block text-[11px] font-medium text-slate-500 hover:text-blue-600 transition-colors"
                        >
                          • {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-slate-100 pt-3">
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
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-400"
          >
            Explore Complete Service Catalog
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
