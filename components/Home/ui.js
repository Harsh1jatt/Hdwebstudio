import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const CONTAINER = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";
export const SECTION_Y = "py-20 sm:py-24 lg:py-28";

export function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`text-sm font-bold uppercase tracking-[0.18em] ${
        dark ? "text-blue-400" : "text-blue-600"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, description, dark = false, align = "center" }) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } max-w-2xl ${dark ? "text-slate-400" : "text-slate-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PrimaryCTA({ href = "/contact", children, className = "", dark = false }) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5";
  const tone = dark
    ? "bg-white text-slate-950 hover:bg-blue-50 shadow-white/5"
    : "bg-slate-950 text-white shadow-slate-950/10 hover:bg-blue-600 hover:shadow-blue-600/20";

  return (
    <Link
      href={href}
      className={`${base} ${tone} ${className}`}
    >
      {children}
      <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function CheckItem({ children, tone = "emerald" }) {
  const toneClass = tone === "blue" ? "text-blue-600" : "text-emerald-500";
  return (
    <li className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
      <CheckCircle2 size={17} className={`mt-0.5 shrink-0 ${toneClass}`} />
      <span>{children}</span>
    </li>
  );
}
