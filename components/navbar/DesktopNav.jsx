"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NavItem from "./NavItem.jsx";
import MegaMenu from "./MegaMenu.jsx";

const HIGHLIGHT_SPRING = { type: "spring", stiffness: 400, damping: 32 };

export default function DesktopNav({ links, services, pathname }) {
  const [hoveredHref, setHoveredHref] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesItemRef = useRef(null);

  const isServicesActive = pathname.startsWith("/services");

  // Close the mega menu on outside click or Escape
  useEffect(() => {
    if (!servicesOpen) return;

    const handleClickOutside = (event) => {
      if (servicesItemRef.current && !servicesItemRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  // A link is "highlighted" (shows the sliding pill) if it's hovered, or —
  // when nothing is hovered — if it's the active route.
  const isHighlighted = (link) => {
    if (hoveredHref) return hoveredHref === link.href;
    return link.isServices ? isServicesActive : pathname === link.href;
  };

  return (
    <nav aria-label="Main Navigation" className="hidden md:flex items-center">
      <ul onMouseLeave={() => setHoveredHref(null)} className="flex items-center gap-1">
        {links.map((link) => {
          if (link.isServices) {
            const highlighted = isHighlighted(link);

            return (
              <li
                key={link.href}
                ref={servicesItemRef}
                className="relative"
                onMouseEnter={() => {
                  setHoveredHref(link.href);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-current={isServicesActive ? "page" : undefined}
                  className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen && <MegaMenu services={services} />}
                </AnimatePresence>
              </li>
            );
          }

          return (
            <NavItem
              key={link.href}
              link={link}
              isActive={pathname === link.href}
              highlighted={isHighlighted(link)}
              onMouseEnter={() => setHoveredHref(link.href)}
            />
          );
        })}
      </ul>

      <span className="mx-3 h-6 w-px bg-slate-900/10" aria-hidden="true" />

      <motion.div
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Link
          href="/audit"
          className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Free Website Audit
        </Link>
      </motion.div>
    </nav>
  );
}