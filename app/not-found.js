import Link from "next/link";
import { ArrowRight, Home, Search, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5">
      <div className="mx-auto max-w-lg text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
          <span className="text-4xl font-bold text-slate-300">404</span>
        </div>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            <Phone className="h-4 w-4" /> Contact Us
          </Link>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-sm font-semibold text-slate-900">Looking for something specific?</p>
          <p className="mt-2 text-sm text-slate-500">
            Try one of these popular pages:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              { label: "Services", href: "/services" },
              { label: "Work", href: "/work" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Stories", href: "/stories" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-600"
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
