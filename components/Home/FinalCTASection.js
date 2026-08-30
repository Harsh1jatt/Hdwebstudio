import { MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { defaultWhatsAppMessage, whatsAppUrl } from "@/config/site";
import { PrimaryCTA } from "./ui";

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-slate-50 py-20 sm:py-24 lg:py-28">
      {/* Background Soft Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
          <Sparkles size={13} />
          High-Velocity Next.js Development
        </div>

        <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Have an Ambitious Business Goal?{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Let&apos;s Build the Engine For It.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
          Whether you need a custom high-converting web platform, Google Maps 3-Pack SEO domination, or a full-stack SaaS portal — let&apos;s engineer the right solution for your business.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <PrimaryCTA href="/audit" className="w-full sm:w-auto">
            Get Free Website Audit
          </PrimaryCTA>

          <a
            href={whatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Talk on WhatsApp
          </a>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-slate-600">
          {["Zero Sales Pressure", "Direct Developer Access", "100% Source Code Ownership"].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <div className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />}
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
