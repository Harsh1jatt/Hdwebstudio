import AuditClient from "./AuditClient";
import { Sparkles } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Free Website Audit | HD Web Studios",
  description:
    "Analyze your website speed, mobile responsiveness, SEO foundations, and conversion barriers with HD Web Studios' free digital audit tool.",
  alternates: {
    canonical: absoluteUrl("/audit"),
  },
  openGraph: {
    title: "Free Website Audit | HD Web Studios",
    description: "Get an instant diagnostic report on your website performance, SEO, and lead conversion readiness.",
    url: absoluteUrl("/audit"),
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function AuditPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative border-b border-slate-100 bg-slate-50/50 py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <Sparkles size={13} className="text-blue-600" />
            Free Instant Diagnostic
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            How Strong Is Your Website?
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg max-w-2xl mx-auto">
            Test your website for Core Web Vitals speed, mobile viewport usability, Google SEO structure, and conversion barriers in under 5 seconds.
          </p>
        </div>
      </section>

      {/* Interactive Audit Tool */}
      <AuditClient />
    </div>
  );
}
