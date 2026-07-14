"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

/**
 * Static navigation data — declared outside the component so it is never
 * recreated on re-render (avoids unnecessary object/array allocation).
 */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    dropdown: [
      { href: "/services/web-development", label: "Web Development" },
      { href: "/services/ui-ux", label: "UI/UX Design" },
      { href: "/services/seo", label: "SEO & Marketing" },
      { href: "/services/ecommerce", label: "E-commerce Solutions" },
      // Uncomment once these routes exist in the app:
      // { href: "/services/custom-software", label: "Custom Software" },
      // { href: "/services/website-maintenance", label: "Website Maintenance" },
      // { href: "/services/api-integration", label: "API Integration" },
      // { href: "/services/mern-stack-development", label: "MERN Stack Development" },
      // { href: "/services/nextjs-development", label: "Next.js Development" },
    ],
  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const DRAWER_TRANSITION_MS = 300;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false); // controls mount/unmount
  const [drawerVisible, setDrawerVisible] = useState(false); // controls enter/exit animation
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Refs used for focus management (a11y requirement, not just UX polish)
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const desktopTriggerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Shrink + intensify the glass effect once the page scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setDrawerVisible(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open, with guaranteed cleanup
  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  // Trigger the slide-in animation on the frame after the drawer mounts
  useEffect(() => {
    if (!mobileOpen) return;
    const frame = requestAnimationFrame(() => setDrawerVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [mobileOpen]);

  // Move focus into the drawer when it opens, and trap Tab/Shift+Tab inside it
  useEffect(() => {
    if (!mobileOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobileDrawer();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  // Close the desktop dropdown on outside click or Escape
  useEffect(() => {
    if (!desktopServicesOpen) return;

    const handleClickOutside = (event) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setDesktopServicesOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDesktopServicesOpen(false);
        desktopTriggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [desktopServicesOpen]);

  // Clear any pending close timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openMobileDrawer = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const closeMobileDrawer = useCallback(() => {
    // Animate out first, then unmount — gives the drawer a real exit transition
    setDrawerVisible(false);
    closeTimeoutRef.current = setTimeout(() => {
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    }, DRAWER_TRANSITION_MS);
  }, []);

  const handleDropdownKeyDown = useCallback((event) => {
    const items = Array.from(
      desktopDropdownRef.current?.querySelectorAll("a") ?? []
    );
    const currentIndex = items.indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = items[currentIndex + 1] ?? items[0];
      next?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = items[currentIndex - 1] ?? items[items.length - 1];
      prev?.focus();
    }
  }, []);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <>
      {/* ================= HEADER ================= */}
      {/* Outer wrapper is transparent + non-interactive so it never blocks
          clicks on page content beneath the empty space around the pill. */}
      <header className="sticky top-0 z-40 pointer-events-none">
        <div
          className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 bg-white/70 shadow-lg shadow-slate-900/[0.06] backdrop-blur-xl transition-all duration-300 ease-out ${
            scrolled
              ? "mt-2 px-4 py-2 sm:px-5"
              : "mt-4 px-5 py-3 sm:px-7"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="HD Web Studios Home"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/70 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="HD Web Studios Logo"
                width={36}
                height={36}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              HD Web Studios
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                if (link.dropdown) {
                  return (
                    <li
                      key={link.href}
                      ref={desktopDropdownRef}
                      className="relative"
                      onMouseEnter={() => setDesktopServicesOpen(true)}
                      onMouseLeave={() => setDesktopServicesOpen(false)}
                    >
                      <button
                        ref={desktopTriggerRef}
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={desktopServicesOpen}
                        aria-controls="desktop-services-menu"
                        aria-current={isServicesActive ? "page" : undefined}
                        onClick={() => setDesktopServicesOpen((open) => !open)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowDown") {
                            event.preventDefault();
                            setDesktopServicesOpen(true);
                          }
                        }}
                        className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isServicesActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-900/5 hover:text-blue-600"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${
                            desktopServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <ul
                        id="desktop-services-menu"
                        role="menu"
                        aria-label="Services submenu"
                        onKeyDown={handleDropdownKeyDown}
                        className={`absolute left-0 top-full mt-3 w-64 origin-top rounded-2xl border border-white/60 bg-white/90 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-200 ease-out z-50 ${
                          desktopServicesOpen
                            ? "opacity-100 visible translate-y-0 scale-100"
                            : "opacity-0 invisible -translate-y-1 scale-95"
                        }`}
                      >
                        {link.dropdown.map((item) => (
                          <li key={item.href} role="none">
                            <Link
                              role="menuitem"
                              href={item.href}
                              aria-current={pathname === item.href ? "page" : undefined}
                              className={`block rounded-xl px-4 py-2.5 text-sm transition-colors duration-150 ${
                                pathname === item.href
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                              }`}
                            >
                              {item.label}
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
                      className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700 hover:bg-slate-900/5 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="ml-3 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get Free Quote
            </Link>
          </nav>

          {/* Mobile Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMobileDrawer}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Open main menu"
            className="flex items-center justify-center rounded-full p-2.5 text-slate-700 transition-all duration-200 hover:bg-slate-900/5 active:scale-95 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER USING PORTAL ================= */}
      {mounted &&
        mobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Overlay — clicking outside closes the drawer */}
            <div
              className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
                drawerVisible ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeMobileDrawer}
              aria-hidden="true"
            />

            {/* Drawer */}
            <div
              id="mobile-nav-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              className={`absolute right-0 top-0 h-full w-72 overflow-y-auto rounded-l-3xl border-l border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
                drawerVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-end">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMobileDrawer}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-slate-700 transition-all duration-200 hover:bg-slate-900/5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="mt-6">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    if (link.dropdown) {
                      return (
                        <li key={link.href}>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((open) => !open)}
                            aria-expanded={mobileServicesOpen}
                            aria-controls="mobile-services-menu"
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-900/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            {link.label}
                            <ChevronDown
                              size={18}
                              aria-hidden="true"
                              className={`transition-transform duration-200 ${
                                mobileServicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <ul
                            id="mobile-services-menu"
                            className={`overflow-hidden transition-all duration-300 ease-out ${
                              mobileServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            {link.dropdown.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  aria-current={pathname === item.href ? "page" : undefined}
                                  className="block rounded-lg py-2 pl-6 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-900/5 hover:text-blue-600"
                                  onClick={closeMobileDrawer}
                                >
                                  {item.label}
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
                          className={`block rounded-xl px-3 py-3 font-medium transition-colors duration-150 ${
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-700 hover:bg-slate-900/5 hover:text-blue-600"
                          }`}
                          onClick={closeMobileDrawer}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}

                  {/* Mobile CTA */}
                  <li className="mt-4">
                    <Link
                      href="/contact"
                      onClick={closeMobileDrawer}
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Get Free Quote
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}