/**
 * Single source of truth for public site configuration.
 * Secrets and infrastructure settings live in .env — not marketing copy here.
 */

export const CANONICAL_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hdwebstudios.in";

export const siteConfig = {
  name: "HD Web Studios",
  shortName: "HDWS",

  url: CANONICAL_SITE_URL,

  description:
    "Professional Website Development Company in Ludhiana offering Next.js, React, MERN Stack, SEO, eCommerce and Custom Software Development.",

  phone: "+917589434135",
  phoneDisplay: "+91 75894 34135",

  email: "contact@hdwebstudios.in",

  address: {
    city: "Ludhiana",
    state: "Punjab",
    country: "IN",
    pincode: "141001",
  },

  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    github: "",
  },

  assets: {
    logo: "/logo.svg",
    ogImage: "/logo.svg",
    projectPlaceholder: "/projects/placeholder.svg",
  },
};

/** Build an absolute URL from a site path. */
export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

/** Digits-only phone for tel:/wa.me links. */
export function phoneDigits() {
  return siteConfig.phone.replace(/\D/g, "");
}

export function telUrl() {
  return `tel:${phoneDigits()}`;
}

export function mailtoUrl() {
  return `mailto:${siteConfig.email}`;
}

export function whatsAppUrl(message) {
  const base = `https://wa.me/${phoneDigits()}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Hi Harshdeep, I'd like to discuss a digital solution for my business.";
