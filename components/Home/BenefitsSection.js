import Link from "next/link";
import { ArrowRight, Code2, Gauge, Smartphone, SearchCheck, KeyRound, MessageCircle } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

const benefits = [
  { title: "Direct Lead Developer Collaboration", desc: "You communicate directly with Harshdeep throughout discovery, UI design, and production coding. Zero confusing middle managers.", icon: Code2, bg: "bg-blue-50", iconColor: "text-blue-600" },
  { title: "Sub-Second Speed Guarantee", desc: "Server-rendered Next.js components, edge WebP/AVIF media delivery, and zero cumulative layout shifts for sub-0.8s mobile response.", icon: Gauge, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { title: "Mobile-First Touch Ergonomics", desc: "Tailored for thumb navigation, zero layout movement, and fast WhatsApp inquiry funnels on smartphones.", icon: Smartphone, bg: "bg-purple-50", iconColor: "text-purple-600" },
  { title: "LocalBusiness Schema & 3-Pack SEO", desc: "Deterministic JSON-LD structured data and Local SEO foundation designed to dominate Google Maps rankings in Punjab.", icon: SearchCheck, bg: "bg-amber-50", iconColor: "text-amber-600" },
  { title: "100% Full Source Code Ownership", desc: "Full GitHub repository ownership, database credentials, and production deployment control with zero vendor lock-in.", icon: KeyRound, bg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { title: "30-Day Post-Launch Warranty", desc: "Dedicated warranty, monitoring, and ongoing optimization support to ensure uninterrupted performance after deployment.", icon: MessageCircle, bg: "bg-cyan-50", iconColor: "text-cyan-600" },
];

export default function BenefitsSection() {
  return (
    <section className={`relative overflow-hidden bg-white border-b border-slate-200/80 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Engineering Benchmarks"
          title="The HD Web Studios Standard of Quality."
          description="We combine modern full-stack development, conversion-engineered layouts, and technical SEO to build digital platforms that drive real commercial revenue."
        />

        <ul className="mt-14 grid list-none gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <li
                key={benefit.title}
                className="group rounded-3xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-600/10 sm:p-8"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${benefit.bg} border border-slate-200 shadow-xs`}>
                  <Icon className={`h-6 w-6 ${benefit.iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-950">{benefit.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{benefit.desc}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 text-center lg:mt-16">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Want to see where your website stands?</p>
          <Link
            href="/audit"
            className="group mt-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 transition hover:text-blue-800"
          >
            Get a Free 5-Second Website Audit
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
