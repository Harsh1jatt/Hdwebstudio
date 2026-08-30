"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { whatsAppUrl, defaultWhatsAppMessage, telUrl } from "@/config/site";

export default function MobileNav({ links = [], services = [], pathname, open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Lock body scroll, move focus into the drawer, and let Escape close it
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Reset the services accordion whenever the drawer closes
  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="absolute right-0 top-0 h-full w-80 overflow-y-auto rounded-l-3xl border-l border-slate-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex justify-end">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile Navigation" className="mt-4">
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  if (link.isServices) {
                    return (
                      <li key={link.href}>
                        <div className="flex items-center justify-between rounded-2xl text-slate-800 hover:bg-slate-50">
                          <Link href={link.href} onClick={onClose} className="flex-1 px-3.5 py-3 text-sm font-bold">
                            {link.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setServicesOpen((isOpen) => !isOpen)}
                            aria-expanded={servicesOpen}
                            aria-controls="mobile-services-menu"
                            aria-label="Toggle services submenu"
                            className="rounded-full p-2 mr-1 text-slate-500 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            <ChevronDown
                              size={18}
                              aria-hidden="true"
                              className={`transition-transform duration-200 ${
                                servicesOpen ? "rotate-180 text-blue-600" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <ul
                          id="mobile-services-menu"
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {services.map((service) => (
                            <li key={service.href}>
                              <Link
                                href={service.href}
                                aria-current={pathname === service.href ? "page" : undefined}
                                className="block rounded-xl py-2 pl-6 text-xs font-semibold text-slate-600 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600"
                                onClick={onClose}
                              >
                                {service.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }

                  const isActive = pathname === link.href;

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-2xl px-3.5 py-3 text-sm font-bold transition-colors duration-150 ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-800 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}

                {/* Mobile Quick Actions */}
                <li className="mt-6 flex gap-2">
                  <a
                    href={whatsAppUrl(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-emerald-700"
                  >
                    <MessageCircle size={15} aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a
                    href={telUrl()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 transition hover:bg-slate-200"
                  >
                    <Phone size={15} aria-hidden="true" />
                    Call
                  </a>
                </li>

                {/* Mobile CTA */}
                <li className="mt-3">
                  <Link
                    href="/audit"
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Free Website Audit
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}