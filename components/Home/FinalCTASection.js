import { MessageCircle, CheckCircle2 } from "lucide-react";
import { defaultWhatsAppMessage, whatsAppUrl } from "@/config/site";
import { PrimaryCTA } from "./ui";

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-blue-300 backdrop-blur-sm">
          Let&apos;s Build Something That Matters
        </div>

        <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Have a Business Goal?
          <span className="mt-2 block text-blue-400">Let&apos;s Turn It Into a Digital Solution.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Whether you need a professional online presence, more customer enquiries, a better digital experience, or
          a custom solution for your business — let&apos;s talk about what you&apos;re trying to achieve.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryCTA href="/contact" dark className="w-full sm:w-auto">
            Get a Free Digital Audit
          </PrimaryCTA>

          <a
            href={whatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 text-green-400" />
            Talk to Us on WhatsApp
          </a>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
          {["No obligation", "Clear recommendations", "Transparent communication"].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <div className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />}
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              {item}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-8 text-center">
          <p className="text-sm leading-6 text-slate-500">
            You don&apos;t need to know what technology you need.
            <span className="text-slate-300">
              {" "}Tell us what you want to achieve — we&apos;ll help you figure out the right solution.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
