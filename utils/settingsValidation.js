import { z } from "zod";

const optStr = z.string().max(500).optional();

export const settingsPayloadSchema = z.object({
  brand: z.object({
    name: optStr,
    shortName: optStr,
    tagline: optStr,
    logo: optStr,
    favicon: optStr,
  }).optional(),
  contact: z.object({
    email: optStr,
    phone: optStr,
    whatsapp: optStr,
    address: optStr,
    city: optStr,
    state: optStr,
    country: optStr,
    pincode: optStr,
  }).optional(),
  social: z.object({
    facebook: optStr,
    instagram: optStr,
    linkedin: optStr,
    twitter: optStr,
    github: optStr,
    youtube: optStr,
  }).optional(),
  seo: z.object({
    defaultTitle: optStr,
    defaultDescription: z.string().max(1000).optional(),
    defaultKeywords: z.string().max(1000).optional(),
    defaultOgImage: optStr,
    favicon: optStr,
  }).optional(),
  business: z.object({
    businessHours: optStr,
    foundedYear: optStr,
    serviceArea: optStr,
  }).optional(),
  analytics: z.object({
    googleAnalyticsId: optStr,
  }).optional(),
  footer: z.object({
    footerText: z.string().max(2000).optional(),
    copyrightText: z.string().max(500).optional(),
  }).optional(),
});
