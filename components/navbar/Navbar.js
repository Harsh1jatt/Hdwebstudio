"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import DesktopNav from "./DesktopNav.jsx";
import MobileNav from "./MobileNav.jsx";

export default function Navbar({ services }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef(null);

  // Shrink + intensify the glass effect once the page scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobileDrawer = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pointer-events-none sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-auto relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/70 bg-gradient-to-r from-white/85 via-white/70 to-white/85 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] shadow-slate-900/[0.07] backdrop-blur-2xl transition-all duration-300 ease-out ${
            scrolled ? "mt-2 px-4 py-2" : "mt-3 px-5 py-3 sm:px-6"
          }`}
        >
          {/* Logo */}
          <Link href="/" aria-label="HD Web Studios Home" className="flex items-center gap-2.5">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/70"
            >
              <Image
                src="/logo.svg"
                alt="HD Web Studios Logo"
                width={36}
                height={36}
                priority
                className="h-full w-full object-cover"
              />
            </motion.span>
            <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent sm:text-lg md:text-xl">
              HD Web Studios
            </span>
          </Link>

          <DesktopNav links={navigation} services={services} pathname={pathname} />

          {/* Mobile Button */}
          <motion.button
            ref={menuButtonRef}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Open main menu"
            className="flex items-center justify-center rounded-full p-2.5 text-slate-700 transition-colors duration-200 hover:bg-slate-900/5 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Menu size={22} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </header>

      <MobileNav
        links={navigation}
        services={services}
        pathname={pathname}
        open={mobileOpen}
        onClose={closeMobileDrawer}
      />
    </>
  );
}