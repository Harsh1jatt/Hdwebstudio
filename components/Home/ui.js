import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const CONTAINER = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";
export const SECTION_Y = "py-20 sm:py-24 lg:py-28";

export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${align === "center" ? "mx-auto" : ""} max-w-2xl text-slate-600`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PrimaryCTA({ href = "/contact", children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 ${className}`}
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function SecondaryCTA({ href = "/audit", children, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 ${className}`}
    >
      {children}
    </Link>
  );
}

export function CheckItem({ children, tone = "emerald" }) {
  const toneClass = tone === "blue" ? "text-blue-600" : "text-emerald-600";
  return (
    <li className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700">
      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${toneClass}`} />
      <span>{children}</span>
    </li>
  );
}
