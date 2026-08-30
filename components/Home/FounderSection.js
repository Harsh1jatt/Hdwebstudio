import Image from "next/image";
import { Code2, SearchCheck, Zap, CheckCircle2 } from "lucide-react";
import { CONTAINER, SECTION_Y, Eyebrow, PrimaryCTA } from "./ui";

const founderPrinciples = [
  { icon: Code2, title: "Built With Purpose", desc: "Every website is architected around your commercial goals, audience, and customer journey." },
  { icon: Zap, title: "Sub-Second Speed", desc: "Server-rendered Next.js performance that runs seamlessly across modern smartphones." },
  { icon: SearchCheck, title: "Deterministic SEO", desc: "Clean technical LocalBusiness schema that earns top rankings in Google Maps." },
];

export default function FounderSection() {
  return (
    <section className={`relative overflow-hidden bg-slate-50/70 border-b border-slate-200/80 ${SECTION_Y}`}>
      <div className={`relative ${CONTAINER}`}>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Founder Image Card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <Image
                src="/images/founder.png"
                alt="Harshdeep, Lead Software Engineer and Founder of HD Web Studios"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:-right-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Engineering Studio</p>
              <p className="mt-0.5 text-sm font-extrabold text-slate-950">Direct Developer Access</p>
            </div>
          </div>

          {/* Founder Story Content */}
          <div>
            <Eyebrow>Direct Developer Leadership</Eyebrow>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Digital Platforms Built by Engineers,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Not Middlemen.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              <p>
                Hi, I&apos;m <strong className="text-slate-950">Harshdeep</strong>, lead software developer and founder behind HD Web Studios in Ludhiana, Punjab.
              </p>
              <p>
                I built this studio because most agencies deliver slow, bloated WordPress templates that look decent on desktop but fail on mobile and fail to capture real client inquiries.
              </p>
              <p>
                We engineer modern Next.js web applications, high-converting ecommerce platforms, and deterministic Local SEO systems from scratch with 100% source code ownership and zero monthly plugin renewal taxes.
              </p>
              <p>
                When you partner with us, you collaborate directly with the software engineer writing your code — ensuring zero lost requirements, rapid iterations, and uncompromising quality.
              </p>
            </div>

            <div className="mt-8 grid gap-3.5 sm:grid-cols-3">
              {founderPrinciples.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div key={principle.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                    <Icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    <h3 className="mt-3 text-xs font-bold text-slate-950">{principle.title}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{principle.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 space-y-2 text-xs text-slate-700 font-medium">
              {[
                "Direct Slack, WhatsApp & phone communication with Harshdeep",
                "Fixed milestone pricing with zero surprise invoices or recurring plugin fees",
                "100% full source code and database ownership upon launch",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PrimaryCTA href="/contact">
                Schedule a Discovery Call
              </PrimaryCTA>
            </div>
          </div>
        </div>

        {/* Founder Quote */}
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50/50 p-8 text-center">
          <p className="text-base sm:text-lg font-bold leading-relaxed text-slate-900">
            &ldquo;A website should never be an expense on your balance sheet. When engineered properly with speed and local search authority, it is your highest-ROI sales representative.&rdquo;
          </p>
          <span className="mt-2 block text-xs font-semibold text-blue-600">— Harshdeep, Founder &amp; Lead Engineer</span>
        </div>
      </div>
    </section>
  );
}
