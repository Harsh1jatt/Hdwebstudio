"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "/services",
      label: "Services",
      dropdown: [
        { href: "/services/web-development", label: "Web Development" },
        { href: "/services/ui-ux", label: "UI/UX Design" },
        { href: "/services/seo", label: "SEO & Marketing" },
        { href: "/services/ecommerce", label: "E-commerce Solutions" },
      ],
    },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Harshdeep Web Studios Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Harshdeep Web Studios
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-medium ${
                        pathname.startsWith("/services")
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={16} />
                    </Link>

                    <div className="absolute left-0 top-full mt-3 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-5 py-3 text-sm ${
                            pathname === item.href
                              ? "text-blue-600 bg-blue-50"
                              : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER USING PORTAL ================= */}
      {mounted &&
        mobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 overflow-y-auto transition-transform duration-300">
              
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-slate-100"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  if (link.dropdown) {
                    return (
                      <div key={link.href}>
                        <button
                          onClick={() =>
                            setMobileServicesOpen(!mobileServicesOpen)
                          }
                          className="flex justify-between items-center w-full py-3 font-medium text-slate-700"
                        >
                          {link.label}
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            mobileServicesOpen ? "max-h-96" : "max-h-0"
                          }`}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block pl-4 py-2 text-sm text-slate-600 hover:text-blue-600"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-3 font-medium text-slate-700 hover:text-blue-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
