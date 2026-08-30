import Link from "next/link";
import { Search, Palette, Code2, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Search,
    title: "1. Diagnostic",
    desc: "We analyze your commercial goals, audience search behavior in Punjab, and technical bottlenecks.",
  },
  {
    step: "02",
    icon: Palette,
    title: "2. Architecture",
    desc: "High-conversion, mobile-first design wireframes and user journeys built for clear authority.",
  },
  {
    step: "03",
    icon: Code2,
    title: "3. Engineering",
    desc: "Custom Next.js 16 full-stack development with sub-0.8s Core Web Vitals performance tuning.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "4. Deployment",
    desc: "Full QA testing, LocalBusiness schema verification, zero-downtime launch, and code repository handover.",
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "5. Acquisition",
    desc: "Continuous technical maintenance, Google Maps 3-Pack optimization, and inquiry monitoring.",
  },
];

export default function ProcessSection() {
  return (
    <section className={`relative overflow-hidden bg-slate-50/60 border-b border-slate-200/80 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Execution Lifecycle"
          title="A Transparent 5-Step Engineering Lifecycle."
          description="Direct developer communication at every stage of the project — zero account managers, zero confusing jargon, and zero unexpected delays."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:mt-16">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-300">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
