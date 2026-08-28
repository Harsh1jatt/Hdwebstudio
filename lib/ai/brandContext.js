import SiteSettings from "../../models/SiteSettings.js";
import { siteConfig } from "../../config/site.js";

export const DEFAULT_BRAND_CONTEXT = {
  brandName: "HD Web Studios",
  shortName: "HDWS",
  tagline: "Web Development & Digital Solutions Agency",
  positioning: "A business acquisition system and web development agency that builds high-converting websites, web apps, and local SEO engines for businesses.",
  primaryBusiness: [
    "Business Website Development",
    "Website Redesign & Modernization",
    "Ecommerce Website Development",
    "Custom Web Applications (Next.js / React / MERN)",
    "Admin Dashboards & Management Systems",
    "Institute & Online Examination Systems",
    "Local SEO & Google Business Profile Optimization",
    "Lead Generation & Digital Growth Solutions",
    "WordPress Development & CMS Solutions",
    "Landing Page Development & Conversion Optimization",
    "Website Maintenance, Security & Support",
  ],
  targetAudience: [
    "Local & regional business owners",
    "Small & medium enterprises (SMEs)",
    "Startups & entrepreneurs",
    "Manufacturers & industrial companies",
    "Educational institutes & academies",
    "D2C ecommerce brands & retail stores",
    "Service providers needing high-trust websites",
    "Businesses with outdated websites needing redesign",
  ],
  primaryGeography: {
    city: "Ludhiana",
    state: "Punjab",
    country: "India",
    regions: ["Ludhiana", "Punjab", "Delhi NCR", "Pan-India", "Remote / International Clients"],
  },
  tone: "Professional, authoritative, transparent, commercial, conversion-oriented",
  rules: [
    "Never use generic AI filler such as 'in today's fast-paced digital world' or 'look no further'.",
    "Never make false ranking guarantees (e.g. 'guaranteed #1 on Google').",
    "Never invent fake client statistics, fake reviews, or fake awards.",
    "Mention HD Web Studios naturally in the copy without keyword stuffing.",
    "Focus on commercial benefits: leads, customer trust, speed, mobile responsiveness, and ROI.",
  ],
  contact: {
    phone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    location: "Ludhiana, Punjab, India",
    url: siteConfig.url,
  },
};

/**
 * Retrieves the latest dynamic brand context merging DB settings and defaults.
 */
export async function getBrandContext() {
  try {
    const settings = await SiteSettings.findOne().lean();
    if (!settings) return DEFAULT_BRAND_CONTEXT;

    return {
      brandName: settings.brand?.name || DEFAULT_BRAND_CONTEXT.brandName,
      shortName: settings.brand?.shortName || DEFAULT_BRAND_CONTEXT.shortName,
      tagline: settings.brand?.tagline || DEFAULT_BRAND_CONTEXT.tagline,
      positioning: settings.brandVoice?.positioning || DEFAULT_BRAND_CONTEXT.positioning,
      tone: settings.brandVoice?.tone || DEFAULT_BRAND_CONTEXT.tone,
      targetAudience: settings.brandVoice?.targetAudience || DEFAULT_BRAND_CONTEXT.targetAudience,
      primaryBusiness: DEFAULT_BRAND_CONTEXT.primaryBusiness,
      primaryGeography: {
        city: settings.contact?.city || "Ludhiana",
        state: settings.contact?.state || "Punjab",
        country: settings.contact?.country || "India",
        regions: settings.brandVoice?.coreLocations || DEFAULT_BRAND_CONTEXT.primaryGeography.regions,
      },
      preferredTerminology: settings.brandVoice?.preferredTerminology || DEFAULT_BRAND_CONTEXT.preferredTerminology,
      forbiddenClaims: settings.brandVoice?.forbiddenClaims || DEFAULT_BRAND_CONTEXT.forbiddenClaims,
      writingStyle: settings.brandVoice?.writingStyle || DEFAULT_BRAND_CONTEXT.writingStyle,
      aiAutoPublish: settings.brandVoice?.aiAutoPublish || false,
      contact: {
        phone: settings.contact?.phone || siteConfig.phoneDisplay,
        email: settings.contact?.email || siteConfig.email,
        location: `${settings.contact?.city || "Ludhiana"}, ${settings.contact?.state || "Punjab"}, India`,
        url: siteConfig.url,
      },
    };
  } catch (error) {
    console.error("[BrandContext] Error loading settings:", error);
    return DEFAULT_BRAND_CONTEXT;
  }
}
