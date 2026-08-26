import Link from "next/link";
import { ArrowRight, Code2, Gauge, Smartphone, SearchCheck, KeyRound, MessageCircle } from "lucide-react";
import { CONTAINER, SECTION_Y, SectionHeading } from "./ui";

const benefits = [
  { title: "Built by a Developer, Not a Sales Team", desc: "You communicate directly with the person working on your website or web application. Clear communication, fewer layers, and no unnecessary handoffs.", icon: Code2, bg: "bg-blue-50", iconColor: "text-blue-600" },
  { title: "Performance Comes First", desc: "We focus on clean code, optimized assets, responsive layouts, and efficient loading so your website feels fast and smooth across modern devices.", icon: Gauge, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { title: "Designed for Every Screen", desc: "Your customers may discover you from a phone, tablet, or desktop. We build responsive experiences that remain easy to use across screen sizes.", icon: Smartphone, bg: "bg-purple-50", iconColor: "text-purple-600" },
  { title: "SEO-Ready From the Start", desc: "We build with important technical SEO fundamentals in mind, including semantic structure, metadata, performance, mobile usability, and crawlability.", icon: SearchCheck, bg: "bg-orange-50", iconColor: "text-orange-600" },
  { title: "You Own Your Digital Assets", desc: "Your domain and website belong to you. We believe in transparent project handover and building long-term relationships without unnecessary lock-in.", icon: KeyRound, bg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { title: "Support Beyond Launch", desc: "Launching your website is not the end of the relationship. We remain available for updates, fixes, improvements, and ongoing technical support.", icon: MessageCircle, bg: "bg-green-50", iconColor: "text-green-600" },
];

export default function BenefitsSection() {
  return (
    <section className={`relative overflow-hidden bg-slate-50 ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Why HD Web Studios"
          title={
            <>
              A Better Way to Build
              <br className="hidden md:block" />
              <span className="text-slate-500"> Your Digital Presence.</span>
            </>
          }
          description="We combine thoughtful design, modern development, performance, and SEO fundamentals to create digital experiences that are built for your business — not from a one-size-fits-all template."
        />

        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <li
                key={benefit.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg}`}>
                  <Icon className={`h-6 w-6 ${benefit.iconColor}`} strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-950">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.desc}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 text-center lg:mt-16">
          <p className="text-sm text-slate-500">Have a project in mind?</p>
          <Link
            href="/contact"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
          >
            Get a free audit
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
