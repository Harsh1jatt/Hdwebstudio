"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HIGHLIGHT_SPRING = { type: "spring", stiffness: 400, damping: 32 };

export default function NavItem({ link, isActive, highlighted, onMouseEnter }) {
  return (
    <li onMouseEnter={onMouseEnter}>
      <Link
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className={`relative z-10 inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
          highlighted ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
        }`}
      >
        {highlighted && (
          <motion.span
            layoutId="nav-highlight"
            transition={HIGHLIGHT_SPRING}
            className="absolute inset-0 -z-10 rounded-full bg-blue-50"
          />
        )}
        {link.label}
      </Link>
    </li>
  );
}