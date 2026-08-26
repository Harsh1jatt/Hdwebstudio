import Image from "next/image";
import { Code2, SearchCheck, Zap, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, Eyebrow, PrimaryCTA } from "./ui";

const founderPrinciples = [
  { icon: Code2, title: "Built With Purpose", desc: "Every website is designed around your business goals, audience, and customer journey." },
  { icon: Zap, title: "Performance First", desc: "Fast-loading, responsive experiences that work smoothly across modern devices." },
  { icon: SearchCheck, title: "SEO Ready", desc: "Clean technical foundations that give your website a strong starting point for search visibility." },
];

export default function FounderSection() {
  return (
    <section className={`relative overflow-hidden bg-slate-950 text-white ${SECTION_Y}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className={`relative ${CONTAINER}`}>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              <Image
                src="/images/founder.png"
                alt="Harshdeep, Founder of HD Web Studios"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/10 bg-white px-5 py-4 shadow-xl sm:-right-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">HD Web Studios</p>
              <p className="mt-1 text-sm font-bold text-slate-900">Built by a Developer</p>
            </div>
          </div>

          <div>
            <Eyebrow dark>Meet the Founder</Eyebrow>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Building Digital Experiences
              <span className="text-slate-400"> That Businesses Can Rely On.</span>
            </h2>

            <div className="mt-7 space-y-5 text-base leading-7 text-slate-300">
              <p>
                Hi, I&apos;m <span className="font-semibold text-white">Harshdeep</span>, the founder and developer
                behind HD Web Studios.
              </p>
              <p>
                I started HD Web Studios with a simple belief: a business website should be more than just a digital
                visiting card. It should communicate your value, build trust with your customers, and make it easier
                for people to take action.
              </p>
              <p>
                My approach combines modern web development, thoughtful design, performance optimization, and SEO
                fundamentals to create websites and web applications that are built around real business
                requirements.
              </p>
              <p>
                When you work with HD Web Studios, you&apos;re not passed between layers of account managers and
                developers. You get direct communication with the person building your digital experience.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {founderPrinciples.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div key={principle.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <Icon className="h-5 w-5 text-blue-400" strokeWidth={1.8} />
                    <h3 className="mt-4 text-sm font-bold text-white">{principle.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{principle.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-2.5">
              {[
                "Direct communication with the developer",
                "Clear and transparent project communication",
                "Focus on performance, usability, and long-term maintainability",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <PrimaryCTA href="/contact" dark>
                Let&apos;s Talk About Your Project
              </PrimaryCTA>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-10 text-center">
          <p className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
            &quot;Good websites don&apos;t just look impressive. They make it easier for the right people to trust
            your business and take the next step.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
