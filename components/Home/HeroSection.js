import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  LineChart,
  MonitorSmartphone,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  Activity,
} from "lucide-react";
import { whatsAppUrl, defaultWhatsAppMessage } from "@/config/site";

export default function HeroSection({ settings = {} }) {
  const hero = settings.homepage?.hero || {};
  const heroHeading1 = hero.heading1 || "Turn Your Digital Presence Into a";
  const heroHeading2 = hero.heading2 || "Client Acquisition System";
  const heroDescription =
    hero.description ||
    "We engineer custom Next.js websites, high-conversion web applications, and Google Local SEO engines for businesses, manufacturers, and startups in Ludhiana, Punjab, and across India.";
  const heroCtaText = hero.ctaText || "Get Free Website Audit";
  const heroCtaLink = hero.ctaLink || "/audit";

  return (
    <section className="relative isolate overflow-hidden bg-slate-50/50 py-16 sm:py-24 lg:py-28 border-b border-slate-200/80">
      {/* Background Soft Glow & Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[480px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-200/60 via-cyan-100/50 to-indigo-100/50 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Hero Content */}
          <div className="max-w-3xl">
            {/* Live Sprint Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              Ludhiana Studio &middot; Next.js 16 App Router &middot; Full Code Ownership
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]">
              {heroHeading1}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {heroHeading2}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8 max-w-2xl">
              {heroDescription}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <Link
                href={heroCtaLink}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                {heroCtaText}
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                View Case Studies
              </Link>
            </div>

            {/* Engineering Guarantees */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Sub-0.8s LCP Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>100% Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Google Maps 3-Pack SEO</span>
              </div>
            </div>
          </div>

          {/* Right Visual: 3D Telemetry HUD (Full Light Theme) */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xl shadow-slate-900/[0.08] backdrop-blur-xl">
              {/* Browser Top Chrome */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="ml-2 text-xs font-mono font-medium text-slate-500">
                    hdwebstudios.in/engine
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  100% Score
                </div>
              </div>

              {/* Telemetry Display Box */}
              <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/40 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      Core Web Vitals Telemetry
                    </span>
                    <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                      Production Speed Benchmarks
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <Activity size={20} />
                  </div>
                </div>

                {/* Metric Telemetry Grid */}
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <span className="text-[11px] font-semibold text-slate-500 block">LCP Speed</span>
                    <span className="mt-1 text-lg font-black text-emerald-600 block">0.6s</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Optimal</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <span className="text-[11px] font-semibold text-slate-500 block">Mobile UX</span>
                    <span className="mt-1 text-lg font-black text-blue-600 block">100/100</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <span className="text-[11px] font-semibold text-slate-500 block">CLS Shift</span>
                    <span className="mt-1 text-lg font-black text-emerald-600 block">0.00</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Zero Shift</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Client Acquisition Velocity</span>
                    <span className="font-bold text-blue-600">3.4x Faster Funnel</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />
                  </div>
                </div>
              </div>

              {/* Bottom Quick Features */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 pt-3 text-center">
                <div className="px-2">
                  <p className="text-xs font-bold text-slate-900">Next.js 16</p>
                  <p className="text-[11px] text-slate-500">React 19 Server</p>
                </div>
                <div className="px-2">
                  <p className="text-xs font-bold text-slate-900">Local SEO</p>
                  <p className="text-[11px] text-slate-500">JSON-LD Schema</p>
                </div>
                <div className="px-2">
                  <p className="text-xs font-bold text-slate-900">WhatsApp</p>
                  <p className="text-[11px] text-slate-500">Instant Lead Funnel</p>
                </div>
              </div>
            </div>

            {/* Floating Client Trust Badge */}
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl sm:flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Full IP Ownership</p>
                <p className="text-[11px] text-slate-500">Zero Agency Lock-in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
