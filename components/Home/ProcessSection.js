import Link from "next/link";
import { Search, Palette, Code2, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Discover",
    desc: "We analyze your business model, target buyers, competitor landscape, and specific commercial goals.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Design",
    desc: "Bespoke, mobile-first UX prototypes engineered for visual authority and high conversion rates.",
  },
  {
    step: "03",
    icon: Code2,
    title: "Develop",
    desc: "High-speed engineering with Next.js, React, and MongoDB for sub-second Core Web Vitals performance.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Launch",
    desc: "Rigorous QA testing, on-page SEO verification, schema integration, and flawless zero-downtime deployment.",
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "Grow",
    desc: "Continuous technical support, local SEO ranking optimization, and lead generation tracking.",
  },
];

export default function ProcessSection() {
  return (
    <section className={`relative overflow-hidden bg-white ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              A Transparent, 5-Step Process
              <br className="hidden md:block" />
              <span className="text-slate-500"> From Concept To Long-Term Growth.</span>
            </>
          }
          description="Direct communication with our engineering team at every stage — no account managers, no confusing jargon, no surprises."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:mt-16">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-300">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
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
