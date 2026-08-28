import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { whatsAppUrl } from "@/config/site";

const DEFAULT_PLANS = [
  {
    name: "Starter Website",
    badge: "Fast Launch",
    price: "₹14,999",
    period: "one-time",
    description: "Ideal for local service businesses and professionals needing a high-speed, authoritative online presence.",
    features: [
      "Custom responsive design (up to 5 pages)",
      "Next.js App Router sub-second speed",
      "Mobile-first UI & touch-optimized UX",
      "Google Search Console & on-page SEO setup",
      "Spam-protected contact & WhatsApp lead capture",
      "7–10 business days delivery",
      "100% full source code ownership",
    ],
    cta: "Choose Starter",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Business Acquisition",
    badge: "Most Popular",
    price: "₹29,999",
    period: "one-time",
    description: "For growing companies and manufacturers that need active customer acquisition, local SEO dominance, and blog CMS.",
    features: [
      "Complete bespoke website (up to 10+ pages)",
      "Full CMS for blog & service management",
      "LocalBusiness Schema & Google Maps optimization",
      "Conversion-engineered lead capture funnels",
      "GA4 custom event & conversion tracking",
      "Speed optimization for Core Web Vitals",
      "30 days post-launch priority support",
    ],
    cta: "Choose Business",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Custom Software & Ecommerce",
    badge: "Tailored Scope",
    price: "Custom Quote",
    period: "milestone-based",
    description: "For D2C ecommerce stores, multi-role web apps, SaaS portals, and custom business management software.",
    features: [
      "Full-stack Next.js, Node.js & MongoDB architecture",
      "Payment gateway integration (Razorpay, UPI, Stripe)",
      "Role-based user permissions & admin controls",
      "Custom database models & automated workflows",
      "Third-party API & webhook integrations",
      "Dedicated staging & production deployment",
      "Comprehensive SLA & technical maintenance",
    ],
    cta: "Request Scoping Call",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingPlans({ plans = [] }) {
  const displayPlans = plans.length >= 3 ? plans : DEFAULT_PLANS;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative border-b border-slate-100 bg-slate-50/50 py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles size={13} className="text-blue-600" />
            Transparent Investment
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg max-w-2xl mx-auto">
            Clear packages with zero hidden fees. Every project includes full code ownership, modern Next.js performance, and direct founder communication.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {displayPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all duration-300 ${
                  plan.highlight
                    ? "border-blue-600 ring-2 ring-blue-600/10 shadow-lg bg-white"
                    : "border-slate-200/80 bg-slate-50/30 hover:bg-white hover:border-slate-300"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    {plan.badge || "Recommended"}
                  </span>
                )}

                <div>
                  {!plan.highlight && plan.badge && (
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {plan.badge}
                    </span>
                  )}
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 border-y border-slate-100 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-slate-400">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-3">
                    {(plan.features || []).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-700">
                        <Check size={16} className="mt-0.5 shrink-0 text-blue-600" />
                        <span>{typeof feat === "string" ? feat : feat.name || feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <Link
                    href={plan.href || "/contact"}
                    className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      plan.highlight
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                        : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {plan.cta || "Get Started"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Scope Note */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <ShieldCheck size={16} className="text-blue-600" />
              Custom Project Scoping
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Custom web applications, ERPs, examination portals, and large ecommerce platforms are scoped individually based on database requirements, integration points, and user roles. Contact us for a fixed milestone estimate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
