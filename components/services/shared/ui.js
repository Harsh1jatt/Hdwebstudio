import Link from "next/link";
import { resolveIcon } from "@/lib/icons";

/** Simple centered content container. */
export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Section heading with eyebrow, title, and description. */
export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

/** Eyebrow label above a heading. */
export function Eyebrow({ children }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
      {children}
    </p>
  );
}

/** Primary CTA button. */
export function PrimaryButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      {children}
    </Link>
  );
}

/** Secondary CTA button. */
export function SecondaryButton({ href, children, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {children}
    </a>
  );
}

/** Decorative gradient blob background element. */
export function GradientBlob({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}

/** Resolves a Lucide icon by string name. */
export function Icon({ name, className = "" }) {
  const LucideIcon = resolveIcon(name);
  return <LucideIcon className={className} />;
}
