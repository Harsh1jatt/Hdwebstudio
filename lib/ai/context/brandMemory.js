/**
 * HD Web Studios — Central Brand Memory & AI Context
 *
 * Grounding knowledge base used across all prompts and AI operations.
 * Merges static defaults with dynamic settings from MongoDB SiteSettings.
 */

import mongoose from "mongoose";
import SiteSettings from "../../../models/SiteSettings.js";
import { siteConfig } from "../../../config/site.js";

export const DEFAULT_BRAND_MEMORY = {
  brandName: "HD Web Studios",
  shortName: "HDWS",
  tagline: "Web Development & Digital Growth Partner",
  positioning:
    "A specialized web development and digital growth agency that engineers high-converting websites, custom web applications, and local search acquisition systems for growing businesses.",
  primaryMarket: {
    city: "Ludhiana",
    state: "Punjab",
    country: "India",
    regions: ["Ludhiana", "Punjab", "Delhi NCR", "Pan-India", "Remote / Global Clients"],
  },
  services: [
    "Business Website Development",
    "Website Redesign & Modernization",
    "Ecommerce Website Development (WooCommerce, Custom)",
    "Custom Web Applications (Next.js, React, Node.js, MongoDB)",
    "Admin Dashboards & Business Management Systems",
    "Institute & Online Examination Systems",
    "Local SEO & Google Business Profile Optimization",
    "Google Ads Management & Search Campaign Strategy",
    "Meta Ads & Lead Generation Funnels",
    "Landing Page Development & Conversion Rate Optimization",
    "Website Maintenance, Security & Speed Optimization",
  ],
  technologies: [
    "JavaScript",
    "Next.js (App Router)",
    "React",
    "Node.js",
    "MongoDB / Mongoose",
    "Tailwind CSS",
    "WordPress & WooCommerce",
  ],
  targetAudience: [
    "Small and medium enterprises (SMEs)",
    "Local & regional business owners in Punjab and North India",
    "Industrial manufacturers & exporters",
    "Educational institutes, academies & colleges",
    "D2C ecommerce brands & retail stores",
    "Professional service providers (consultants, doctors, attorneys)",
    "Startups needing bespoke MVPs or web applications",
  ],
  voiceAndTone: {
    tone: "Knowledgeable, commercial, clear, authoritative, practical, and conversion-oriented",
    perspective: "A senior web strategist and developer speaking to a real business owner",
  },
  writingRules: [
    "Write with concrete commercial clarity: focus on real business outcomes (qualified inquiries, page load speed, mobile conversion, customer trust).",
    "Vary sentence structure and paragraph lengths naturally. Never make all paragraphs look uniform.",
    "Never use generic AI filler and corporate marketing buzzwords.",
    "Never make false ranking guarantees (e.g. 'rank #1 on Google guaranteed').",
    "Never fabricate statistics, sales numbers, user counts, or client revenues if not explicitly provided.",
    "Use semantic heading hierarchy (H2 for main sections, H3 for sub-points). Post/page title serves as the single H1.",
    "Integrate internal links naturally to relevant agency services or contact pages.",
  ],
  bannedClichés: [
    "in today's fast-paced digital world",
    "in today's digital landscape",
    "in the ever-evolving digital world",
    "cutting-edge",
    "seamless integration",
    "seamlessly",
    "unlock your potential",
    "take your business to the next level",
    "look no further",
    "game-changer",
    "comprehensive solutions",
    "end-to-end solutions",
    "trusted partner for all your needs",
    "one-stop shop",
    "transform your business",
    "harness the power of",
    "delve into",
    "testament to",
    "beacon of",
    "revolutionize",
  ],
  contact: {
    phone: siteConfig.phoneDisplay || "+91 75894 34135",
    whatsapp: siteConfig.phoneDisplay || "+91 75894 34135",
    email: siteConfig.email || "contact@hdwebstudios.in",
    location: "Ludhiana, Punjab, India",
    url: siteConfig.url || "https://hdwebstudios.in",
  },
};

/**
 * Loads dynamic brand memory from DB SiteSettings, merged with defaults.
 */
export async function getBrandMemory() {
  try {
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      return DEFAULT_BRAND_MEMORY;
    }

    const settings = await SiteSettings.findOne().lean();
    if (!settings) return DEFAULT_BRAND_MEMORY;

    return {
      brandName: settings.brand?.name || DEFAULT_BRAND_MEMORY.brandName,
      shortName: settings.brand?.shortName || DEFAULT_BRAND_MEMORY.shortName,
      tagline: settings.brand?.tagline || DEFAULT_BRAND_MEMORY.tagline,
      positioning: settings.brandVoice?.positioning || DEFAULT_BRAND_MEMORY.positioning,
      primaryMarket: {
        city: settings.contact?.city || DEFAULT_BRAND_MEMORY.primaryMarket.city,
        state: settings.contact?.state || DEFAULT_BRAND_MEMORY.primaryMarket.state,
        country: settings.contact?.country || DEFAULT_BRAND_MEMORY.primaryMarket.country,
        regions: settings.brandVoice?.coreLocations || DEFAULT_BRAND_MEMORY.primaryMarket.regions,
      },
      services: DEFAULT_BRAND_MEMORY.services,
      technologies: DEFAULT_BRAND_MEMORY.technologies,
      targetAudience: settings.brandVoice?.targetAudience
        ? settings.brandVoice.targetAudience.split(",").map((s) => s.trim()).filter(Boolean)
        : DEFAULT_BRAND_MEMORY.targetAudience,
      voiceAndTone: {
        tone: settings.brandVoice?.tone || DEFAULT_BRAND_MEMORY.voiceAndTone.tone,
        perspective: DEFAULT_BRAND_MEMORY.voiceAndTone.perspective,
      },
      writingRules: DEFAULT_BRAND_MEMORY.writingRules,
      bannedClichés: DEFAULT_BRAND_MEMORY.bannedClichés,
      contact: {
        phone: settings.contact?.phone || DEFAULT_BRAND_MEMORY.contact.phone,
        whatsapp: settings.contact?.whatsapp || DEFAULT_BRAND_MEMORY.contact.whatsapp,
        email: settings.contact?.email || DEFAULT_BRAND_MEMORY.contact.email,
        location: `${settings.contact?.city || "Ludhiana"}, ${settings.contact?.state || "Punjab"}, India`,
        url: siteConfig.url || "https://hdwebstudios.in",
      },
    };
  } catch (error) {
    console.warn("[BrandMemory] Error loading SiteSettings:", error.message);
    return DEFAULT_BRAND_MEMORY;
  }
}
