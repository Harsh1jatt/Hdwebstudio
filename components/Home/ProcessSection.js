import { MessageSquareText, PenTool, Rocket, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading, PrimaryCTA } from "./ui";

const processSteps = [
  {
    step: "01",
    icon: MessageSquareText,
    title: "Discuss Your Goals",
    desc: "We start by understanding your business, audience, goals, and what you want your website or web application to achieve. No technical knowledge is required — we'll help you figure out the right approach.",
    points: ["Understand your requirements", "Discuss goals and target audience", "Recommend the right solution"],
  },
  {
    step: "02",
    icon: PenTool,
    title: "Design & Development",
    desc: "Once the direction is clear, we design and develop your digital experience with a focus on usability, responsive design, performance, and SEO fundamentals.",
    points: ["Design the user experience", "Develop and integrate functionality", "Review, test, and refine"],
  },
  {
    step: "03",
    icon: Rocket,
    title: "Launch & Support",
    desc: "After everything is reviewed and approved, we prepare your website for launch. Once live, we can continue supporting you with updates, improvements, and ongoing maintenance.",
    points: ["Final testing and optimization", "Deployment and launch", "Post-launch support available"],
  },
];

export default function ProcessSection() {
  return (
    <section className={`relative overflow-hidden bg-slate-950 text-white ${SECTION_Y}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className={`relative ${CONTAINER}`}>
        <SectionHeading
          dark
          eyebrow="How We Work"
          title={
            <>
              From Idea to Launch,
              <br className="hidden md:block" />
              <span className="text-slate-400"> Without the Complexity.</span>
            </>
          }
          description="A clear, collaborative process that keeps you informed at every stage — from the first conversation to launch and beyond."
        />

        <div className="relative mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-14 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.step}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-8"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <Icon className="h-5 w-5 text-blue-400" strokeWidth={1.8} />
                  </div>
                  <span className="text-5xl font-black leading-none text-white/[0.06]">{step.step}</span>
                </div>

                <h3 className="mt-7 text-xl font-bold tracking-tight text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{step.desc}</p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-14 text-center lg:mt-16">
          <p className="text-sm text-slate-400">Have a project in mind?</p>
          <div className="mt-5 flex justify-center">
            <PrimaryCTA href="/contact" dark>
              Get a Free Audit
            </PrimaryCTA>
          </div>
          <p className="mt-4 text-xs text-slate-500">Tell us about your project and we&apos;ll take it from there.</p>
        </div>
      </div>
    </section>
  );
}
