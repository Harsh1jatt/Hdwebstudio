import Link from "next/link";
import { ArrowRight, Home, Phone, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 border border-blue-100">
          <span className="text-3xl font-black text-blue-600">404</span>
        </div>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has been relocated to our updated architecture.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" /> Contact Us
          </Link>
        </div>

        <div className="mt-12 border-t border-slate-200/70 pt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Explore Active Studio Endpoints</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              { label: "Services", href: "/services" },
              { label: "Work & Case Studies", href: "/work" },
              { label: "Transparent Pricing", href: "/pricing" },
              { label: "About Studio", href: "/about" },
              { label: "Free Website Audit", href: "/audit" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-white hover:text-blue-600"
              >
                {link.label} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
