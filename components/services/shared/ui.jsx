"use client";

import * as Icons from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Resolve a Lucide icon by string name so content data (services-data.js)
 * can reference icons without importing components directly.
 */
export function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function GradientBlob({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

export function GlassCard({ children, className = "", as: Comp = "div", ...rest }) {
  return (
    <Comp
      className={`rounded-3xl border border-white/60 bg-white/70 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function PrimaryButton({ href, children, className = "", ...rest }) {
  const Comp = href ? Link : "button";
  return (
    <Comp
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full"
      />
    </Comp>
  );
}

export function SecondaryButton({ href, children, className = "", ...rest }) {
  const Comp = href ? Link : "button";
  return (
    <Comp
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/80 hover:text-blue-700 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});
