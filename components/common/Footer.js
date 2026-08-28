import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  siteConfig,
  telUrl,
  mailtoUrl,
  whatsAppUrl,
} from "@/config/site";

const company = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Free Audit", href: "/audit" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ services = [], site = null }) {
  const s = site || siteConfig;
  const serviceLinks = services.slice(0, 4).map((sv) => ({
    label: sv.title || sv.eyebrow,
    href: `/services/${sv.slug}`,
  }));

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="HD Web Studios Home">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                HD
              </span>
              <span className="text-base font-bold text-slate-900">
                HD Web Studios
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              Professional website development and digital growth solutions for
              businesses in Ludhiana, Punjab and across India.
            </p>

            {/* Contact Quick Links */}
            <div className="mt-5 space-y-2.5">
              <a
                href={telUrl()}
                className="flex items-center gap-2.5 text-sm text-slate-600 transition-colors hover:text-blue-600"
              >
                <Phone size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
                {s.phoneDisplay || s.phone}
              </a>
              <a
                href={mailtoUrl()}
                className="flex items-center gap-2.5 text-sm text-slate-600 transition-colors hover:text-blue-600"
              >
                <Mail size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
                {s.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <MapPin size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
                Ludhiana, Punjab, India
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Audit CTA */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Free Digital Audit
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Get a practical review of your website and discover where you can
              improve its design, performance, and ability to turn visitors into
              enquiries.
            </p>
            <Link
              href="/audit"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get Free Audit
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 sm:px-6 md:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {s.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/privacy" className="transition-colors hover:text-slate-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
