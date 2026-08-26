import connectDB from "./db";
import SiteSettings from "../models/SiteSettings";

let cached = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

/**
 * Get site settings from the database, with in-memory caching.
 * Falls back to sensible defaults if DB is unavailable.
 */
export async function getSiteSettings() {
  const now = Date.now();
  if (cached && now - cacheTime < CACHE_TTL) return cached;

  try {
    await connectDB();
    const settings = await SiteSettings.getSettings();
    cached = settings;
    cacheTime = now;
    return settings;
  } catch (err) {
    console.error("Failed to load site settings:", err.message);
    // Return defaults matching SiteSettings schema
    return {
      brand: { name: "HD Web Studios", shortName: "HDWS", tagline: "", logo: "", favicon: "" },
      contact: {
        email: "contact@hdwebstudios.in",
        phone: "+917589434135",
        whatsapp: "+917589434135",
        address: "",
        city: "Ludhiana",
        state: "Punjab",
        country: "IN",
        pincode: "141001",
      },
      social: { facebook: "", instagram: "", linkedin: "", twitter: "", github: "", youtube: "" },
      seo: {
        defaultTitle: "",
        defaultDescription: "",
        defaultKeywords: "",
        defaultOgImage: "",
        favicon: "",
      },
      business: {
        businessHours: "Mon-Sat 9:00 AM - 6:00 PM",
        foundedYear: "",
        serviceArea: "India",
      },
      analytics: { googleAnalyticsId: "" },
      footer: { footerText: "", copyrightText: "" },
    };
  }
}

/**
 * Clear the settings cache (call after admin updates settings).
 */
export function clearSettingsCache() {
  cached = null;
  cacheTime = 0;
}
