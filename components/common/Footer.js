import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  siteConfig,
  telUrl,
  mailtoUrl,
  whatsAppUrl,
  defaultWhatsAppMessage,
} from "@/config/site";

const company = [
  { label: "About Studio", href: "/about" },
  { label: "Case Studies / Work", href: "/work" },
  { label: "Pricing & Packages", href: "/pricing" },
  { label: "Free Website Audit", href: "/audit" },
  { label: "Hire Developers / Contact", href: "/contact" },
];

export default function Footer({ services = [], site = null }) {
  const s = site || siteConfig;
  const serviceLinks = (services && services.length >= 6 ? services : [
    { title: "Business Website Development", slug: "business-website-development" },
    { title: "Website Redesign & Modernization", slug: "website-redesign-modernization" },
    { title: "Ecommerce Website Development", slug: "ecommerce-website-development" },
    { title: "Custom Web Application Development", slug: "custom-web-application-development" },
    { title: "Local SEO & Google Business", slug: "local-seo-google-business-optimization" },
    { title: "Website Maintenance & Support", slug: "website-maintenance-support" },
  ]).map((sv) => ({
    label: sv.title || sv.eyebrow,
    href: `/services/${sv.slug}`,
  }));

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Pre-Footer Conversion Strip */}
      <div className="border-b border-slate-200 bg-slate-50/80 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-cyan-50/80 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles size={13} className="text-blue-600" />
                Zero Obligation Technical Scoping
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Turn Your Digital Presence Into a Client Acquisition Engine
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We engineer sub-second Next.js web applications, Google Local SEO systems, and bespoke digital platforms for businesses in Ludhiana and across India.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Get Free Website Audit
              </Link>
              <a
                href={whatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-800 transition hover:bg-emerald-100"
              >
                <MessageCircle size={15} />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Localized NAP */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="HD Web Studios Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-xs">
                HD
              </span>
              <span className="text-lg font-extrabold tracking-tight text-slate-950">
                HD Web Studios
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              Professional website development and digital client acquisition studio headquartered in Ludhiana, Punjab.
            </p>

            {/* NAP Quick Details */}
            <div className="mt-5 space-y-2.5 text-xs text-slate-600">
              <a
                href={telUrl()}
                className="flex items-center gap-2.5 transition hover:text-blue-600"
              >
                <Phone size={14} className="shrink-0 text-blue-600" aria-hidden="true" />
                <span>{s.phoneDisplay || s.phone}</span>
              </a>
              <a
                href={mailtoUrl()}
                className="flex items-center gap-2.5 transition hover:text-blue-600"
              >
                <Mail size={14} className="shrink-0 text-blue-600" aria-hidden="true" />
                <span>{s.email}</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="shrink-0 text-blue-600 mt-0.5" aria-hidden="true" />
                <span>Kakka Rd, Subhash Nagar, Ludhiana, Punjab 141007</span>
              </div>
            </div>

            <div className="mt-5">
              <a
                href={whatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-emerald-700"
              >
                <MessageCircle size={14} aria-hidden="true" />
                Chat with Harshdeep
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">
              Services &amp; Frameworks
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 transition hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">
              Studio &amp; Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-600 transition hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Audit & Guarantees */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">
              Engineering Guarantees
            </h3>
            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span><strong>100% Code Ownership:</strong> Full GitHub repository and database credentials transferred upon launch.</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Sub-Second Guarantee:</strong> Sub-0.8s load times with Core Web Vitals optimization.</span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href="/audit"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-900 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                Instant Website Diagnostic <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-100 bg-slate-50 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 sm:px-6 md:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {s.name}. All rights reserved. Registered Studio in Ludhiana, Punjab.
          </p>
          <div className="flex items-center gap-5 text-xs font-medium text-slate-500">
            <Link href="/privacy" className="transition hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-blue-600">
              Terms &amp; Conditions
            </Link>
            <Link href="/sitemap.xml" className="transition hover:text-blue-600">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
